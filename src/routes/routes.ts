import express from "express";
import { authenticateToken } from "../middleware/auth";
import notes from "./note.controller";
import titles from "./title.controller";
import login from "./login.controller";

var router = express.Router();
router.use("/note", authenticateToken, notes);
router.use("/titles", authenticateToken, titles);
router.use("/api-token-auth", login);

export default router;
