"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('./logger');
const ResultConst = __importStar(require("./result"));
const note_1 = require("./note");
exports.createNote = (req, res) => {
    logger.info('Creating note', req.body);
    let note = new note_1.Note({ note: req.body.note, title: req.body.title, user: req.body.user });
    note.save((err, note) => {
        res.send(exports.handleSave(err, note));
    });
};
exports.handleSave = (err, note) => {
    if (!err && note) {
        const success = { code: 0, msg: 'Note created', _id: note._id };
        return success;
    }
    else {
        logger.error(err);
        return ResultConst.SAVE_ERR;
    }
};
exports.getNote = (req, res) => {
    logger.info('Getting note', req.params);
    note_1.Note.findById(req.params._id, (err, note) => {
        res.send(exports.handleFind(err, note));
    });
};
exports.handleFind = (err, note) => {
    if (err) {
        logger.error(err);
        return ResultConst.FIND_NOTE_ERR;
    }
    const success = Object.assign({}, ResultConst.SUCCESS, { note });
    return success;
};
exports.updateNote = (req, res) => {
    logger.info('Updating note', req.body);
    note_1.Note.updateOne({ _id: req.body._id }, { note: req.body.note, title: req.body.title }, null, (err, writeOpResult) => {
        res.send(exports.handleUpate(err, writeOpResult));
    });
};
exports.handleUpate = (err, writeOpResult) => {
    if (err) {
        logger.error(err);
        return ResultConst.UPDATE_NOTE_ERR;
    }
    if (writeOpResult.nModified === 0) {
        return ResultConst.NO_NOTE_UPDATED_ERR;
    }
    return { code: 0, msg: 'Note updated' };
};
exports.deleteNote = (req, res) => {
    logger.info('Deleting note', req.params);
    note_1.Note.deleteOne({ _id: req.params._id }, (err, deleteResult) => {
        res.send(exports.handleDelete(err, deleteResult));
    });
};
exports.handleDelete = (err, deleteResult) => {
    if (err) {
        logger.error(err);
        return ResultConst.DELETE_NOTE_ERR;
    }
    if (deleteResult.n === 0) {
        return ResultConst.NO_NOTE_DELETED_ERR;
    }
    return ResultConst.SUCCESS;
};
exports.getTitles = (req, res) => {
    logger.info('Getting titles', req.params);
    note_1.Note.find({ user: req.params.user }, (err, notes) => {
        res.send(exports.handleFindTitles(err, notes));
    });
};
exports.handleFindTitles = (err, notes) => {
    if (err) {
        logger.error(err);
        return ResultConst.FIND_TITLES_ERR;
    }
    const titles = notes.map((note) => { return { title: note.title, _id: note._id }; });
    const success = Object.assign({}, ResultConst.SUCCESS, { titles });
    //console.log(success);
    return success;
};
//# sourceMappingURL=note.controller.js.map