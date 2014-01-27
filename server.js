var express = require('express');
var app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/public_html'));

app.listen(8080);
