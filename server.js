const express = require('express');
const config = require('config');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// GET home page
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the home page' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

// Global Vars
const HOST = config.get('server.HOST') || 'localhost';
const PORT = config.get('server.PORT') || 5000;

// Listen
app.listen(PORT, () => console.log(`Server running @ http://${HOST}:${PORT}`));
