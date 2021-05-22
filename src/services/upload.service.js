const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    // console.log(req);
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};
const streamMultiUpload = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { resource_type: 'video' }, (err, res) => {
      if (err) return res.json('loi upload');
      // console.log(res.secure_url);
      resolve(res.secure_url);
    });
  });
};

module.exports = {
  streamUpload,
  streamMultiUpload,
};
