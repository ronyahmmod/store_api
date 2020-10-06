const viewRouter = require('../routes/viewRouter');
const userRouter = require('../routes/userRoutes');
const categoryRouter = require('../routes/categoryRoutes');
const productRouter = require('../routes/productRoutes');
const stockRouter = require('../routes/stockRoutes');
const saleRouter = require('../routes/saleRoutes');

const mounting = (app) => {
	//  Mounting
	app.use('/', viewRouter);

	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/categories', categoryRouter);
	app.use('/api/v1/products', productRouter);
	app.use('/api/v1/stocks', stockRouter);
	app.use('/api/v1/sales', saleRouter);
};

module.exports = mounting;
