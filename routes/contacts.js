const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET /api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		// Get contacts belonging to the owner with user ID
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});

		res.send(contacts);
	} catch (err) {
		// Server Error 500
		console.log('Server Error:', err.message);
		res.status(500).json({ serverError: err.message });
	}
});

// @route     POST /api/contacts
// @desc      Add new contact
// @access    Private
router.post(
	'/',
	body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
	auth,
	async (req, res) => {
		// Validation errors
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json({ msg: 'Added a new contact', contact });
		} catch (err) {
			// Server Error 500
			console.log('Server Error:', err.message);
			res.status(500).json({ serverError: err.message });
		}
	},
);

// @route     PUT /api/contacts/:id
// @desc      Add new contact
// @access    Private
router.put('/:id', (req, res) => {
	res.send('Update contact');
});

// @route     DELETE /api/contacts/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', (req, res) => {
	res.send('Delete a contact');
});

module.exports = router;
