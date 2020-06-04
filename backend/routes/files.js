const Promise = require("bluebird");
const express = require("express");
const { IncomingForm } = require("formidable");
const multer = require("multer");
const fs = Promise.promisifyAll(require("fs"));
const util = require("util");
const { join } = require("path");
const mongoose = require("mongoose");
const mimeTypes = require("../utils/mimetypes");
const router = express.Router();
const { File, fileBasePath, validate } = require("../models/file");
const { Folder } = require("../models/folder");

const uploadsFolder = join(__dirname, "../public", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// Returns true or false if it was successfull or not
async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (err) {
    if (err && err.code === "ENOENT") {
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (err) {
        console.error("Error creating the uploads folder", err);
        return false;
      }
    } else {
      console.log("Error reading the uploads folder");
      return false;
    }
  }
  return true;
}

// Returns true or false in case it was successful
function checkFileType(file) {
  const type = file.type;

  if (mimeTypes.indexOf(type) === -1) {
    console.log("The file type is invalid.");
    return false;
  }
  return true;
}

// function extendTimeout (req, res, next) {
//   res.setTimeout(480000, function () { /* Handle timeout */ })
//   next()
// }

router.get("/", async (req, res) => {
  const files = await File.find().select("-__v").sort("name");
  res.send(files);
});

router.post("/", upload.array("mediaFiles", 10), async (req, res, next) => {
  const uploadsFolder = join(__dirname, fileBasePath);
  const tempDir = join(__dirname, "../tmp");
  const form = new IncomingForm({
    multiples: true,
    uploadDir: tempDir,
  });
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);
  const files = [];

  /* Multer */
  const selectedFiles = req.files;

  //   if (!folderExists) {
  //     return res.json({
  //       ok: false,
  //       msg: "There was an error creating the uploads folder.",
  //     });
  //   }

  //   if (!selectedFiles) {
  //     const error = new Error("Please choose files");
  //     return res.status(400).send(error);
  //   }

  console.log(selectedFiles);
  res.send(selectedFiles);

  //   form
  //     .on("file", async (fieldName, file) => {
  //       console.log({ file });
  //       console.log(req);
  //       const objectId = new mongoose.Types.ObjectId();
  //       const fileName =
  //         objectId + "-" + file.name.toLowerCase().split(" ").join("-");
  //       const isValidFile = checkFileType(file);

  //       if (!isValidFile) {
  //         try {
  //           await fs.unlinkAsync(file.path);
  //         } catch (err) {
  //           console.log("The file was deleted.", err);
  //         }
  //       }

  //       files.push({ fieldName, file });

  //       const folder = await Folder.findById(req.body.folderId);

  //       const selectedFile = new File({
  //         name: file.name,
  //         path: `/uploads/${fileName}`,
  //         size: file.size,
  //         inFolders: {
  //           _id: folder._id,
  //           name: folder.name,
  //           path: folder.path,
  //         },
  //       });

  //       try {
  //         await fs.renameAsync(file.path, join(uploadsFolder, fileName));
  //         try {
  //           await selectedFile.save();
  //         } catch (err) {
  //           console.log("Couldn't save to MondoDB...", err);
  //         }
  //       } catch (err) {
  //         console.log("The file upload failed...", err);
  //       }
  //     })
  //     .on("end", () => {
  //       console.log("-> upload done");
  //       res.send(files);
  //     });

  //   form.parse(req);
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
