const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const stats = {
            user: {
                name: req.user.fullName,
                email: req.user.email,
                memberSince: req.user.createdAt,
                lastLogin: req.user.lastLogin
            },
            systemInfo: {
                serverTime: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
                apiVersion: '1.0.0'
            },
            activity: {
                totalLogins: req.user.lastLogin ? 1 : 0,
                accountStatus: req.user.isActive ? 'Active' : 'Inactive'
            }
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data'
        });
    }
});

// @route   GET /api/dashboard/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        res.json({
            success: true,
            profile: {
                id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
                memberSince: req.user.createdAt,
                lastLogin: req.user.lastLogin,
                accountAge: Math.floor((Date.now() - new Date(req.user.createdAt)) / (1000 * 60 * 60 * 24))
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
});

// @route   PUT /api/dashboard/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const { fullName } = req.body;

        if (fullName && fullName.length >= 2) {
            req.user.fullName = fullName;
            await req.user.save();
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                fullName: req.user.fullName,
                email: req.user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile'
        });
    }
});

module.exports = router;