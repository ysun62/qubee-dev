const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const settingSchema = mongoose.model(
  "Setting",
  new mongoose.Schema({
    appInit: {
      type: Boolean,
      required: true,
      default: false,
    },
    accessRuleIds: {
      type: [Number],
      required: true,
      default: [1],
    },
  })
);

// appInit: {
//       type: new mongoose.Schema({
//         name: {
//           type: String,
//           required: true,
//           default: "App Init",
//         },
//         isInstantiation: {
//           type: Boolean,
//           required: true,
//           default: false,
//         },
//       }),
//       required: true,
//     },

function validateSetting(setting) {
  const schema = Joi.object({
    appInit: Joi.boolean().required(),
  });

  return schema.validate(setting);
}

exports.Setting = settingSchema;
exports.validate = validateSetting;
