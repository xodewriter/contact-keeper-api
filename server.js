const express = require('express');
const config = require('config');

const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// GET home page
// app.get('/', (req, res) => {
// 	res.json({ msg: 'Welcome to the home page' });
// });

// Routes
app.use('/', require('./routes/index'));

// Global Vars
const HOST = config.get('server.HOST') || 'localhost';
const PORT = config.get('server.PORT') || 5000;

// Listen
app.listen(PORT, () => console.log(`Server running @ http://${HOST}:${PORT}`));
