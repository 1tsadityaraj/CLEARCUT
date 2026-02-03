// @desc    Get application configuration/feature flags
// @route   GET /api/config
// @access  Public
exports.getConfig = (req, res) => {
    res.json({
        enablePayments: process.env.ENABLE_PAYMENTS === 'true' && !!process.env.RAZORPAY_KEY_ID,
    });
};
