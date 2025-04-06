// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Mongoose model
// const jwt = require('jsonwebtoken'); // Uncomment if using JWT
// const SECRET = 'your-secret-key';     // Store in .env for real apps

// Register User
router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already registered.' });

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ error: 'Server error during registration.' });
    }
});

// Login User
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found.' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

        // Optional: return a token
        // const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
            // , token
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error during login.' });
    }
});

module.exports = router;