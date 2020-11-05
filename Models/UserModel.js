const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = UserModel;
