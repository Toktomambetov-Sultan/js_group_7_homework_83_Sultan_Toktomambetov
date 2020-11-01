const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  information: String,
  Photo: { type: String },
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
  image: { type: String, required: true },
  __date: {
    type: Date,
    default: Date.now,
  },
});
const TrackModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  lasting: {
    type: Date,
    required: true,
  },
});

AlbumModel.plugin(mongooseIdValidator);
TrackModel.plugin(mongooseIdValidator);



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
