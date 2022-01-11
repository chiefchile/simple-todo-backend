import { logger } from "../logger";
import { Response, Request } from "express";
import { INote, Note } from "../models/note";
import GetTitlesResult from "../interfaces/get-titles-result";
import express from "express";
import * as ResultConst from "../interfaces/result";
var router = express.Router();

export const handleFindTitles = (
  err: Error | null,
  notes: INote[]
): GetTitlesResult => {
  if (err) {
    logger.error(err);
    return ResultConst.FIND_TITLES_ERR;
  }

  const titles = notes.map((note): any => {
    return { title: note.title, _id: note._id };
  });
  const success = { ...ResultConst.SUCCESS, titles };
  //console.log(success);
  return success;
};

router.get("/", (req: Request, res: Response): void => {
  logger.info("Getting titles", req.body.username);
  Note.find(
    { username: req.body.username },
    { title: 1 },
    { sort: "title" },
    (err, notes): void => {
      res.send(handleFindTitles(err, notes));
    }
  );
});

export default router;
