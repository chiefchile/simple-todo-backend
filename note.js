var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    note: String,
    title: String
});

module.exports = mongoose.model('Note', noteSchema);