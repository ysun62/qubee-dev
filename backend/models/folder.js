const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const folderBasePath = "../../public/uploads";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  folder: this,
  rootDir: Boolean,
  accessLevel: {
    type: String,
    required: true,
    default: "standard",
  },
});

const Folder = mongoose.model("Folder", folderSchema);

function validateFolder(folder) {
  const schema = Joi.object({
    _id: Joi.ObjectId().required(),
    name: Joi.string().min(1).max(50).required(),
    slug: Joi.string().min(1).max(50).required(),
    folderId: Joi.ObjectId().required(),
    rootDir: Joi.boolean(),
    accessLevel: Joi.string().required(),
  });

  return schema.validate(folder);
}

exports.Folder = Folder;
exports.folderSchema = folderSchema;
exports.folderBasePath = folderBasePath;
exports.validate = validateFolder;
