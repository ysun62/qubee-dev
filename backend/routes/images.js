const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Image = require("../models/image");
const Folder = require("../models/folder");
const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/tiff",
  "image/x-icon",
];

const uploadPath = path.join(__dirname, Image.imageBasePath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    // cb(null, fileName);
    cb(null, uuidv4() + "-" + fileName);
  },
});

//var upload = multer({ storage: storage }).array("file");
//var cpUpload = upload.fields({ name: "file", maxCount: 10 });

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype === "image/png" || "image/jpg" || "image/jpeg") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
});

// app.post("/images", (req, res) => {
//   if (req.files === null)
//     return res.status(400).json({ msg: "No file uploaded" });

//   const file = req.files.files;

//   file.mv(`${uploadsPath}/public/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

router.get("/", async (req, res) => {
  const images = await Image.find().select("-__v").sort("name");
  res.send(images);
});

router.post("/", upload.single("mediaFile"), async (req, res) => {
  //const folder = await Folder.findById(req.body);
  //const mediaTags = req.body.mediaTags;

  //console.log(req.files.mediaFile);

  //const file = req.files.file;
  const selectedFile = req.files.mediaFile;
  const fileName = req.files !== null ? selectedFile.name : null;
  //const fileNameSlug = fileName.toLowerCase().split(" ").join("-");
  const url = req.protocol + "://" + req.get("host");
  const image = new Image({
    _id: new mongoose.Types.ObjectId(),
    name: fileName,
    imageFilePath: `${url}/public/uploads/${selectedFile.name}`,
    dateAdded: moment().format("MMMM D, YYYY"),
    fileSize: humanFileSize(selectedFile.size, true),
  });

  await image
    .save()
    .then((result) => {
      res.status(201).json({
        message: "File uploaded successfully",
        imageFile: {
          _id: result._id,
          imageFilePath: result.imageFilePath,
        },
      });
    })
    .catch((err) => {
      console.log(
        err,
        res.status(500).json({
          error: err,
        })
      );
    });

  selectedFile.mv(`${uploadPath}/${selectedFile.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
});

// Convert file size to human readable string
function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  var units = si
    ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + " " + units[u];
}

router.delete("/:id", async (req, res) => {
  const image = await Image.findByIdAndRemove(req.params.id);
  //const image = await Image.deleteOne({ params: req.params.id });

  if (!image)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(image);
});

module.exports = router;
