const express = require("express");
const router = express.Router();
const schema = require("./../Models");

router.get("/", async (req, res) => {
  let tracks;
  try {
    tracks =
      req.query && req.query.author
        ? (
            await Promise.all(
              (
                await schema.Album.find({
                  author: req.query.author,
                })
              ).map((item) => schema.Track.find({ album: item._id }))
            )
          ).reduce((item, acc) => [...acc, ...item], [])
        : await schema.Track.find(req.query).populate({
            path: "album",
            populate: "author",
          });
  } catch (error) {
    res.send(error);
  }
  res.send(tracks);
});

router.post("/", async (req, res) => {
  const track = schema.Track(req.body);
  try {
    track.save();
  } catch (error) {
    res.send(error);
  }
  res.send(track);
});

router.delete("/", async (req, res) => {
  res.send(await schema.Track.deleteMany());
});

module.exports = router;
