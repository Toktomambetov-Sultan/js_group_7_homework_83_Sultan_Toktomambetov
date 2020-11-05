const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  image: { type: String, required: true },
  __date: {
    type: Date,
    default: Date.now,
  },
});

AlbumModel.plugin(mongooseIdValidator);

AlbumModel.pre("deleteMany", async () => {
  await mongoose.model("Track").deleteMany();
});

module.exports = AlbumModel;
