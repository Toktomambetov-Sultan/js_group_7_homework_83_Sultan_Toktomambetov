const express = require("express");
const router = express.Router();
const schema = require("./../Models");

router.get(
  "/",
  async (req, res, next) => {
    if (!(req.query && req.query.author)) next();
    let tracks;
    try {
      tracks = (
        await Promise.all(
          (
            await schema.Album.find({
              author: req.query.author,
            })
          ).map((item) => schema.Track.find({ album: item._id }))
        )
      ).reduce((acc, item) => [...acc, ...item], []);
    } catch (error) {
      res.status(400).send(error);
    }
    res.send(tracks);
  },
  async (req, res) => {
    let tracks;
    try {
      tracks = await schema.Track.find(req.query).populate({
        path: "album",
        populate: "author",
      });
    } catch (error) {
      res.status(400).send(error);
    }
    res.send(tracks);
  }
);

router.post("/", async (req, res) => {
  const track = schema.Track(req.body);
  try {
    track.save();
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(track);
});

// # if you need to use delete method for all tracks, look at down

// router.delete("/", async (req, res) => {
//   res.send(await schema.Track.deleteMany());
// });

module.exports = router;
