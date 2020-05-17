const mongoose = require("mongoose");
const imageBasePath = "../../public/uploads";

const imageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  imageFilePath: {
    type: String,
    required: true,
  },
  imageTags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tags",
  },
  thumbImage: {
    type: Buffer,
  },
  thumbImageType: {
    type: String,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fileSize: {
    type: String,
    required: true,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folders",
  },
});

module.exports = mongoose.model("images", imageSchema);
module.exports.imageBasePath = imageBasePath;
