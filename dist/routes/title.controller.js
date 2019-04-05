"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const note_1 = require("../models/note");
const express_1 = __importDefault(require("express"));
const ResultConst = __importStar(require("../interfaces/result"));
var router = express_1.default.Router();
exports.handleFindTitles = (err, notes) => {
    if (err) {
        logger_1.logger.error(err);
        return ResultConst.FIND_TITLES_ERR;
    }
    const titles = notes.map((note) => {
        return { title: note.title, _id: note._id };
    });
    const success = Object.assign({}, ResultConst.SUCCESS, { titles });
    //console.log(success);
    return success;
};
router.get("/:user", (req, res) => {
    logger_1.logger.info("Getting titles", req.params);
    note_1.Note.find({ user: req.params.user }, null, { sort: "title" }, (err, notes) => {
        res.send(exports.handleFindTitles(err, notes));
    });
});
exports.default = router;
//# sourceMappingURL=title.controller.js.map