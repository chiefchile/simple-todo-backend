"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT || 3002;
const cors_1 = __importDefault(require("cors"));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const noteController = require("./note.controller");
const loginController = require("./login.controller");
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/local";
// mongoose.connect('mongodb://alex:password1@ds125821.mlab.com:25821/alexdb');
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected to mongodb");
});
app.use(cors_1.default());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/note", noteController.createNote);
app.get("/note/:_id", noteController.getNote);
app.get("/titles/:user", noteController.getTitles);
app.delete("/note/:_id", noteController.deleteNote);
app.delete("/note/deleteByUser/:user", noteController.deleteNoteByUser);
app.put("/note", noteController.updateNote);
app.post("/login", loginController.login);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map