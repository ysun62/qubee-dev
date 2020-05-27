const Promise = require("bluebird");
const express = require("express");
const { IncomingForm } = require("formidable");
const fs = Promise.promisifyAll(require("fs"));
const util = require("util");
const { join } = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const File = require("../models/file");
const Folder = require("../models/folder");
const mimeTypes = [
  // Images
  "png",
  "jpeg",
  "gif",
  "bmp",
  "x-windows-bmp",
  "tiff",
  "x-icon",
  "svg+xml",
  "webp",
  // Videos
  "3gpp",
  "3gpp2",
  "mov",
  "mp4",
  "x-troff-msvideo",
  "avi",
  "msvideo",
  "x-msvideo",
  "quicktime",
  "mpeg",
  "x-mpeg",
  "webm",
  // Audio
  "aac",
  "aiff",
  "x-aiff",
  "x-midi",
  "ogg",
  "mpeg3",
  "x-mpeg-3",
  "wav",
  // Documents
  "postscript",
  "pdf",
  "msword",
  "vnd.openxmlformats-officedocument.wordprocessingml.document",
  "vnd.ms-fontobject",
  "vnd.openxmlformats-officedocument.presentationml.presentation",
  "vnd.ms-powerpoint",
  "vnd.visio",
  "rtf",
  "x-rtf",
  "richtext",
  "plain",
  "vnd.ms-excel",
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "xml",
  "html",
  "css",
  "csv",
  "json",
  "epub+zip",
  "otf",
  "ttf",
  "woff",
  "woff2",
  // Compresses
  "zip",
  "x-tar",
  "x-zip",
  "x-gzip",
  "x-bzip",
  "x-bzip2",
  "x-rar-compressed",
  "x-7z-compressed",
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

async function saveFiles(fields, files) {
  for (const file of files) {
    const selectedFile = new File({
      fileName: file.name,
      filePath: `/uploads/${file.fileName}`,
      fileSize: file.size,
      fileMetaTags: fields,
    });
    await selectedFile.save();
  }
}

router.post("/", async (req, res, next) => {
  const uploadsFolder = join(__dirname, "../public", "uploads");
  const form = new IncomingForm({
    multiples: true,
    uploadDir: uploadsFolder,
    keepExtensions: true,
  });
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);
  const files = [];
  const fields = [];

  if (!folderExists) {
    return res.json({
      ok: false,
      msg: "There was an error creating the uploads folder.",
    });
  }

  form
    .on("field", async (fieldName, value) => {
      value.toLowerCase().split(/[ ,]+/);
      console.log(value);
      fields.push(value);
    })
    .on("file", async (fieldName, file) => {
      const fileName =
        uuidv4() + "-" + file.name.toLowerCase().split(" ").join("-");
      console.log({ file, fileName });
      const isValidFile = checkFileType(file);
      if (!isValidFile) {
        return res.json({
          ok: false,
          msg: `The file ${file} is an invalid type.`,
        });
      } else {
        files.push({ file: file, fileName: fileName });
        await fs.renameAsync(file.path, join(uploadsFolder, fileName));
      }
    })
    .on("end", () => {
      saveFiles(fields, files);
      console.log("-> upload done");
      res.writeHead(200, { "content-type": "text/plain" });
      res.write(`received fields:\n\n${util.inspect(fields)}`);
      res.write("\n\n");
      res.end(`received files:\n\n${util.inspect(files)}`);
    });

  form.parse(req);

  // form.parse(req, async (err, fields, files) => {
  //   let myUploadedFiles = [];

  //   if (err) {
  //     console.log("Error parsing the files", err);
  //     return res.json({
  //       ok: false,
  //       msg: "Error parsing the files.",
  //     });
  //   }

  //   if (!files.mediaFiles.length) {
  //     // There's only one file
  //     const file = files.mediaFiles;
  //     const isValidFile = checkFileType(file);
  //     const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, "-"));

  //     if (!isValidFile) {
  //       return res.json({
  //         ok: false,
  //         msg: "The file received is an invalid type.",
  //       });
  //     }

  //     try {
  //       await fs.renameAsync(file.path, join(uploadsFolder, fileName));
  //     } catch (err) {
  //       console.log(
  //         "The file upload failed, trying to remove the temp file..."
  //       );
  //       try {
  //         await fs.unlinkAsync(file.path);
  //       } catch (err) {
  //         console.log("The file was deleted.", err);
  //       }
  //       return res.json({
  //         ok: false,
  //         msg: "The file was not uploaded.",
  //       });
  //     }
  //     myUploadedFiles.push(fileName);
  //   } else {
  //     // There are multiple files
  //     for (let i = 0; i < files.mediaFiles.length; i++) {
  //       const file = files.mediaFiles[i];
  //       const isValidFile = checkFileType(file);
  //       const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, "-"));
  //       if (!isValidFile) {
  //         return res.json({
  //           ok: false,
  //           msg: "The file received is an invalid type.",
  //         });
  //       }

  //       try {
  //         await fs.renameAsync(file.path, join(uploadsFolder, fileName));
  //       } catch (err) {
  //         console.log(
  //           "The file upload failed, trying to remove the temp file..."
  //         );
  //         try {
  //           await fs.unlinkAsync(file.path);
  //         } catch (err) {}
  //         return res.json({
  //           ok: false,
  //           msg: "The file was not uploaded.",
  //         });
  //       }
  //       myUploadedFiles.push(fileName);
  //     }
  //   }
  //   // return res.json({
  //   //   ok: true,
  //   //   msg: "The files was uploaded successfully.",
  //   //   files: myUploadedFiles,
  //   // });
  //   res.json({ fields, files });
  // });
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
