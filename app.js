const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSantize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const itemRouter = require('./routes/itemRouter');
// CREATING APP
const app = express();

// SET UP VIEW ENGINE PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// SET PATH OF STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// SECURE HTTP HEADERS
app.use(helmet());

// DEVELOPMENT TIME LOGING
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// LIMITING REQUEST FROM THE SAME API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many request from the same IP address, Plz try again latter'
});

app.use('/api', limiter);

// LIMITING REQUEST BODY SIZE SND ALIVE [req.body]
app.use(express.json({ limit: '10kb' }));

// DATA SANITIZATION AGAINIST CROSS XSS
app.use(xss());

// DATA SANITIZATION AGAINIST NoSql QUERY INJECTION
app.use(mongoSantize());

// PREVENTING PARAMETER POLUTION
app.use(hpp());

// CUSTOM MIDDLEWARE FUNCTION FOR GENERATING requestTime of req
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// TODO: Mounting
app.get('/', (req, res) => {
	res.status(200).render('base');
});

app.use('/api/v1/items', itemRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
