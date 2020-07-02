const Promise = require("bluebird");
const express = require("express");
const router = express.Router();
const { join } = require("path");
const { File, fileBasePath, validate } = require("../models/file");
const uploadsFolder = join(__dirname, fileBasePath);

router.post("/", async (req, res) => {
  const files = req.body.files || '';
  const filesPms = files.filter(item => !!item).map(id => File.findById(id));
  const fileModels = await Promise.all(filesPms);

  const zipFiles = fileModels
    .filter(file => !!file)
    .map(file => ({
      path: join(uploadsFolder, file.slug),
      name: file.name,
    }));

  try {
    await res.zip({
      files: zipFiles,
      filename: 'download.zip'
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
