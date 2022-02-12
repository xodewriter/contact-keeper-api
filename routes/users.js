const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Mongoose } = require('mongoose');

const User = require('../models/User');

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
	(req, res) => {
		// Pull variables from request body
		const { name, email, password } = req.body;

		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.json({ msg: 'Register a user', name, email, password });
	},
);

module.exports = router;
