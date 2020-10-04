const express = require('express');
const loadLibrary = require('./helper/loadLibrary');
const mounting = require('./helper/mounting');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

// CREATING APP
const app = express();

// LOAD LIBRARY
loadLibrary(app);
// MOUNTING APP WITH ROUTER
mounting(app);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
