const Note = require('./note');
const logger = require('./logger');

exports.createNote = (req, res) => {
    logger.info('Creating note', req.body);
    let note = new Note({ note: req.body.note, title: req.body.title, user: req.body.user });
    note.save((err, note) => {
        res.send(exports.handleSave(err, note));
    });
}

exports.handleSave = (err, note) => {
    if (!err) {
        return { code: 0, msg: "Success", noteId: note._id };
    } else {
        logger.error(err);
        return { code: -1, msg: "Error saving" };
    }
}

exports.getNote = (req, res) => {
	logger.info('Getting note', req.params);
    Note.findById(req.params.noteId, (err, note) => {
        res.send(exports.handleFind(err, note));
    });
}

exports.handleFind = (err, note) => {
	if (err) {
		logger.error(err);
		return { code: -2, msg: "Error querying" };
	}
	
	return {code: 0, msg: "Success", note: note};
}

exports.updateNote = (req, res) => {
	logger.info('Updating note', req.body);
    Note.updateOne({ _id: req.body._id }, {note: req.body.note, title: req.body.title}, null, (err, writeOpResult) => {
        res.send(exports.handleUpate(err, writeOpResult));
    });
}

exports.handleUpate = (err, writeOpResult) => {
	if (err) {
		logger.error(err);
		return { code: -3, msg: "Error updating" };
	}
	
	if (writeOpResult.nModified === 0) {
		return {code: -10, msg: "No record updated"};
	}
	
	return {code: 0, msg: "Success"};
}

exports.deleteNote = (req, res) => {
	logger.info('Deleting note', req.params);
    Note.deleteOne({_id: req.params.noteId}, (err, deleteResult) => {
        res.send(exports.handleDelete(err, deleteResult));
    });
}

exports.handleDelete = (err, deleteResult) => {
	if (err) {
		logger.error(err);
		return { code: -4, msg: "Error deleting" };
	}
	
	if (deleteResult.n === 0) {
		return {code: -11, msg: "No record deleted"};
	}
	
	return {code: 0, msg: "Success"};
}

exports.getTitles = (req, res) => {
	logger.info('Getting titles', req.params);
    Note.find({user: req.params.user}, (err, notes) => {
        res.send(exports.handleFindTitles(err, notes));
    });
}

exports.handleFindTitles = (err, notes) => {
	if (err) {
		logger.error(err);
		return { code: -5, msg: "Error querying titles" };
	}
	
	const titles = notes.map((note) => note.title);
	return {code: 0, msg: "Success", titles: titles};
}
