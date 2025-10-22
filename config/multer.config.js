// config/multer.config.js
const multer = require('multer');

// multer stores uploaded file temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload };
