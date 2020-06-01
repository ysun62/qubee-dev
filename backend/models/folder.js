const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const folderBasePath = "../../public/uploads";

const folderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  path: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Folder = mongoose.model("Folder", folderSchema);

function validateFolder(folder) {
  const schema = Joi.object({
    _id: Joi.alphanum().required(),
    name: Joi.string().min(5).max(50).required(),
    path: Joi.string().required(),
    dateAdded: Joi.date().required(),
  });

  return schema.validate(folder);
}

exports.Folder = Folder;
exports.folderSchema = folderSchema;
exports.folderBasePath = folderBasePath;
exports.validate = validateFolder;
