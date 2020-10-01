const viewRouter = require('../routes/viewRouter');
const userRouter = require('../routes/userRoutes');
const categoryRouter = require('../routes/categoryRoutes');
const productRouter = require('../routes/productRoutes');
const stockRouter = require('../routes/stockRoutes');

const mounting = (app) => {
	//  Mounting
	app.use('/', viewRouter);

	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/category', categoryRouter);
	app.use('/api/v1/product', productRouter);
	app.use('/api/v1/stock', stockRouter);
};

module.exports = mounting;
