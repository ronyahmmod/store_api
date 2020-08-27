const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION 😪: SHUTTNG DOWN');
	console.log(`Error: ${err.name} and Info: ${err.message}`);
	process.exit(1);
});

const DB_LOCAL = process.env.DB_LOCAL;

mongoose
	.connect(DB_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then((con) => {
		console.log('DB CONNECTION SUCCESSFULL 😁');
	})
	.catch((err) => {
		console.log('SORRY DUDE 😪: THERE IS PROBLEM');
		console.log(err);
	});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.log(`APP RUNNING ON PORT: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED PROMISE REJECTION 😪: SHUTTING DOWN');
	console.log(`Error: ${err.name} and Info: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
