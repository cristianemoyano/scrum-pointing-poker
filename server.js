console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const db_url = process.env.DB_URL
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const PORT = process.env.PORT || 5000


const mongoose = require('mongoose');

mongoose.connect(db_url, {
  auth: {
    user: db_user,
    password: db_pass
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

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

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

