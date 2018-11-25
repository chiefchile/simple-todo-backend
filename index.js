const express = require('express')
const app = express()
const port = process.env.PORT || 3002;
//const port = 3002;
const cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://alex:uxf5tudg@ds125821.mlab.com:25821/alexdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected to mlab");
});

var kittySchema = new mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
/*var fluffy = new Kitten({ name: 'fluffy' });
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    //fluffy.speak();
  });*/



app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/kittens', (req, res) =>  {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    res.send(kittens);
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));