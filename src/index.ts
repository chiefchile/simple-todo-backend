import express from "express";
const app = express();
const port = process.env.PORT || 3002;
import cors from "cors";
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import noteController = require("./note.controller");
import loginController = require("./login.controller");

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

app.get("/", (req: any, res: any): void => res.send("Hello World!"));

app.post("/note", noteController.createNote);

app.get("/note/:_id", noteController.getNote);

app.get("/titles/:user", noteController.getTitles);

app.delete("/note/:_id", noteController.deleteNote);

app.delete("/note/deleteByUser/:user", noteController.deleteNoteByUser);

app.put("/note", noteController.updateNote);

app.post("/login", loginController.login);

app.listen(
  port,
  (): void => console.log(`Example app listening on port ${port}!`)
);
