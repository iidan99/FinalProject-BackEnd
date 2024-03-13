import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

app.get("/posts", async function (req: express.Request, res: express.Response) {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    const responseData = response.data;
    res.status(200).json(responseData);
  } catch {
    res.status(500).send("Internal Error");
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
