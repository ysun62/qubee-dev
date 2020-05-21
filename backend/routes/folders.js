const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Folder = require("../models/folder");

const DIR = path.join(__dirname, Folder.folderBasePath);

router.post("/", async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(url);

  const objectId = new mongoose.Types.ObjectId();
  const folder = new Folder({
    _id: objectId,
    folderName: req.body.folderName,
    folderPath: objectId,
    dateAdded: moment().format("MMMM D, YYYY"),
  });

  await folder
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Folder created successfully",
        folder: {
          _id: result._id,
          folderAbsolutePath: result.folderAbsolutePath,
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

  // Create folder
  fs.mkdir(`${DIR}/${objectId}`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  //res.send(req.body.folderName);
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
