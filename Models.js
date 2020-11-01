const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  information: String,
  Photo: String,
});

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
  date: {
    type: Date,
    // default: Date.now,
  },
});
const TrackModel = new Schema({});

AlbumModel.plugin(mongooseIdValidator);

AuthorModel.pre("deleteMany", async () => {
  await mongoose.model("Album").deleteMany();
});
AlbumModel.pre("deleteMany", async () => {
  await mongoose.model("Track").deleteMany();
});

const Album = mongoose.model("Album", AlbumModel);
const Track = mongoose.model("Track", TrackModel);
const Author = mongoose.model("Author", AuthorModel);

module.exports = {
  Author,
  Album,
  Track,
};
