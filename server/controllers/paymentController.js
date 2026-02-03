const { createOrder, verifySignature } = require('../services/paymentService');
const User = require('../models/User');

// @desc    Create Razorpay Order
// @route   POST /api/payments/order
// @access  Private
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount, plan } = req.body;
        // Simple mapping: 1 INR = 1 Credit, or packages.
        // For now, assume amount is passed or determined by plan.

        let finalAmount = amount;
        if (plan === 'pro') finalAmount = 499; // Example pricing

        const order = await createOrder(finalAmount);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, creditsToAdd } = req.body;

        const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (isValid) {
            const user = await User.findById(req.user.id);
            user.credits += (creditsToAdd || 10); // Default to 10 if not specified (should be secured ideally)
            await user.save();

            res.json({ message: 'Payment verify success', credits: user.credits });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
