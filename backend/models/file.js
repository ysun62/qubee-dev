const mongoose = require("mongoose");
const fileBasePath = "../../public/uploads";

const imageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileMetaTags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tags",
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileThumb: {
    type: Buffer,
  },
  fileThumbType: {
    type: String,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folders",
  },
});

module.exports = mongoose.model("images", imageSchema);
module.exports.fileBasePath = fileBasePath;
