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
		// console.log('Server Error:', err.message);
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
			// console.log('Server Error:', err.message);
			res.status(500).json({ serverError: err.message });
		}
	},
);

// @route     PUT /api/contacts/:id
// @desc      Add new contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// Build contact object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	// console.log(contactFields);

	try {
		// Find contact by id
		let contact = await Contact.findById(req.params.id);

		// Check if no contact found
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Check if user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true },
		);

		// console.log(contact);
		res.json({ msg: 'Updated contact', contact });
	} catch (err) {
		// Server Error 500
		// console.log('Server Error:', err.message);
		res.status(500).json({ serverError: err.message });
	}
});

// @route     DELETE /api/contacts/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.id);

		// Check if no contact found
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Check if user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(req.params.id);

		// Pass
		res.json({ msg: 'Contact removed' });
	} catch (err) {
		// Server Error 500
		// console.log('Server Error:', err.message);
		res.status(500).json({ serverError: err.message });
	}
});

module.exports = router;
