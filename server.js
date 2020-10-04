const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION 😪: SHUTTNG DOWN');
	console.log(`Error: ${err.name} and Info: ${err.message}`);
	process.exit(1);
});

const DB_CLOUD = process.env.DB_CLOUD;

mongoose
	.connect(DB_CLOUD, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then((con) => {
		console.log('DB CONNECTION SUCCESSFULL 😁');
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
