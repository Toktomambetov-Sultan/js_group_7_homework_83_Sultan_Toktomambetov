const express = require("express");
const config = require("./config");
const app = express();
const resourcesRouter = require("./routers/resourcesRouter");
const mongoose = require("mongoose");

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
  app.use("/resources", resourcesRouter);
  app.use(express.json());
  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port.`);
  });
};
run();
