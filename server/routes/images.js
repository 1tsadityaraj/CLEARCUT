const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndProcess, getImages } = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

router.post('/upload', protect, upload.single('image'), uploadAndProcess);
router.get('/', protect, getImages);

module.exports = router;
