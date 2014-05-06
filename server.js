var express = require('express');
var app = express();

var connect = require('connect');
var nodemailer = require('nodemailer');

var auth = {user:null, pass:null};  //these need to be set in production

// Set up simple mailer
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: auth
});

// Set up app
app.use(express.static(__dirname + '/website'));

app.post('/sign-up.html', connect.bodyParser(), function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var tel = req.body.tel;

    console.log(req.body); //Debugging command

    mailOptions = {
	from: "Artifice Sign-Up Notice <crooks1379@gmail.com>",
	to: ["James Crooks <crooks1379@gmail.com>", "Ashley Lane <alane0101@gmail.com>"],
	subject: "[ARTIFICE SIGN-UP] Test Notice",
	text: "There has been a new sign-up with the following \n" + "Name: " +
	    name + "\n" + "Email: " + email + "\n" + "Tel: " + tel
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
	if (error) {
	    console.log(error);
	} else {
	    console.log("Message send: " + response.message);
	}
    });
    res.redirect('/');
});

app.listen(8080);
