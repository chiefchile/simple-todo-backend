const Note = require('./note');

exports.createNote = (req, res) => {
    console.log(req.body);
    let note = new Note({ note: req.body.note });
    note.save((err, note) => {
        res.send(exports.handleSave(err, note));
    });
}

exports.handleSave = (err, note) => {
    if (!err) {
        return { code: 0, msg: "Success", noteId: note._id };
    } else {
        console.error(err);
        return { code: -1, msg: "Error saving" };
    }
}

exports.getNote = (req, res) => {
	console.log(req.params);
    Note.findById(req.params.noteId, (err, note) => {
        res.send(exports.handleFind(err, note));
    });
}

exports.handleFind = (err, note) => {
	if (err) {
		console.error(err);
		return { code: -2, msg: "Error querying" };
	}
	
	return {code: 0, msg: "Success", note: note};
}

exports.updateNote = (req, res) => {
	console.log(req.body);
    Note.updateOne({ _id: req.body._id }, {note: req.body.note}, null, (err, writeOpResult) => {
        res.send(exports.handleUpate(err, writeOpResult));
    });
}

exports.handleUpate = (err, writeOpResult) => {
	if (err) {
		console.error(err);
		return { code: -3, msg: "Error updating" };
	}
	
	if (writeOpResult.nModified === 0) {
		return {code: -10, msg: "No record updated"};
	}
	
	return {code: 0, msg: "Success"};
}

exports.deleteNote = (req, res) => {
	console.log(req.params);
    Note.deleteOne({_id: req.params.noteId}, (err, deleteResult) => {
        res.send(exports.handleDelete(err, deleteResult));
    });
}

exports.handleDelete = (err, deleteResult) => {
	if (err) {
		console.error(err);
		return { code: -4, msg: "Error deleting" };
	}
	
	if (deleteResult.n === 0) {
		return {code: -11, msg: "No record deleted"};
	}
	
	return {code: 0, msg: "Success"};
}
