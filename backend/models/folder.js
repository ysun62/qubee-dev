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
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  parents: [String],
  isRoot: {
    type: Boolean,
    required: true,
    default: false,
  },
  isShared: {
    type: Boolean,
    required: true,
    default: false,
  },
  kind: {
    type: String,
    required: true,
    default: "FOLDER",
  },
  accessRuleIds: {
    type: [Number],
    required: true,
    default: [1, 2, 3],
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
