import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routers/UserRouter";
import { userAgentParser } from "./middlewares/ua-parser";
import bodyParser from "body-parser";

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const expirationTime = `${
  Number(process.env.EXPIRATION_TIME_IN_MS) || 30000
}ms`;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => console.error(err));

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("main data screen");
});

app.get("*", (req, res) => {
  res.send("Error 404 Page not found");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
