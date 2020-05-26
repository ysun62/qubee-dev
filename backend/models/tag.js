const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tagName: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("tags", tagSchema);
