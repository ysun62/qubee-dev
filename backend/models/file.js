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
    fileExtension: {
      type: String,
      required: true,
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
    modifiedDate: Date,
    size: {
      type: Number,
      required: true,
    },
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
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasComments: {
      type: Boolean,
      required: true,
      default: false,
    },
    isScheduled: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    fileType: {
      type: String,
      required: true,
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
