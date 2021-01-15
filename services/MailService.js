const { mail } = require("../config/config.json")[process.env.NODE_ENV]
const nodemailer = require("nodemailer");

exports.send_mail = async (to, subject, html) => {
	let transporter = nodemailer.createTransport(mail.smtp);
	
	let info = await transporter.sendMail({
		from: mail.from,
		to,
		subject,
		html
	});
	
	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

exports.send_mail_admin = (subject, html) => {
	this.send_mail(mail.to, subject, html)
}