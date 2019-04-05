import express from "express";
const app = express();
const port = process.env.PORT || 3002;
import cors from "cors";
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import routes from "./routes/routes";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/local";
// mongoose.connect('mongodb://alex:password1@ds125821.mlab.com:25821/alexdb');
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(): void {
  console.log("connected to mongodb");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(
  port,
  (): void => console.log(`Example app listening on port ${port}!`)
);
