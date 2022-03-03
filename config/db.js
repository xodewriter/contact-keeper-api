const mongoose = require('mongoose');
const config = require('config');
const db = config.get('db.MONGO_URI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected...');
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
};

module.exports = connectDB;
