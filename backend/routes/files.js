const Promise = require("bluebird");
const express = require("express");
const { IncomingForm } = require("formidable");
const multer = require("multer");
const fs = Promise.promisifyAll(require("fs"));
const util = require("util");
const path = require("path");
const mongoose = require("mongoose");
const mimeTypes = require("../utils/mimetypes");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { File, fileBasePath, validate } = require("../models/file");
const { Folder } = require("../models/folder");

const tempDir = path.join(__dirname, "../public", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
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

// Returns true or false if it was successfull or not
async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (ex) {
    if (ex && ex.code === "ENOENT") {
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (ex) {
        console.error("Error creating the uploads folder", ex);
        return false;
      }
    } else {
      console.log("Error reading the uploads folder");
      return false;
    }
  }
  return true;
}
router.get("/", async (req, res) => {
  const files = await File.find().select("-__v").sort("name");
  res.send(files);
});

router.post("/", upload.array("mediaFiles", 10), async (req, res, next) => {
  const uploadsFolder = path.join(__dirname, fileBasePath);
  const selectedFiles = req.files;
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);

  if (!selectedFiles) {
    const error = new Error("Please choose files.");
    return res.status(400).send(error);
  }

  if (!folderExists) {
    const error = new Error("There was an error creating the uploads folder.");
    return res.status(400).send(error);
  }

  console.log(selectedFiles, req.body);

  for (let selectedFile of selectedFiles) {
    // const folder = await Folder.findById(req.body.folderId);
    // if (!folder) {
    //   //return res.status(400).send("Invalid folder.");
    // }

    const file = new File({
      name: selectedFile.originalname,
      path: `/uploads/${selectedFile.filename}`,
      size: selectedFile.size,
      // folders: {
      //   _id: folder._id,
      //   name: folder.name,
      // },
    });

    try {
      await fs.renameAsync(
        selectedFile.path,
        path.join(uploadsFolder, selectedFile.filename)
      );
      try {
        await file.save();
      } catch (ex) {
        console.log("Couldn't save to MondoDB...", ex);
      }
    } catch (ex) {
      console.log("The file upload failed...", ex);
    }

    console.log(file);
    res.send(file);
  }
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body.metaTags);

  // const folder = await Folder.findById(req.body.folderId);
  // if (!folder) return res.status(400).send("Invalid folder.");

  const file = await File.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!file)
    return res.status(404).send("The movie with the given ID was not found");

  res.send(file);
});

router.get("/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(file);
});

router.delete("/:id", async (req, res) => {
  const file = await File.findByIdAndRemove(req.params.id);
  //const file = await File.deleteOne({ params: req.params.id });

  if (!file)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(file);
});

module.exports = router;
