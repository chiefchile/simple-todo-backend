const express = require('express')
const app = express()
const port = process.env.PORT || 3002;
const cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
const noteController = require('./note.controller.js')

// mongoose.connect('mongodb://alex:uxf5tudg@ds125821.mlab.com:25821/alexdb');
mongoose.connect('mongodb://localhost:27017/local');
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));