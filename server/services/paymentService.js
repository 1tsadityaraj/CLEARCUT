const Razorpay = require('razorpay');
const crypto = require('crypto');

let razorpay = null;

if (process.env.ENABLE_PAYMENTS === 'true' && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    } catch (err) {
        console.warn('Razorpay initialization failed:', err.message);
    }
} else {
    console.log('Payments disabled (ENABLE_PAYMENTS not set or keys missing)');
}

const createOrder = async (amount, currency = 'INR') => {
    if (!razorpay) {
        throw new Error('Payments are disabled');
    }

    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw error;
    }
};

const verifySignature = (orderId, paymentId, signature) => {
    if (!process.env.RAZORPAY_KEY_SECRET) return false;

    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');

    return generated_signature === signature;
};

module.exports = { razorpay, createOrder, verifySignature };
