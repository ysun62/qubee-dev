const mongoose = require("mongoose");
const folderBasePath = "../../public/uploads";

const folderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  folderName: {
    type: String,
    required: true,
  },
  folderPath: {
    type: String,
    required: true,
  },
  folderRelativePath: {
    type: String,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Folders", folderSchema);
module.exports.folderBasePath = folderBasePath;
