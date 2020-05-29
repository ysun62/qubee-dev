const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  fileMetaTags: [String],
  fileSize: Number,
  dateAdded: Date,
});

module.exports = mongoose.model("Search", searchSchema);
