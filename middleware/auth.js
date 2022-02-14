const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET = config.get('db.JWT_SECRET');

module.exports = function (req, res, next) {
	// Get token from header: Authorization: Bearer <token>
	const token = req.headers['authorization'].split(' ')[1];

	// Check if no token found
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// Verify token synchronous
		const decoded = jwt.verify(token, JWT_SECRET);

		// Pass: Set assign custom user property to request object
		req.user = decoded.user;

		// Run next piece of middleware
		next();
	} catch (err) {
		// Fail
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
