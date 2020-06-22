const Joi = require("@hapi/joi");
const fileBasePath = "../../public/uploads";
const mongoose = require("mongoose");

const fileSchema = mongoose.model(
  "File",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      trim: true,
      lowercase: true,
    },
    metaTags: {
      type: [String],
      min: 3,
      max: 255,
      trim: true,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    size: {
      type: Number,
      required: true,
    },
    modifiedDate: Date,
    parentMap: mongoose.Mixed,
    parentDirectoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
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
    protectedFolder: {
      type: Boolean,
      required: true,
      default: false,
    },
    restricted: {
      type: Boolean,
      required: true,
      default: false,
    },
    kind: {
      type: String,
      required: true,
      default: "FILE",
    },
    accessRuleIds: {
      type: [Number],
      required: true,
      default: [1, 2, 3],
    },
  })
);

function validateFile(file) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    metaTags: Joi.array().items(Joi.string()),
  });

  return schema.validate(file);
}

exports.File = fileSchema;
exports.fileBasePath = fileBasePath;
exports.validate = validateFile;
