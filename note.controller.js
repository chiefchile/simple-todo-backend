var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    note: String
});
var Note = mongoose.model('Note', noteSchema);

exports.createNote = (req, res) => {
    console.log(req.body);
    let note = new Note({ note: req.body.note });
    note.save((err, note) => {
        res.send(handleSave(err, note));
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