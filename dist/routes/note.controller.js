"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const ResultConst = __importStar(require("../interfaces/result"));
const note_1 = require("../models/note");
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.handleSave = (err, note) => {
    if (!err && note) {
        const success = { code: 0, msg: "Note created", _id: note._id };
        return success;
    }
    else {
        logger_1.logger.error(err);
        return ResultConst.SAVE_ERR;
    }
};
router.post("/", (req, res) => {
    logger_1.logger.info("Creating note", req.body);
    let note = new note_1.Note({
        note: req.body.note,
        title: req.body.title,
        user: req.body.user
    });
    note.save((err, note) => {
        res.send(exports.handleSave(err, note));
    });
});
exports.handleFind = (err, note) => {
    if (err) {
        logger_1.logger.error(err);
        return ResultConst.FIND_NOTE_ERR;
    }
    const success = Object.assign({}, ResultConst.SUCCESS, { note });
    return success;
};
router.get("/:_id", (req, res) => {
    logger_1.logger.info("Getting note", req.params);
    note_1.Note.findById(req.params._id, (err, note) => {
        res.send(exports.handleFind(err, note));
    });
});
exports.handleUpate = (err, writeOpResult) => {
    if (err) {
        logger_1.logger.error(err);
        return ResultConst.UPDATE_NOTE_ERR;
    }
    if (writeOpResult.nModified === 0) {
        return ResultConst.NO_NOTE_UPDATED_ERR;
    }
    return { code: 0, msg: "Note updated" };
};
router.put("/", (req, res) => {
    logger_1.logger.info("Updating note", req.body);
    note_1.Note.updateOne({ _id: req.body._id }, { note: req.body.note, title: req.body.title }, {}, (err, writeOpResult) => {
        res.send(exports.handleUpate(err, writeOpResult));
    });
});
exports.handleDelete = (err, deleteResult) => {
    if (err) {
        logger_1.logger.error(err);
        return ResultConst.DELETE_NOTE_ERR;
    }
    if (deleteResult.n === 0) {
        return ResultConst.NO_NOTE_DELETED_ERR;
    }
    return ResultConst.SUCCESS;
};
router.delete("/:_id", (req, res) => {
    logger_1.logger.info("Deleting note", req.params);
    note_1.Note.deleteOne({ _id: req.params._id }, 
    // @ts-ignore
    (err, deleteResult) => {
        res.send(exports.handleDelete(err, deleteResult));
    });
});
exports.default = router;
//# sourceMappingURL=note.controller.js.map