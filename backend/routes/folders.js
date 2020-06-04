const Promise = require("bluebird");
const express = require("express");
const fs = Promise.promisifyAll(require("fs"));
const { join } = require("path");
const mongoose = require("mongoose");
const router = express.Router();
const { Folder, folderBasePath, validateFolder } = require("../models/folder");

// Returns true or false if it was successfull or not
async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (ex) {
    if (ex && ex.code === "ENOENT") {
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (ex) {
        console.error("Error creating the uploads folder", ex);
        return false;
      }
    } else {
      console.log("Error reading the uploads folder");
      return false;
    }
  }
  return true;
}

router.post("/", async (req, res) => {
  const uploadsFolder = join(__dirname, folderBasePath);
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);

  if (!folderExists) {
    return res
      .status(500)
      .send("There was an error creating the uploads folder.");
  }

  const objectId = new mongoose.Types.ObjectId();

  const folder = new Folder({
    _id: objectId,
    name: req.body.name,
  });

  try {
    await fs.mkdirAsync(`${uploadsFolder}/${objectId}`);
    try {
      await folder.save();
      console.log("Folder saved to MongoDB successfully");
    } catch (err) {
      res.status(500).send("There was an error saving the folder to MongoDB.");
      console.log(err);
    }
  } catch (err) {
    res.status(500).send("There was an error creating the folder.");
    console.log(err);
  }

  console.log(req.body);
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
