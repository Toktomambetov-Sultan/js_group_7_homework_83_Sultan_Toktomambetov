const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseIdValidator = require("mongoose-id-validator");
const AlbumModel = require("./Models/AlbumModel");
const AuthorModel = require("./Models/AuthorModel");
const TrackModel = require("./Models/TrackModel");




const Album = mongoose.model("Album", AlbumModel);
const Track = mongoose.model("Track", TrackModel);
const Author = mongoose.model("Author", AuthorModel);

module.exports = {
  Author,
  Album,
  Track,
};
