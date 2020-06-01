const Joi = require("@hapi/joi");
const { folderSchema } = require("./folder");
const fileBasePath = "../../public/uploads";
const mongoose = require("mongoose");

const fileSchema = mongoose.model(
  "File",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    metaTags: {
      type: [String],
      min: 3,
      max: 255,
    },
    size: {
      type: Number,
      required: true,
    },
    dateAdded: {
      type: Date,
      required: true,
      default: Date.now,
    },
    inFolders: [folderSchema],
  })
);

function validateFile(file) {
  const schema = Joi.object({
    // name: Joi.string().min(5).max(255).required(),
    // path: Joi.string().required(),
    // metaTags: Joi.array().items(Joi.string()),
    // size: Joi.number().min(0).required(),
    // dateAdded: Joi.number().min(0).required(),
    // inFolders: Joi.array().items(
    //   Joi.object().keys({
    //     _id: Joi.string().required(),
    //   })
    // ),
  });

  return schema.validate(file);
}

exports.File = fileSchema;
exports.fileBasePath = fileBasePath;
exports.validate = validateFile;
