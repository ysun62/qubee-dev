const Promise = require("bluebird");
const express = require("express");
const multer = require("multer");
const MyCustomStorage = require("../utils/customStorage");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const mongoose = require("mongoose");
const mimeTypes = require("../utils/mimetypes");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { File, fileBasePath, validate } = require("../models/file");
const { Folder } = require("../models/folder");

const tempDir = path.join(__dirname, "../public", "uploads/");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tempDir);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
//     );
//   },
// });

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

// Returns true or false if it was successfull or not
async function checkCreateUploadsFolder(uploadsFolder) {
  fs.access(uploadsFolder, fs.constants.F_OK, async (error) => {
    if (error) {
      await fs.mkdirAsync(uploadsFolder);
      return false;
    } else {
      console.log("The Folder exists.");
      return true;
    }
  });
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
    // const filename =
    //   Date.now() +
    //   "-" +
    //   selectedFile.originalname.toLowerCase().split(" ").join("-");
    // const folder = await Folder.findById(req.body.folderId);
    // if (!folder) {
    //   //return res.status(400).send("Invalid folder.");
    // }

    const file = new File({
      name: selectedFile.originalname,
      path: new mongoose.Types.ObjectId(),
      size: selectedFile.size,
      // folders: {
      //   _id: folder._id,
      //   name: folder.name,
      // },
    });

    fs.access(
      path.join(uploadsFolder, selectedFile.originalname),
      fs.constants.F_OK,
      async (error) => {
        if (error) {
          await fs
            .renameAsync(
              selectedFile.path,
              path.join(uploadsFolder, selectedFile.originalname)
            )
            .then(async () => {
              await file.save();
              res.send(file);
            })
            .catch((error) => console.log("Rename Error:", error));
        } else {
          console.log("The file exists.");
          res.status(400).send("The file exists.");
        }
      }
    );
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
  console.log(req);

  //const file = await File.findByIdAndRemove(req.params.id);
  //const file = await File.deleteOne({ params: req.params.id });

  // if (!file)
  //   return res.status(404).send("The movie with the given ID was not found.");

  // res.send(file);
});

module.exports = router;
