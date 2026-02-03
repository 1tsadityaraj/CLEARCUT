const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalImageUrl: {
        type: String,
        required: true,
    },
    processedImageUrl: {
        type: String,
        required: true,
    },
    originalImageId: {
        type: String, // Cloudinary Public ID
    },
    processedImageId: {
        type: String, // Cloudinary Public ID
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Image', imageSchema);
