const mongoose = require("mongoose");
const { folderSchema } = require("./folder");
const fileBasePath = "../../public/uploads";

const fileSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    //ref: folderSchema,
    //required: true,
  },
});

module.exports = mongoose.model("Files", fileSchema);
module.exports.fileBasePath = fileBasePath;
