var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    note: String,
    title: String,
	user: String,
});

export const Note = mongoose.model('Note', noteSchema);

export interface INote {
	note: string,
    title: string,
	user: string,
	_id: string
}