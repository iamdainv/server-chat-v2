const express = require('express');
const multer = require('multer');

const { uploadController } = require('../../controllers/index');

const upload = multer({ dest: 'tmp' });
const router = express.Router();

router.post('/', upload.array('images'), uploadController.uploadImages);

module.exports = router;
