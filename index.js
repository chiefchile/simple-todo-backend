const express = require('express')
const app = express()
const port = process.env.PORT || 3002;
const cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

// mongoose.connect('mongodb://alex:uxf5tudg@ds125821.mlab.com:25821/alexdb');
mongoose.connect('mongodb://localhost:27017/local');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to mongodb");
});

var noteSchema = new mongoose.Schema({
  note: String
});
var Note = mongoose.model('Note', noteSchema);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/note', (req, res) => {
  console.log(req.body);
  let note = new Note({note: req.body.note});
  note.save((err, note) => {
    if (!err) {
      res.send({code: 0, msg: "Success"});
    } else {
      console.error(err);
      res.send({code: -1, msg: "Error saving"})
    } 
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));