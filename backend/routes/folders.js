const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Folder = require("../models/folder");

const DIR = path.join(__dirname, "../../public/uploads/folder");

router.post("/", async (req, res) => {
  const objectId = new mongoose.Types.ObjectId();
  const folder = new Folder({
    _id: objectId,
    name: req.body.folderName,
    folderAbsolutePath:
      "http://localhost:3000/public/uploads/folder/" + objectId,
    folderRelativePath: "/public/uploads/folder/" + objectId,
    dateAdded: moment().format("MMMM D, YYYY"),
  });

  await folder
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Folder uploaded successfully",
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

  // Create directory
  fs.mkdir(`${DIR}/${objectId}`, () => {
    fs.writeFile(
      `${DIR}/${objectId}/index.html`,
      `Folder ID: ${objectId}`,
      (err) => {
        if (err) throw err;
        console.log("The file has been added!");
      }
    );
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
