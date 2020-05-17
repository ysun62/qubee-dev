const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");

router.get("/", async (req, res) => {
  const tags = await Tag.find().select("-__v").sort("name");
  res.send(tags);
});

router.post("/", async (req, res) => {
  const tag = new Tag({
    tagName: req.body.mediaTags,
  });

  await tag
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Tag uploaded successfully",
        tag: {
          _id: result._id,
          tagName: result.tagName,
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
});

router.delete("/:id", async (req, res) => {
  const tag = await Tag.findByIdAndRemove(req.params.id);
  if (!tag)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(tag);
});

module.exports = router;
