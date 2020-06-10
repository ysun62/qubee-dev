const express = require("express");
const router = express.Router();
const { File } = require("../models/file");
const { Folder } = require("../models/folder");

router.delete("/:id", async (req, res) => {
  console.log(req);

  //const file = await File.findByIdAndRemove(req.params.id);
  //const file = await File.deleteOne({ params: req.params.id });

  // if (!file)
  //   return res.status(404).send("The movie with the given ID was not found.");

  // res.send(file);
});

module.exports = router;
