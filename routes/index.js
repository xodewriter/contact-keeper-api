const express = require('express');
const router = express.Router();

// @route     GET /
// @desc      Get home page
// @access    Public
router.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the home page' });
});

module.exports = router;
