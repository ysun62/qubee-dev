const Promise = require("bluebird");
const express = require("express");
const router = express.Router();
const { join } = require("path");
const { File, fileBasePath, validate } = require("../models/file");
const uploadsFolder = join(__dirname, fileBasePath);

router.post("/", async (req, res) => {
  const files = req.body.files || [];
  const filesPms = files.filter(item => !!item).map(id => File.findById(id));
  const fileModels = await Promise.all(filesPms);
  const availableFiles = fileModels.filter(file => !!file);

  if (availableFiles.length >= 2) {
    const zipFiles = availableFiles
      .filter(file => !!file)
      .map(file => ({
        path: join(uploadsFolder, file.slug),
        name: file.name,
      }));

    try {
      await res.zip({
        files: zipFiles,
        filename: 'QubeeFiles.zip'
      });
    } catch (e) {
      console.log(e);
    }
  } else if (availableFiles.length === 1 ) {
    const filename = join(uploadsFolder, file.slug);
    res.download(filename);
  } else {
    res.status(500).send('File not found');
  }
});

module.exports = router;
