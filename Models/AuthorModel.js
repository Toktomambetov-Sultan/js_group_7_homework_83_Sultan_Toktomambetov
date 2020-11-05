const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  information: String,
  Photo: { type: String },
});

AuthorModel.pre("deleteMany", async () => {
  await mongoose.model("Album").deleteMany();
});

module.exports = AuthorModel;
