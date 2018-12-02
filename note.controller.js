const Note = require('./note');
const logger = require('./logger');
const result = require('./result');

exports.createNote = (req, res) => {
    logger.info('Creating note', req.body);
    let note = new Note({ note: req.body.note, title: req.body.title, user: req.body.user });
    note.save((err, note) => {
        res.send(exports.handleSave(err, note));
    });
}

exports.handleSave = (err, note) => {
    if (!err) {
		const success = {...result.SUCCESS, _id: note._id};
        return success;
    } else {
        logger.error(err);
        return result.SAVE_ERR;
    }
}

exports.getNote = (req, res) => {
	logger.info('Getting note', req.params);
    Note.findById(req.params._id, (err, note) => {
        res.send(exports.handleFind(err, note));
    });
}

exports.handleFind = (err, note) => {
	if (err) {
		logger.error(err);
		return result.FIND_NOTE_ERR;
	}
	
	const success = {...result.SUCCESS, note};
	return success;
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
		return result.UPDATE_NOTE_ERR;
	}
	
	if (writeOpResult.nModified === 0) {
		return result.NO_NOTE_UPDATED_ERR;
	}
	
	return result.SUCCESS;
}

exports.deleteNote = (req, res) => {
	logger.info('Deleting note', req.params);
    Note.deleteOne({_id: req.params._id}, (err, deleteResult) => {
        res.send(exports.handleDelete(err, deleteResult));
    });
}

exports.handleDelete = (err, deleteResult) => {
	if (err) {
		logger.error(err);
		return result.DELETE_NOTE_ERR;
	}
	
	if (deleteResult.n === 0) {
		return result.NO_NOTE_DELETED_ERR;
	}
	
	return result.SUCCESS;
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
		return result.FIND_TITLES_ERR;
	}
	
	const titles = notes.map((note) => { return {title: note.title, _id: note._id}});
	const success = {...result.SUCCESS, titles};
	//console.log(success);
	return success;
}
