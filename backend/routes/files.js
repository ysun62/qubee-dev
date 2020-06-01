const Promise = require("bluebird");
const express = require("express");
const { IncomingForm } = require("formidable");
const fs = Promise.promisifyAll(require("fs"));
const util = require("util");
const { join } = require("path");
const mongoose = require("mongoose");
const mimeTypes = require("../utils/mimetypes");
const router = express.Router();
const { File, fileBasePath, validate } = require("../models/file");
const { Folder } = require("../models/folder");

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

router.post("/", async (req, res) => {
  const uploadsFolder = join(__dirname, fileBasePath);
  const tempDir = join(__dirname, "../tmp");
  const form = new IncomingForm({
    multiples: true,
    uploadDir: tempDir,
    maxFileSize: 5000 * 1024 * 1024,
  });
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);
  const files = [];

  if (!folderExists) {
    return res.json({
      ok: false,
      msg: "There was an error creating the uploads folder.",
    });
  }

  form
    .on("file", async (fieldName, file) => {
      console.log({ file });
      console.log(req);
      const objectId = new mongoose.Types.ObjectId();
      const fileName =
        objectId + "-" + file.name.toLowerCase().split(" ").join("-");
      const isValidFile = checkFileType(file);

      if (!isValidFile) {
        try {
          await fs.unlinkAsync(file.path);
        } catch (err) {
          console.log("The file was deleted.", err);
        }
      }

      files.push({ fieldName, file });

      const folder = await Folder.findById(req.body.folderId);

      const selectedFile = new File({
        name: file.name,
        path: `/uploads/${fileName}`,
        size: file.size,
        inFolders: {
          _id: folder._id,
          name: folder.name,
          path: folder.path,
        },
      });

      try {
        await fs.renameAsync(file.path, join(uploadsFolder, fileName));

        try {
          await selectedFile.save();
        } catch (err) {
          console.log("Couldn't save to MondoDB...", err);
        }
      } catch (err) {
        console.log("The file upload failed...", err);
      }
    })
    .on("end", () => {
      console.log("-> upload done");
      // res.writeHead(200, { "content-type": "text/plain" });
      // res.write(`received fields:\n\n${util.inspect(fields)}`);
      // res.write("\n\n");
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
  //       // return res.json({
  //       //   ok: false,
  //       //   msg: "The file received is an invalid type.",
  //       // });
  //       console.log("The file received is an invalid type.");
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
  //       // return res.json({
  //       //   ok: false,
  //       //   msg: "The file was not uploaded.",
  //       // });
  //       console.log("The file was not uploaded.");
  //     }
  //     //myUploadedFiles.push(fileName);
  //   } else {
  //     // There are multiple files
  //     for (let i = 0; i < files.mediaFiles.length; i++) {
  //       const file = files.mediaFiles[i];
  //       const isValidFile = checkFileType(file);
  //       const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, "-"));

  //       if (!isValidFile) {
  //         // return res.json({
  //         //   ok: false,
  //         //   msg: "The file received is an invalid type.",
  //         // });
  //         console.log("The file received is an invalid type.");
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
  //         console.log("The file was not uploaded.");
  //       }
  //       //myUploadedFiles.push(fileName);
  //     }
  //   }
  //   console.log("The files was uploaded successfully.");

  // return res.json({
  //   ok: true,
  //   msg: "The files was uploaded successfully.",
  //   files: myUploadedFiles,
  // });
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
