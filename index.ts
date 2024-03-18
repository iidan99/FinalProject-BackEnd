import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routers/UserRouter";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { getCountries } from "./Controllers/Countries/CountriesController";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
export const expirationTime = `${
  Number(process.env.EXPIRATION_TIME_IN_MS) || 24
}h`;

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
app.use(express.static("./assets"));
app.use("/countries", express.static("./json"));

app.use("/user", userRouter);

app.get("/countries", getCountries);
app.post("/logout", (req: express.Request, res: express.Response) => {
  res.status(200).send("Logout Success");
});
app.get("/", (req, res) => {
  res.send("main data screen");
});

app.get("*", (req, res) => {
  res.send("Error 404 Page not found");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
