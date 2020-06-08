const Promise = require("bluebird");
const express = require("express");
const fsDebug = require("debug")("app:fs");
const dbDebug = require("debug")("app:db");
const debug = require("debug")("app:debug");
const fs = Promise.promisifyAll(require("fs"));
const { join } = require("path");
const mongoose = require("mongoose");
const router = express.Router();
const { Folder, folderBasePath, validateFolder } = require("../models/folder");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

// Returns true or false if it was successfull or not
// async function checkCreateUploadsFolder(uploadsFolder) {
//   try {
//     await fs.statAsync(uploadsFolder);
//   } catch (ex) {
//     if (ex && ex.code === "ENOENT") {
//       try {
//         await fs.mkdirAsync(uploadsFolder);
//       } catch (ex) {
//         console.error("Error creating the uploads folder", ex);
//         return false;
//       }
//     } else {
//       console.log("Error reading the uploads folder");
//       return false;
//     }
//   }
//   return true;
// }

async function checkCreateUploadsFolder(uploadsFolder) {
  const rootDirectory = Boolean(await Folder.findOne({ name: "Files" }));
  const folder = new Folder({
    name: "Files",
    slug: "files",
    rootDirectory: true,
  });

  dbDebug("Root dir exist:", rootDirectory);

  try {
    await fs.accessAsync(uploadsFolder);

    if (!rootDirectory) await folder.save();

    return true;
  } catch (ex) {
    try {
      await fs.mkdirAsync(uploadsFolder);

      if (!rootDirectory) await folder.save();

      return true;
    } catch (ex) {
      fsDebug("Cannot create folder", ex);
      return false;
    }
  }
}

router.post("/", async (req, res) => {
  const uploadsFolder = join(__dirname, folderBasePath);
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);

  if (!folderExists) {
    return res
      .status(500)
      .send("There was an error creating the uploads folder.");
  }

  const parentDirectory =
    (await Folder.findById(req.body.folderId)) ||
    (await Folder.findOne({ name: "Files" }).select("_id name slug"));

  dbDebug(parentDirectory);

  if (!parentDirectory) {
    return res.status(400).send("Invalid folder.");
  }

  const slug = req.body.name.replace(/\s+/g, "-").toLowerCase();

  const folder = new Folder({
    name: req.body.name,
    slug: slug,
    folder: {
      _id: parentDirectory._id,
      name: parentDirectory.name,
      slug: parentDirectory.slug,
    },
  });

  try {
    await fs.mkdirAsync(`${uploadsFolder}/${slug}`);
    try {
      await folder.save();
      dbDebug("Folder saved to MongoDB successfully", req.body);
      res.status(200).send(folder);
    } catch (err) {
      dbDebug(err);
      res.status(500).send("There was an error saving the folder to MongoDB.");
    }
  } catch (err) {
    fsDebug("Directory already exists.", err);
    res.status(500).send("Directory already exists.");
  }
});

router.delete("/:id", async (req, res) => {
  const folder = await Folder.findByIdAndRemove(req.params.id);
  //const image = await Image.deleteOne({ params: req.params.id });

  if (!folder)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(folder);
});

router.get("/", async (req, res) => {
  const folders = await Folder.find().select("-__v").sort("name");
  res.send(folders);
});

module.exports = router;
