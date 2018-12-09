"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var noteSchema = new mongoose.Schema({
    note: String,
    title: String,
    user: String,
});
exports.Note = mongoose.model('Note', noteSchema);
//# sourceMappingURL=note.js.map