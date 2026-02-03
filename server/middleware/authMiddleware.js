const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            console.log('Middleware Access:', {
                token: token,
                dbState: mongoose.connection.readyState,
                isMockToken: token === 'mock_token_123'
            });

            // Mock Token Check - Bypass JWT verify if mock token
            if (token === 'mock_token_123') {
                req.user = {
                    id: 'mock_user_id',
                    _id: 'mock_user_id',
                    name: 'Mock User',
                    email: 'mock@example.com',
                    credits: 999,
                    isMock: true
                };
                return next();
            }

            // Real JWT Verification
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (!req.user) {
                throw new Error('User not found');
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
