"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var noteSchema = new mongoose_1.default.Schema({
    note: String,
    title: String,
    user: String
});
exports.Note = mongoose_1.default.model("Note", noteSchema);
//# sourceMappingURL=note.js.map