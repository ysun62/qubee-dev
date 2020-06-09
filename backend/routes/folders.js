const Promise = require("bluebird");
const express = require("express");
const fsDebug = require("debug")("app:fs");
const dbDebug = require("debug")("app:db");
const debug = require("debug")("app:debug");
const fs = Promise.promisifyAll(require("fs"));
const { join } = require("path");
const mongoose = require("mongoose");
const router = express.Router();
const createUploadsDirs = require("../utils/createUploadsDirs");
const { Folder, folderBasePath, validateFolder } = require("../models/folder");

const uploadsFolder = join(__dirname, folderBasePath);

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

router.post("/", async (req, res) => {
  const folderExists = await createUploadsDirs(uploadsFolder);

  if (!folderExists) {
    return res
      .status(500)
      .send("There was an error creating the uploads folder.");
  }

  const parentDirectory = await Folder.findById(req.body.folderId);
  //|| (await Folder.findOne({ name: "Files" }).select("_id name"));

  dbDebug(parentDirectory);

  if (!parentDirectory) {
    return res.status(400).send("Invalid folder.");
  }

  //const slug = req.body.name.replace(/\s+/g, "-").toLowerCase();

  const folder = new Folder({
    name: req.body.name,
    parents: [parentDirectory._id],
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
