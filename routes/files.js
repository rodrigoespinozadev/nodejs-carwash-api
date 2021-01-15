const images = require('../lib/images');
var express = require('express');
var router = express.Router();
const { File } = require('../models')

router.post(
  '/',
  images.multer.single('image'),
  images.sendUploadToGCS,
  async (req, res) => {
    let data = req.body;

    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    const savedData = await File.create({
			filepath: req.file.cloudStoragePublicUrl,
			mimetype: req.file.mimetype
		});

		res.json(savedData)
  }
);

module.exports = router;
