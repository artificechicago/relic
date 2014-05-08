var express = require('express');
var app = express();

var connect = require('connect');
var nodemailer = require('nodemailer');

// Set up app
app.use(express.static(__dirname + '/website'));

app.post('/sign-up.html', connect.bodyParser(), function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var tel = req.body.tel;
    var type = req.body.type;
    var comment = req.body.comment;
    console.log(req.body); //Debugging command

    var mail = nodemailer.createTransport();
    mailOptions = {
	from: "Artifice Sign-Up Notice <no-reply@artificechicago.org>",
	to: ["James Crooks <crooks1379@gmail.com>", "Ashley Lane <alane0101@gmail.com>", "Artifice NFP <artificechicago@gmail.com>"],
	subject: "[ARTIFICE SIGN-UP] [" + type + "] " + name + " has signed up",
	text: "There has been a new sign-up with the following \n" + "Name: " +
	    name + "\n" + "Email: " + email + "\n" + "Tel: " + tel
	    + "\n" + "Type: " + type + "\n" + "Comments: " + comment
    };

    mail.sendMail(mailOptions, function (error, response) {
	if (error) {
	    console.log(error);
	} else {
	    console.log("Message send: " + response.message);
	}
//	smtpTransport.close();
    });

    res.redirect('/');
});

app.listen(80);
