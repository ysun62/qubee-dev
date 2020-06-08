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
const { Setting, validateSetting } = require("../models/setting");

const uploadsFolder = join(__dirname, folderBasePath);

async function createStartupFolders() {
  const isInit = await Setting.find().select("appInit");

  if (!isInit.length || !isInit[0].appInit) {
    const folderExists = await checkCreateUploadsFolder(uploadsFolder);
    const startupFolders = [
      {
        name: "Documents",
        isRoot: true,
      },
      {
        name: "Pictures",
        isRoot: true,
      },
      {
        name: "Videos",
        isRoot: true,
      },
    ];

    if (!folderExists)
      return console.log("There was an error creating the uploads folder.");

    for (let folder of startupFolders) {
      await new Folder({
        name: folder.name,
        isRoot: folder.isRoot,
      }).save();
    }

    try {
      if (isInit[0]) {
        await Setting.findOneAndUpdate(
          { _id: isInit[0]._id },
          {
            $set: {
              appInit: true,
            },
          },
          { new: true }
        );
      } else {
        await new Setting({
          appInit: true,
        }).save();
      }
    } catch (ex) {
      console.log(ex);
    }

    dbDebug("App instantiated");
  } else {
    dbDebug("App already instantiated");
  }
}
createStartupFolders();

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

async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.accessAsync(uploadsFolder);
    return true;
  } catch (ex) {
    try {
      await fs.mkdirAsync(uploadsFolder);
      return true;
    } catch (ex) {
      fsDebug("Cannot create folder", ex);
      return false;
    }
  }
}

router.post("/", async (req, res) => {
  const folderExists = await checkCreateUploadsFolder(uploadsFolder);

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
