const axios = require('axios');

const submitAddItem = async (e, data) => {
	try {
		await axios.post('/addItem', data);
	} catch (err) {
		console.log(err);
	}
};

function goBack() {
	window.history.back();
}
