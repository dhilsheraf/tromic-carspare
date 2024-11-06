const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/products/';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed'), false);
    }
});

// Middleware to resize images
const resizeImages = async (req, res, next) => {
    if (!req.files || req.files.length < 3) return res.status(400).send('Please upload at least 3 images.');

    req.body.images = [];
    await Promise.all(
        req.files.map(async (file) => {
            const filename = `resized-${Date.now()}-${file.originalname}`;
            await sharp(file.path)
                .resize(800, 800)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(path.resolve(file.destination, filename));

            req.body.images.push(`/uploads/products/${filename}`);
            fs.unlinkSync(file.path); // Remove original image
        })
    );

    next();
};

module.exports = { upload, resizeImages };