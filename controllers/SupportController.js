const mailService = require('../services/MailService')
const pug = require('pug')
const path = require('path');

module.exports.contact_us = (req, res) => {
	const html = pug.compileFile(path.join(__dirname, '/../views/mails/contacto.pug'))
	mailService.send_mail_admin('Contacto desde App', html(req.body))
	res.json(req.body)
}