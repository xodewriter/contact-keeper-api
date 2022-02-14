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
router.post('/', (req, res) => {
	res.send('Add contact');
});

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
