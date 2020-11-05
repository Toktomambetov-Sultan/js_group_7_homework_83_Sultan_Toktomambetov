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

TrackModel.plugin(mongooseIdValidator);

module.exports = TrackModel;
