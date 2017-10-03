var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require('mongoose');

var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");

  
  mongoose.connect('mongodb://localhost/billing_db',{
    useMongoClient: true,
    /* other options */
  });

  // Create Operation
  var Party = require('./app/models/party');
  
  var newParty = Party({
    orderNoOfBundle: '30',
    partyId: 'Party123',
    orderId: 'ABC1234'
  });
  
  newParty.save(function(err) {
    if (err) throw err;
    console.log('Party created!');
  });
  

  // Read all parties
  Party.find({}, function(err, Parties) {
    if (err) throw err;
    console.log(Parties);
  });

  //find and remove
  // find the Party with id 4
Party.findOneAndRemove({ partyId: 'Party123' }, function(err) {
  if (err) throw err;

  // we have deleted the Party
  console.log('Party deleted!');
});

var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./contact.html', 'utf8');
var options = { format: 'Letter' };

pdf.create(html, options).toFile('./contact.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res);
});

});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
