const Note = require('./note');
const logger = require('./logger');
const result = require('./result');
import { Response, Request } from "express";
import { INote } from './note';

export const createNote = (req: Request, res: Response) => {
	logger.info('Creating note', req.body);
	let note = new Note({ note: req.body.note, title: req.body.title, user: req.body.user });
	note.save((err: Error, note: INote) => {
		res.send(exports.handleSave(err, note));
	});
}

export const handleSave = (err: Error | null, note: INote | null) => {
	if (!err && note) {
		const success = { code: 0, msg: 'Note created', _id: note._id };
		return success;
	} else {
		logger.error(err);
		return result.SAVE_ERR;
	}
}

export const getNote = (req: Request, res: Response) => {
	logger.info('Getting note', req.params);
	Note.findById(req.params._id, (err: Error, note: INote) => {
		res.send(exports.handleFind(err, note));
	});
}

export const handleFind = (err: Error | null, note: INote | null) => {
	if (err) {
		logger.error(err);
		return result.FIND_NOTE_ERR;
	}

	const success = { ...result.SUCCESS, note };
	return success;
}

export const updateNote = (req: Request, res: Response) => {
	logger.info('Updating note', req.body);
	Note.updateOne({ _id: req.body._id }, { note: req.body.note, title: req.body.title }, null, (err: Error, writeOpResult: any) => {
		res.send(exports.handleUpate(err, writeOpResult));
	});
}

export const handleUpate = (err: Error | null, writeOpResult: any) => {
	if (err) {
		logger.error(err);
		return result.UPDATE_NOTE_ERR;
	}

	if (writeOpResult.nModified === 0) {
		return result.NO_NOTE_UPDATED_ERR;
	}

	return { code: 0, msg: 'Note updated' };
}

export const deleteNote = (req: Request, res: Response) => {
	logger.info('Deleting note', req.params);
	Note.deleteOne({ _id: req.params._id }, (err: Error, deleteResult: any) => {
		res.send(exports.handleDelete(err, deleteResult));
	});
}

export const handleDelete = (err: Error | null, deleteResult: any) => {
	if (err) {
		logger.error(err);
		return result.DELETE_NOTE_ERR;
	}

	if (deleteResult.n === 0) {
		return result.NO_NOTE_DELETED_ERR;
	}

	return result.SUCCESS;
}

export const getTitles = (req: Request, res: Response) => {
	logger.info('Getting titles', req.params);
	Note.find({ user: req.params.user }, (err: Error, notes: INote[]) => {
		res.send(exports.handleFindTitles(err, notes));
	});
}

export const handleFindTitles = (err: Error | null, notes: INote[]) => {
	if (err) {
		logger.error(err);
		return result.FIND_TITLES_ERR;
	}

	const titles = notes.map((note) => { return { title: note.title, _id: note._id } });
	const success = { ...result.SUCCESS, titles };
	//console.log(success);
	return success;
}
