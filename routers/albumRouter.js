const express = require("express");
const schema = require("./../Models");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await schema.Album.find().populate("author"));
});

router.post("/", async (req, res) => {
  const albums = new schema.Album(req.body);
  try {
    await albums.save();
  } catch (error) {
    res.send(error);
  }
  res.send(albums);
});

router.delete("/", async (req, res) => {
  let ans;
  try {
    ans = await schema.Album.deleteMany();
  } catch (error) {
    console.log(error);
  }
  res.send(ans);
});

module.exports = router;
