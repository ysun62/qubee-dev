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
    minlength: 1,
    maxlength: 50,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  inFolder: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      dateAdded: {
        type: Date,
        required: true,
        default: Date.now,
      },
    }),
  },
});

const Folder = mongoose.model("Folder", folderSchema);

function validateFolder(folder) {
  const schema = Joi.object({
    _id: Joi.ObjectId().required(),
    name: Joi.string().min(1).max(50).required(),
    inFolderId: Joi.ObjectId().required(),
  });

  return schema.validate(folder);
}

exports.Folder = Folder;
exports.folderSchema = folderSchema;
exports.folderBasePath = folderBasePath;
exports.validate = validateFolder;
