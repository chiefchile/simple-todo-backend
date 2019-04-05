import { logger } from "../logger";
import Result, * as ResultConst from "../interfaces/result";
import { Response, Request } from "express";
import { INote, Note } from "../models/note";
import CreateNoteResult from "../interfaces/create-note-result";
import GetNoteResult from "../interfaces/get-note-result";
import express from "express";
var router = express.Router();

export const handleSave = (err: any, note: INote | null): CreateNoteResult => {
  if (!err && note) {
    const success = { code: 0, msg: "Note created", _id: note._id };
    return success;
  } else {
    logger.error(err);
    return ResultConst.SAVE_ERR;
  }
};

router.post(
  "/",
  (req: Request, res: Response): void => {
    logger.info("Creating note", req.body);
    let note = new Note({
      note: req.body.note,
      title: req.body.title,
      user: req.body.user
    });
    note.save(
      (err: Error, note: INote): void => {
        res.send(handleSave(err, note));
      }
    );
  }
);

export const handleFind = (
  err: Error | null,
  note: INote | null
): GetNoteResult => {
  if (err) {
    logger.error(err);
    return ResultConst.FIND_NOTE_ERR;
  }

  const success = { ...ResultConst.SUCCESS, note };
  return success;
};

router.get(
  "/:_id",
  (req: Request, res: Response): void => {
    logger.info("Getting note", req.params);
    Note.findById(
      req.params._id,
      (err: Error, note: INote): void => {
        res.send(handleFind(err, note));
      }
    );
  }
);

export const handleUpate = (err: Error | null, writeOpResult: any): Result => {
  if (err) {
    logger.error(err);
    return ResultConst.UPDATE_NOTE_ERR;
  }

  if (writeOpResult.nModified === 0) {
    return ResultConst.NO_NOTE_UPDATED_ERR;
  }

  return { code: 0, msg: "Note updated" };
};

router.put(
  "/",
  (req: Request, res: Response): void => {
    logger.info("Updating note", req.body);
    Note.updateOne(
      { _id: req.body._id },
      { note: req.body.note, title: req.body.title },
      {},
      (err: Error, writeOpResult: any): void => {
        res.send(handleUpate(err, writeOpResult));
      }
    );
  }
);

export const handleDelete = (err: Error | null, deleteResult: any): Result => {
  if (err) {
    logger.error(err);
    return ResultConst.DELETE_NOTE_ERR;
  }

  if (deleteResult.n === 0) {
    return ResultConst.NO_NOTE_DELETED_ERR;
  }

  return ResultConst.SUCCESS;
};

router.delete(
  "/:_id",
  (req: Request, res: Response): void => {
    logger.info("Deleting note", req.params);

    Note.deleteOne(
      { _id: req.params._id },
      // @ts-ignore
      (err: Error, deleteResult: any): void => {
        res.send(handleDelete(err, deleteResult));
      }
    );
  }
);

export default router;
