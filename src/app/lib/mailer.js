const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "56e5ad4eea6ac1",
		pass: "92c30bb0e00779"
	}
})