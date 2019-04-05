import express from "express";
var router = express.Router();

import notes from "./note.controller";
import titles from "./title.controller";
import login from "./login.controller";

router.use("/note", notes);
router.use("/titles", titles);
router.use("/login", login);

export default router;
