console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const db_url = 'mongodb://ds121332.mlab.com:21332/scrum_pointing_poker_db'

const mongoose = require('mongoose');

mongoose.connect(db_url, {
  auth: {
    user:'mongo_clifford',
    password:'!6%JHVB7h4mC'
  },
  useNewUrlParser:true
}, function(err, client) {
  if (err) {
    console.log(err);
  }
  console.log('connect!!!');
});

var QuoteSchema = new mongoose.Schema({ name: 'string', quote: 'string' });
var QuoteModel = mongoose.model('quotes', QuoteSchema);

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(3000, function() {
  console.log('listening on 3000')
})
app.get('/', (req, res) => {
  var query = QuoteModel.find({});
    query.exec(function (err, docs) {
    console.log(docs);
    res.render('index.ejs', {quotes: docs})
  });

})
app.post('/quotes', (req, res) => {
  var quote = new QuoteModel(req.body);
  quote.save().then(() => console.log('Saved!'));
  res.redirect('/')

})
app.put('/quotes', (req, res) => {
 var query = { _id: req.body.id };
 var request = {name: req.body.name, quote: req.body.quote }
 console.log(query)
 console.log(request)
 QuoteModel.findOneAndUpdate(
  query, 
  request,
  {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) console.log(err)
  })
 res.redirect('/')
})

app.delete('/quotes', (req, res) => {
 var query = { _id: req.body.id };
 QuoteModel.findOneAndDelete(
  query,
  (err, result) => {
    if (err) console.log(err)
  })
 res.redirect('/')
})

