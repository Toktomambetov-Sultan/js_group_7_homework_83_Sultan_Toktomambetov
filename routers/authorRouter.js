const express = require("express");
const router = express.Router();
const schema = require("./../Models");

router.get("/", async (req, res) => {
  res.send(await schema.Author.find());
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const author = new schema.Author(req.body);
  try {
    await author.save();
  } catch (error) {
    res.send(error);
  }
  res.send(author);
});

router.delete("/", async (req, res) => {
  res.send(await schema.Author.deleteMany());
});

module.exports = router;
