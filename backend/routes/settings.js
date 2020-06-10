const { Setting, validateSetting } = require("../models/setting");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const setting = await Setting.findById().select("-__v");
  res.send(setting);
});

router.post("/", async (req, res) => {
  const { error } = validateSetting(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const setting = new Setting({
    appInit: req.body.appInit,
  });
  res.send(setting);
});

module.exports = router;
