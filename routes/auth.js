const express = require('express');
const config = require('config');
const JWT_SECRET = config.get('db.JWT_SECRET');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route     GET /api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json({ msg: 'Authorized User', user });
	} catch (err) {
		// Server Error 500
		console.log('Server Error:', err.message);
		res.status(500).json({ serverError: err.message });
	}
});

// @route     POST /api/auth
// @desc      Auth user & get token
// @access    Private
router.post(
	'/',
	body('email').isEmail().withMessage('Please use a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Please enter a passwords with 6 or more characters'),
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// Find user from MongoDB
			let user = await User.findOne({ email });

			// If user not found
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// Check if plain password matches hashed password
			const isPasswordMatch = await bcrypt.compareSync(password, user.password);

			// If passwords don't match: @false
			if (!isPasswordMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// JWT Payload
			const payload = {
				user: {
					id: user.id,
				},
			};

			// JWT Signature
			await jwt.sign(
				payload,
				JWT_SECRET,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					// Fail
					if (err) {
						return res.json({ error: err.message });
					}
					// Pass
					res.json({ msg: 'Logged in user', token });
				},
			);
		} catch (err) {
			// Server Error 500
			console.log('Server Error:', err.message);
			res.status(500).json({ serverError: err.message });
		}
	},
);

module.exports = router;
