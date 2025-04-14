const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs');
const multer = require("multer");

const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/home", (req, res) => {
    res.render("home", { title: "Home" });
});

router.post('/upload-file', upload.single('file'), (req, res) => {
    res.json({
        message: 'File uploaded successfully!',
        file: req.file,
    });
});

module.exports = { router, UPLOAD_DIR };
