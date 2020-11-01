const express = require("express");
const { nanoid } = require("nanoid");
const multer = require("multer");
const config = require("../config");
const schema = require("./../Models");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ImageUploadingDir);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    callback(null, true);
  },
});

router.get("/", async (req, res) => {
  let albums;
  console.log(req.query);
  try {
    albums = await schema.Album.find(req.query).populate("author");
  } catch (error) {
    fetch(error);
  }
  res.send(albums);
});

router.post("/", upload.single("image"), async (req, res) => {
  const album = new schema.Album(req.body);
  album.image = req.file && req.file.filename;
  try {
    await album.save();
  } catch (error) {
    res.send(error);
  }
  res.send(album);
});

router.delete("/", async (req, res) => {
  let ans;
  try {
    data = await schema.Album.find();
    ans = await schema.Album.deleteMany();
    for (item of data) {
      item.image && (await fs.unlink(config.ImageUploadingDir + "/" + item.image));
    }
  } catch (error) {
    console.log(error);
  }
  res.send(ans);
});

module.exports = router;
