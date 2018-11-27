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
        return { code: 0, msg: "Success" };
    } else {
        console.error(err);
        return { code: -1, msg: "Error saving" };
    }
}