const mongoose = require("mongoose");
const fileBasePath = "../../public/uploads";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileMetaTags: [String],
  fileSize: {
    type: Number,
    required: true,
  },
  fileThumb: {
    type: Buffer,
  },
  fileThumbType: String,
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
module.exports.fileBasePath = fileBasePath;
