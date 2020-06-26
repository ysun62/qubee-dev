const Promise = require("bluebird");
const express = require("express");
const fsDebug = require("debug")("app:fs");
const dbDebug = require("debug")("app:db");
const debug = require("debug")("app:debug");
const multer = require("multer");
const moment = require("moment");
const fileExtension = require("file-extension");
const MyCustomStorage = require("../utils/customStorage");
const fs = Promise.promisifyAll(require("fs"));
const { join } = require("path");
const mimeTypes = require("../utils/mimetypes");
const router = express.Router();
const { File, fileBasePath, validate } = require("../models/file");

const tempDir = join(__dirname, "../public", "uploads/");
const uploadsFolder = join(__dirname, fileBasePath);

const storage = MyCustomStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      tempDir +
        Date.now() +
        "-" +
        file.originalname.toLowerCase().split(" ").join("-")
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (mimeTypes.indexOf(file.mimetype) !== -1) {
    cb(null, true);
  } else {
    req.fileValidationError = "The file type is invalid.";
    return cb(new Error("The file type is invalid."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5120,
  },
});

router.post("/", upload.array("mediaFiles", 12), async (req, res) => {
  const selectedFiles = req.files;

  debug("Selected file ->", selectedFiles);

  for (let selectedFile of selectedFiles) {
    const fileExt = fileExtension(selectedFile.originalname);
    const slug = selectedFile.originalname.replace(/\s+/g, "-").toLowerCase();
    const parentDirectoryId = JSON.parse(req.body.mediaFiles).parentDirectoryId;

    dbDebug("Parent directory ID ->", parentDirectoryId);

    if (!parentDirectoryId) {
      dbDebug("Invalid folder");
      return res.status(400).send("Invalid folder");
    }

    const file = new File({
      name: selectedFile.originalname,
      fileExtension: fileExt,
      slug,
      size: selectedFile.size,
      parentDirectoryId,
    });

    try {
      await fs.accessAsync(join(uploadsFolder, slug));
      fsDebug("File already exists.");
      res.status(400).send("File already exists.");
    } catch (ex) {
      try {
        await fs.renameAsync(selectedFile.path, join(uploadsFolder, slug));
        fsDebug("File moved to uploads folder successfully.");
        try {
          await file.save();
          dbDebug("Document created successfully in MongoDB.", file);
          res.send(file);
        } catch (ex) {
          await fs.unlinkAsync(join(uploadsFolder, slug));
          dbDebug("Could not create document in MongoDB.", ex);
          res.status(500).send("Could not create document in MongoDB.");
        }
      } catch (ex) {
        fsDebug("Could not move file to uploads folder.", ex);
        res.status(500).send("Could not move file to  uploads folder.");
      }
    }
  }
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  dbDebug(req.body);

  const oldFilename = await File.findById(req.body._id);
  dbDebug(oldFilename.slug);

  // const folder = await Folder.findById(req.body.folderId);
  // if (!folder) return res.status(400).send("Invalid folder.");

  if (req.body.slug !== oldFilename.slug) {
    await fs
      .accessAsync(join(uploadsFolder, oldFilename.slug))
      .then(async () => {
        fs.rename(
          join(uploadsFolder, req.body.slug),
          join(uploadsFolder, oldFilename.slug),
          (err) => {
            return res
              .status(500)
              .send("There was an error renaming the file with given ID.", err);
          }
        );

        const file = await File.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );

        if (!file)
          return res
            .status(404)
            .send("The file with the given ID was not found.");

        res.send(file);
      })
      .catch(() => {
        res.status(500).send("The file doesn't exist in the uploads folder.");
      });
  } else {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!file)
      return res.status(404).send("The file with the given ID was not found.");

    res.send(file);
  }
});

router.delete("/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  dbDebug(file);

  if (!file)
    return res.status(404).send("The file with the given ID was not found.");

  await fs
    .unlinkAsync(join(uploadsFolder, file.slug))
    .then(() => {
      fsDebug("File delete successfully!");
      file.remove();
      res.send(file);
    })
    .catch((ex) => {
      fsDebug("File was not deleted.", ex);
      res.status(500).send("File was not deleted. " + ex);
    });
});

router.get("/", async (req, res) => {
  const files = await File.find().select("-__v").sort("name");
  res.send(files);
});

router.get("/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file)
    return res.status(404).send("The file with the given ID was not found.");

  res.send(file);
});

module.exports = router;
