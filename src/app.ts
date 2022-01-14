import express, { Request, Response } from "express";
import cors from "cors";
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import routes from "./routes/routes";
import { authenticateToken } from "./middleware/auth";
import { logger } from "./logger";
import { GENERAL_ERR } from "./interfaces/result";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/simple-todo-backend";
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (): void {
  console.log("connected to mongodb");
});

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: [
    "http://localhost",
    "http://localhost:3000",
    "https://alex-simple-todo.herokuapp.com",
  ],
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authenticateToken);
app.use("/", routes);

// Error handler should be the last middleware
app.use(function (err: any, req: Request, res: Response, next: any) {
  logger.error(err);
  res.status(500).json(GENERAL_ERR);
});

app.listen(port, (): void =>
  console.log(`Example app listening on port ${port}!`)
);
