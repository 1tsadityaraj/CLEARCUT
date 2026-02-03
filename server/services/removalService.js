const axios = require('axios');
const FormData = require('form-data');

const removeBackground = async (imageBuffer) => {
    const formData = new FormData();
    formData.append('image_file', imageBuffer, 'image.png');
    formData.append('size', 'auto'); // Highest resolution available
    formData.append('type', 'auto'); // Auto-detect foreground
    formData.append('type_level', 'none'); // No classification filtering
    formData.append('format', 'png'); // Force PNG for transparency
    formData.append('roi', '0 0 100% 100%'); // Whole image analysis
    formData.append('crop', 'false'); // Preserve original canvas size

    try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': process.env.REMOVE_BG_API_KEY,
            },
            responseType: 'arraybuffer',
        });

        if (response.status === 200) {
            return response.data; // Buffer
        } else {
            throw new Error('Remove.bg API failed');
        }
    } catch (error) {
        console.error('Remove.bg Error:', error.response ? error.response.statusText : error.message);
        throw new Error('Failed to remove background');
    }
};

module.exports = { removeBackground };
