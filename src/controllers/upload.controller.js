const { streamMultiUpload } = require('../services/upload.service');

const uploadImages = async (req, res) => {
  const { files } = req;
  try {
    const result = await Promise.all(files.map((file) => streamMultiUpload(file.path)));
    return res.json({
      images: result,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

module.exports = {
  uploadImages,
};
