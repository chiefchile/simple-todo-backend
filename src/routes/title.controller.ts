import { logger } from "../logger";
import { Response, Request } from "express";
import { Note } from "../models/note";
import express from "express";

var router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  logger.info("Getting titles", req.body.username);
  try {
    const titles = await Note.find(
      { username: req.body.username },
      { title: 1 },
      { sort: "title" }
    ).exec();
    res.send(titles);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

export default router;
