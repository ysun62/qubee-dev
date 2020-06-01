const Promise = require("bluebird");
const express = require("express");
const fs = Promise.promisifyAll(require("fs"));
const { join } = require("path");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const File = require("../models/file");
const mimeTypes = [
  // Images
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/svg+xml",
  "image/webp",
  "image/vnd.adobe.photoshop",
  "image/x-psd",
  "image/vnd.adobe.premiere",
  "image/mov",
  "image/x-quicktime",
  // Videos
  "video/JPEG",
  "video/jpeg2000",
  "video/3gpp",
  "video/3gpp2",
  "video/mov",
  "video/mp4",
  "video/ogg",
  "video/x-troff-msvideo",
  "video/avi",
  "video/msvideo",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-quicktime",
  "video/mpeg",
  "video/x-mpeg",
  "video/webm",
  "video/mp1s",
  "video/mp2p",
  // Audio
  "audio/aac",
  "sound/aiff",
  "audio/x-pn-aiff",
  "audio/rmf",
  "audio/x-rmf",
  "audio/x-mp3",
  "audio/x-m4a",
  "audio/midi",
  "audio/x-midi",
  "audio/ogg",
  "audio/mpeg",
  "audio/3gpp",
  "audio/3gpp2",
  "audio/mpeg3",
  "audio/x-mpeg",
  "audio/x-mpeg-3",
  "audio/wav",
  "audio/webm",
  // Documents
  "application/vnd.adobe.xdp+xml",
  "application/vnd.adobe.aftereffects.project",
  "application/vnd.adobe.aftereffects.template",
  "application/vnd.amazon.ebook",
  "application/postscript",
  "application/pdf",
  "application/octet-stream",
  "application/ogg",
  "application/vnd.adobe.xdp+xml",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-fontobject",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "application/vnd.visio",
  "application/rtf",
  "application/x-rtf",
  "text/richtext",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/xml",
  "application/x-httpd-php",
  "text/rss",
  "text/xml",
  "text/html",
  "text/css",
  "text/csv",
  "text/x-csv",
  "application/json",
  "application/ld+json",
  "application/epub+zip",
  "font/otf",
  "font/ttf",
  "font/woff",
  "font/woff2",
  // Compresses
  "application/x-freearc",
  "application/zip",
  "application/x-tar",
  "application/x-zip",
  "application/vnd.rar",
  "application/gzip",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
];

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
  const type = file.type.split("/").pop();
  if (mimeTypes.indexOf(type) === -1) {
    console.log("The file type is invalid.");
    return false;
  }
  return true;
}

router.post("/", async (req, res) => {
  const uploadsFolder = join(__dirname, "../../public", "uploads");
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);
  console.log(req.files.mediaFiles);

  //const uploadFile = req.files.file;
  //   const fileName =
  //     uuidv4() + "-" + uploadFile.name.toLowerCase().split(" ").join("-");

  if (!folderExists) {
    return res.json({
      ok: false,
      msg: "There was an error creating the uploads folder.",
    });
  }

  //   uploadFile.mv(`${uploadsFolder}/${fileName}`, function (err) {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }

  //     res.json({
  //       file: `${uploadsFolder}/${uploadFile.name}`,
  //     });
  //   });
});

router.get("/", async (req, res) => {
  const files = await File.find().select("-__v").sort("name");
  res.send(files);
});

router.delete("/:id", async (req, res) => {
  const file = await File.findByIdAndRemove(req.params.id);
  //const file = await File.deleteOne({ params: req.params.id });

  if (!file)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(file);
});

module.exports = router;
