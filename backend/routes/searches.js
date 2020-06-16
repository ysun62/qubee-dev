const express = require("express");
const router = express.Router();
const { File } = require("../models/file");
const { Folder } = require("../models/folder");

router.get("/", async (req, res) => {
  let searchOptions = {};
  const term = req.query.s;

  if (term !== null && term !== "") {
    searchOptions.searchTerm = `.*${term}.*`;
  }

  try {
    const results = await File.find()
      .or([
        { name: { $regex: searchOptions.searchTerm, $options: "i" } },
        {
          metaTags: { $regex: searchOptions.searchTerm, $options: "i" },
        },
      ])
      .sort("name");
    res.send(results);
    console.log(results);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
