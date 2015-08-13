var config = require('./config');
var posts = require('./posts');
var users_mail = require('./users_mail');
var mandrill = require('mandrill');

function sendMandrill(mailOptions) {
	mandrill('/messages/send', {
		message: mailOptions
	}, function(error, response) {
		if (error) {
			console.error(JSON.stringify(error));
		} else {
			console.log(response);
		}
	});
};

var mail_head = '';
var mail_body = '';
var mail_foot = '';
var to = [];
users_mail.forEach(function(user) {
	to.push({
		email: user[1],
		name: user[0],
		type: "bcc"
	});
});
posts.forEach(function(post) {
	mail_body += '';
});
var options = {
	from_email: 'crossonmidnight@gmail.com', // sender address
	to: to, // list of receivers
	from_name: 'Dcard 找同學', // sender address
	subject: "Dcard 文章精選", // Subject line
	footer: true,
	html: mail_head + mail_body + mail_foot
}
console.log(options);
sendMandrill(options);