import express from "express";
import notes from "./note.controller";
import titles from "./title.controller";
import login from "./login.controller";

const router = express.Router();
router.use("/note", notes);
router.use("/titles", titles);
router.use("/api-token-auth", login);

export default router;
