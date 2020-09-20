// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

// IMPLEMENT LETTER

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	// 1) Create a transporte
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	// 2) Define the email options
	const mailOptions = {
		from: 'Md. Rony Ahmmod <rony.jib@gmail.com',
		to: options.email,
		subject: options.subject,
		text: options.message
		// html:
	};
	// 3) Actually send the email
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
