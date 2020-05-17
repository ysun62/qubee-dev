const mongoose = require("mongoose");
const folderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  folderAbsolutePath: {
    type: String,
    required: true,
  },
  folderRelativePath: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("folders", folderSchema);
