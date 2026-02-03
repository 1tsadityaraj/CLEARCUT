const User = require('../models/User');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const isConnected = () => mongoose.connection.readyState === 1;

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!isConnected()) {
            console.warn('DB Disconnected. Registering Mock User.');
            return res.status(201).json({
                _id: 'mock_user_id',
                name,
                email,
                credits: 999, // Free mock credits
                token: 'mock_token_123',
                isMock: true
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                credits: user.credits,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!isConnected()) {
            console.warn('DB Disconnected. Logging in Mock User.');
            return res.json({
                _id: 'mock_user_id',
                name: 'Mock User',
                email,
                credits: 999,
                token: 'mock_token_123',
                isMock: true
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                credits: user.credits,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    if (req.user && req.user.isMock) {
        return res.status(200).json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            credits: req.user.credits,
            isMock: true
        });
    }

    const user = await User.findById(req.user.id);

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
    });
};
