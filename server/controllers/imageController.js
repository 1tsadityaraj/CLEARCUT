const Image = require('../models/Image');
const User = require('../models/User');
const { uploadImage } = require('../services/cloudinaryService');
const { removeBackground } = require('../services/removalService');

// @desc    Upload image and remove background
// @route   POST /api/images/upload
// @access  Private
exports.uploadAndProcess = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        // Mock User Bypass
        // Mock User Bypass
        if (req.user.isMock) {
            // Check if Cloudinary/Remove.bg keys are present

            // scenario 1: Both Missing -> Full Mock
            if (!process.env.CLOUDINARY_CLOUD_NAME && !process.env.REMOVE_BG_API_KEY) {
                console.warn('API Keys missing. Returning MOCK image results.');
                await new Promise(resolve => setTimeout(resolve, 2000));

                const b64 = Buffer.from(req.file.buffer).toString('base64');
                const dataURI = `data:${req.file.mimetype};base64,${b64}`;

                return res.status(201).json({
                    user: req.user.id,
                    originalImageUrl: dataURI,
                    originalImageId: 'mock_original_id',
                    processedImageUrl: 'https://pngimg.com/d/nike_PNG11.png',
                    processedImageId: 'mock_processed_id',
                });
            }

            // Scenario 2: Remove.BG Present, Cloudinary Missing -> Hybrid Mode (Real AI, No Storage)
            if (process.env.REMOVE_BG_API_KEY && !process.env.CLOUDINARY_CLOUD_NAME) {
                console.log('Hybrid Mode: Process Real Image, Return Base64 (No Cloudinary)');

                // Process with Real AI
                const processedBuffer = await removeBackground(req.file.buffer);

                // Convert both to Base64
                const originalB64 = Buffer.from(req.file.buffer).toString('base64');
                const originalDataURI = `data:${req.file.mimetype};base64,${originalB64}`;

                const processedB64 = Buffer.from(processedBuffer).toString('base64');
                const processedDataURI = `data:image/png;base64,${processedB64}`; // remove.bg returns PNG

                return res.status(201).json({
                    user: req.user.id,
                    originalImageUrl: originalDataURI,
                    originalImageId: 'hybrid_original_id',
                    processedImageUrl: processedDataURI, // REAL AI RESULT
                    processedImageId: 'hybrid_processed_id',
                });
            }

            // Scenario 3: Both Present -> Full Real Flow (but Mock User bypasses DB save)
            const originalUpload = await uploadImage(req.file.buffer, 'original_images');
            const processedBuffer = await removeBackground(req.file.buffer);
            const processedUpload = await uploadImage(processedBuffer, 'processed_images');

            return res.status(201).json({
                user: req.user.id,
                originalImageUrl: originalUpload.secure_url,
                originalImageId: originalUpload.public_id,
                processedImageUrl: processedUpload.secure_url,
                processedImageId: processedUpload.public_id,
            });
        }

        const user = await User.findById(req.user.id);
        if (user.credits < 1) {
            return res.status(403).json({ message: 'Not enough credits' });
        }

        // 1. Upload Original to Cloudinary
        const originalUpload = await uploadImage(req.file.buffer, 'original_images');

        // 2. Process with remove.bg
        const processedBuffer = await removeBackground(req.file.buffer);

        // 3. Upload Processed to Cloudinary
        const processedUpload = await uploadImage(processedBuffer, 'processed_images');

        // 4. Save to DB
        const image = await Image.create({
            user: req.user.id,
            originalImageUrl: originalUpload.secure_url,
            originalImageId: originalUpload.public_id,
            processedImageUrl: processedUpload.secure_url,
            processedImageId: processedUpload.public_id,
        });

        // 5. Deduct Credit
        user.credits -= 1;
        await user.save();

        res.status(201).json(image);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's image history
// @route   GET /api/images
// @access  Private
exports.getImages = async (req, res) => {
    try {
        const images = await Image.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
