var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    note: String
});

module.exports = mongoose.model('Note', noteSchema);