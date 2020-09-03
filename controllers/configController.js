const catchAsync = require('../utils/catchAsync');

exports.getConfig = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			storeName: process.env.STORE_NAME,
			storeAddress: process.env.STORE_ADDRESS
		}
	});
});
