const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
const noteController = require('./note.controller');

mongoose.connect('mongodb://alex:password1@ds125821.mlab.com:25821/alexdb');
//mongoose.connect('mongodb://localhost:27017/local');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to mongodb");  
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/note', noteController.createNote);

app.get('/note/:_id', noteController.getNote);

app.get('/titles/:user', noteController.getTitles);

app.delete('/note/:_id', noteController.deleteNote);

app.put('/note', noteController.updateNote);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));