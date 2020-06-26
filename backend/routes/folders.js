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
const { File, fileBasePath, validate } = require("../models/file");

const uploadsFolder = join(__dirname, folderBasePath);

// function deleteFolderRecursive(path) {
//   if (fs.existsSync(path)) {
//     fs.readdirSync(path).forEach((file, index) => {
//       const curPath = join(path, file);
//       if (fs.lstatSync(curPath).isDirectory()) {
//         // recurse
//         deleteFolderRecursive(curPath);
//       } else {
//         // delete file
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.rmdirSync(path);
//   }
// }

router.post("/", async (req, res) => {
  const folderName = req.body.name;
  const parentDirectoryId = req.body.parentDirectoryId;
  const slug = folderName.replace(/\s+/g, "-").toLowerCase();

  dbDebug(parentDirectoryId);

  if (!parentDirectoryId) {
    return res.status(400).send("Invalid folder.");
  }

  const folder = new Folder({
    name: folderName,
    slug,
    parentDirectoryId,
  });

  // Create virtual directories
  try {
    await folder.save();
    dbDebug("Folder saved to MongoDB successfully", req.body);
    res.status(200).send(folder);
  } catch (err) {
    dbDebug("Folder could not be saved:", err);
    res.status(500).send("There was an error saving the folder to MongoDB.");
  }

  // Create physical directories
  // try {
  //   await fs.mkdirAsync(`${uploadsFolder}/${slug}`);
  //   try {
  //     await folder.save();
  //     dbDebug("Folder saved to MongoDB successfully", req.body);
  //     res.status(200).send(folder);
  //   } catch (err) {
  //     dbDebug(err);
  //     res.status(500).send("There was an error saving the folder to MongoDB.");
  //   }
  // } catch (err) {
  //   fsDebug("Directory already exists.", err);
  //   res.status(500).send("Directory already exists.");
  // }
});

router.put("/:id", async (req, res) => {
  // Update this code...
  const folder = Folder.updateOne({ _id: 1 }, [
    {
      $set: {
        lastModified: "$$NOW",
        cancellation: { date: "$$CLUSTER_TIME", reason: "user request" },
        status: "D",
      },
    },
  ]);
  res.send(folder);
});

router.delete("/:id", async (req, res) => {
  const folder = await Folder.findById(req.params.id);

  dbDebug(folder);

  if (!folder)
    return res.status(404).send("The folder with the given ID was not found.");

  await folder.remove();

  res.send(folder);
});

router.get("/", async (req, res) => {
  const folders = await Folder.find().select("-__v").sort("name");
  res.send(folders);
});

module.exports = router;
