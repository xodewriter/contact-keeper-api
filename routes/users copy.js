const express = require('express');
const config = require('config');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Mongoose } = require('mongoose');

const User = require('../models/User');

// Global Vars
const TOKEN_SECRET = config.get('db.TOKEN_SECRET');

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
		.withMessage('Passwords must be 6 or more chars'),
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
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

			// Encrypt password
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(password, salt);

			user = new User({
				name,
				email,
				password,
			});

			// Generate token

			// Token Signature
			const token = jwt.sign(
				{ user },
				TOKEN_SECRET,
				{ expiresIn: 360000 },
				(err, token) => {
					//
					if (err) {
						console.log(err.message);
					}
					console.log('TOKEN:', token);

					res.json({ msg: 'Register a user', token });
				},
			);
		} catch (err) {
			res.send('Ooops, something went wrong!');
		}
	},
);

module.exports = router;
