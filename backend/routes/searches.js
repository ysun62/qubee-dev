const express = require("express");
const router = express.Router();
const File = require("../models/file");
const Folders = require("../models/folder");

router.get("/", async (req, res) => {
  let searchOptions = {};
  const term = req.query.searchTerm;

  if (term !== null && term !== "") {
    searchOptions.searchTerm = `.*${term}.*`;
  }

  try {
    const searches = await File.find()
      .or([
        { fileName: { $regex: searchOptions.searchTerm, $options: "i" } },
        { fileMetaTags: { $regex: searchOptions.searchTerm, $options: "i" } },
      ])
      .sort("fileName");
    res.send(searches);
  } catch (error) {
    res.send(error);
  }
});

// router.get("/", async (req, res) => {
//   console.log(req.body);
//   const searches = await File.find().sort("fileName");
//   res.send(searches);
// });

module.exports = router;
