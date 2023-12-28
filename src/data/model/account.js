const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  msv: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);
