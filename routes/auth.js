const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

const JWT_SECRET = config.get('db.JWT_SECRET');

// @route     GET /api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// @route     POST /api/auth
// @desc      Auth user & get token
// @access    Private
router.post(
	'/',
	body('email').isEmail().withMessage('Please use a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Passwords must be 6 or more chars'),
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// Find user from MongoDB
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// Check if string password matches hashed password
			const isPasswordMatch = await bcrypt.compareSync(password, user.password);

			// IF isPasswordMatch is false
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
			console.log('Error:', err.message);
			res.status(500).json({ error: err.message });
		}
	},
);

module.exports = router;
