var config = require('./config');
var posts = require('./posts');
var users_mail = require('./users_mail');
var mandrill = require('node-mandrill')(config.mandrill_key);

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

var mail_head = '<table bgcolor="#FAFAFA" border="0" cellspacing="0" cellpadding="0" style="width: 100%; padding-top: 30px; text-align:middle"><tbody><tr><td><center><img width="38" height="46" style="width:38px;height:46px" src="https://shouko.github.io/dcard-newsletter/img/logo.png"><br>';
mail_head += '<h2 style="color:#006AA6">狄卡精選</h2><h3>成為大學生的第一步</h3></center></td></tr>';
var mail_body = '';
var mail_foot = '<tr><td><center>\
	<h3>你的未來同學，都在這裏</h3>\
	<h3>下載 Dcard APP</h3>\
	<a target="_blank" href="https://play.google.com/store/apps/details?id=com.sparkslab.dcardreader&amp;hl=zh_TW">\
		<img alt="google play" style="width:144px;height:50px" width="144" height="50" src="https://www.dcard.tw/img/dcard_index_res/google_play.svg"></a>\
	<a target="_blank" href="https://itunes.apple.com/us/app/dcard/id951353454?mt=8">\
		<img alt="appstore" style="width:144px;height:50px" width="144" height="50" src="https://www.dcard.tw/img/dcard_index_res/app_store.svg"></a>\
	<br><br>\
	<span style="color:#797979;font-size:0.5em">不想再收到 Dcard 電子報? <a style="color:#595959" href="">取消訂閱</a></span>\
</center></td></tr>\
</tbody></table>';
var to = [];
users_mail.forEach(function(user) {
	to.push({
		email: user[1],
		name: user[0],
		type: "bcc"
	});
});
posts.forEach(function(post) {
	mail_body += '<tr><td>\
	<a href="' + post.url + '"><table border="0" cellspacing="0" cellpadding="10" style="width: 90%;margin: 0 auto;table-layout: fixed;max-width: 800px"><tbody style="box-shadow: 3px black">\
		<tr bgcolor="#82CFF6"><td colspan="12" style="-moz-border-radius-topleft:10px;-webkit-border-top-left-radius:10px;border-top-left-radius:10px;-moz-border-radius-topright:10px;-webkit-border-top-right-radius:10px;border-top-right-radius:10px">&nbsp;</td></tr>\
		<tr bgcolor="white"><td colspan="9" style="padding-left:2vw"><h2 style="color:black">' + post.title + '</h2></td><td colspan="3" style="color:#F57A7A"><center><img src="https://shouko.github.io/dcard-newsletter/img/heart.png">' + post.likes + '</center></td></tr>\
		<tr bgcolor="white" style="color:#797979;"><td colspan="12" style="padding-left:2vw">' + post.content + '<br><br></td></tr>';
	post.comments.forEach(function(comment){
		mail_body += '<tr bgcolor="white" style="color:#595959"><td colspan="1" style="padding-top:0px;padding-left:2vw"><center><img src="https://shouko.github.io/dcard-newsletter/img/';
		mail_body += comment.gender + '.png" style="height: 45px"></center></td><td colspan="11" style="padding-left: 20px;padding-top:0px;background:url(https://shouko.github.io/dcard-newsletter/img/bubble.png) no-repeat;">';
		mail_body += comment.content;
		mail_body += '</td></tr>' + '<tr bgcolor="white"><td colspan="12"></td></tr>'
	});
	mail_body += '	</tbody></table></a></td></tr>';
	mail_body += '<tr><td><br><br></td></tr>';
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