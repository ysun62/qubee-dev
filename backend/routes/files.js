const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const File = require("../models/file");
const Folder = require("../models/folder");
// const imageMimeTypes = [
//   "image/jpeg",
//   "image/png",
//   "image/gif",
//   "image/bmp",
//   "image/svg+xml",
//   "image/tiff",
//   "image/x-icon",
// ];

const uploadPath = path.join(__dirname, File.fileBasePath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
    //cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", async (req, res) => {
  const images = await File.find().select("-__v").sort("name");
  res.send(images);
});

router.post("/", upload.array("mediaFiles"), async (req, res, next) => {
  //const folder = await Folder.findById(req.body);
  //const mediaTags = req.body.mediaTags;
  console.log(req);
  //const file = req.files.file;
  // const selectedFile = req.files.mediaFile;
  // const fileName = req.files !== null ? selectedFile.name : null;
  // //const fileNameSlug = fileName.toLowerCase().split(" ").join("-");
  // const url = req.protocol + "://" + req.get("host");
  // const file = new File({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: fileName,
  //   imageFilePath: `${url}/public/uploads/${selectedFile.name}`,
  //   dateAdded: moment().format("MMMM D, YYYY"),
  //   fileSize: humanFileSize(selectedFile.size, true),
  // });
  // await file
  //   .save()
  //   .then((result) => {
  //     res.status(201).json({
  //       message: "File uploaded successfully",
  //       imageFile: {
  //         _id: result._id,
  //         imageFilePath: result.imageFilePath,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(
  //       err,
  //       res.status(500).json({
  //         error: err,
  //       })
  //     );
  //   });
  // selectedFile.mv(`${uploadPath}/${selectedFile.name}`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }
  // });
});

router.delete("/:id", async (req, res) => {
  const file = await File.findByIdAndRemove(req.params.id);
  //const file = await File.deleteOne({ params: req.params.id });

  if (!file)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(file);
});

module.exports = router;
