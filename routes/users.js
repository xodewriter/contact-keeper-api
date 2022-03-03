const express = require('express');
const config = require('config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Mongoose } = require('mongoose');

const User = require('../models/User');

// Global Vars
const JWT_SECRET = config.get('db.JWT_SECRET');

// @route     POST /api/users
// @desc      Register a user
// @access    Public
router.post(
	'/',
	body('name')
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage('Please enter your name'),
	body('email').isEmail().withMessage('Please use a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Please enter a passwords with 6 or more characters'),
	async (req, res) => {
		// Validation errors
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Pull variables from request body
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			// User
			user = new User({
				name,
				email,
				password,
			});

			// Encrypt password
			let salt = await bcrypt.genSaltSync(10);
			let hash = await bcrypt.hashSync(password, salt);

			// Update user to hold hashed pw
			user.password = hash;

			await user.save();

			// User info to store in token
			const payload = {
				user: {
					id: user.id,
				},
			};

			// Generate Token Signature
			jwt.sign(
				payload,
				JWT_SECRET,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					// Fail
					if (err) {
						// Error coming from here
						// console.log('Error:', err.message);
						res.status(500).json({ error: err.message });
					}
					// Pass
					res.json({ msg: 'Registered a user', token });
				},
			);
		} catch (err) {
			// Server Error 500
			// console.log('Server Error:', err.message);
			res.status(500).json({ serverError: err.message });
		}
	},
);

module.exports = router;
