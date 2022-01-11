import express from "express";
const app = express();
const port = process.env.PORT || 3002;
import cors from "cors";
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import routes from "./routes/routes";
import { authenticateToken } from "./middleware/auth";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/simple-todo-backend";
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (): void {
  console.log("connected to mongodb");
});

const corsOptions = {
  origin: [
    "http://localhost",
    "http://localhost:3000",
    "https://alex-simple-todo.herokuapp.com/",
  ],
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authenticateToken);

app.use("/", routes);

app.listen(port, (): void =>
  console.log(`Example app listening on port ${port}!`)
);
