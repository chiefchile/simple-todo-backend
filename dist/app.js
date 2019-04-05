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
const routes_1 = __importDefault(require("./routes/routes"));
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
app.use("/", routes_1.default);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=app.js.map