const express = require("express");
const config = require("./config");
const authorRouter = require("./routers/authorRouter");
const mongoose = require("mongoose");
const albumRouter = require("./routers/albumRouter");
const app = express();

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/music", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
    return;
  }
  console.log("Connected to mongodb.");
  
  app.use(express.json());
  app.use("/author", authorRouter);
  app.use("/album", albumRouter);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port.`);
  });
};
run();
