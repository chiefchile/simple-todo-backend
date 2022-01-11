import { logger } from "../logger";
import { Response, Request } from "express";
import { Note } from "../models/note";
import express from "express";

var router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  logger.info("Creating note", req.body);
  let note = new Note({
    note: req.body.note,
    title: req.body.title,
    username: req.body.username,
  });
  try {
    const result = await note.save();
    res.send(result);
  } catch (error: any) {
    logger.error(error);
    res.sendStatus(500);
  }
});

router.get("/:_id", async (req: Request, res: Response): Promise<void> => {
  logger.info("Getting note", req.params);

  try {
    const result = await Note.findById(req.params._id).exec();
    res.send(result);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

router.put("/:_id", async (req: Request, res: Response): Promise<void> => {
  logger.info("Updating note", req.params);
  try {
    await Note.updateOne(
      { _id: req.params._id },
      { note: req.body.note, title: req.body.title }
    );
    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:_id", async (req: Request, res: Response): Promise<void> => {
  logger.info("Deleting note", req.params);
  try {
    await Note.deleteOne({ _id: req.params._id });
    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

router.get("/deleteTestData", (req: Request, res: Response): void => {
  logger.info("Deleting all notes by testuser");

  Note.deleteMany({ user: "testuser" }, (): void => {
    res.sendStatus(200);
  });
});

export default router;
