
// Set up database

var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
    console.log("DB Access bound");
    var artificerSchema = new mongoose.Schema({
	Name: String,
	cardID: Number
    });
    Artificer = mongoose.model('Artificer', artificerSchema);
});


mongoose.connect('mongodb://localhost/artificertest');

// Express 

// _ -> JSON object
function get_cardID (cardID) {
    var query = Artificer.findOne({'cardID' : cardID });
    return query.select('Name');
}

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var lastCard = sdlfj;
    res.send('what?');
});

app.use(function (req, res, next) {
    console.log(req.path);
    var cardID = req.path.substring(1);

    get_cardID(cardID).exec(function (err, data) {
	console.log(data);
	res.send(data.Name);
    });
});

app.listen(8001);
