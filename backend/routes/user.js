const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, requireOnboarding } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/user/complete-onboarding
// @desc    Complete user onboarding
// @access  Private
router.post('/complete-onboarding', auth, [
  body('permissions.location').isBoolean().withMessage('Location permission must be boolean'),
  body('permissions.notifications').isBoolean().withMessage('Notifications permission must be boolean'),
  body('permissions.camera').isBoolean().withMessage('Camera permission must be boolean'),
  body('permissions.phone').isBoolean().withMessage('Phone permission must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { permissions } = req.body;
    const user = req.user;

    // Update permissions and mark onboarding as completed
    user.permissions = permissions;
    user.onboardingCompleted = true;
    await user.save();

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        onboardingCompleted: user.onboardingCompleted,
        permissions: user.permissions
      }
    });

  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, requireOnboarding, [
  body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('phone').optional().trim().isLength({ min: 10 }).withMessage('Please provide a valid phone number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone, profile } = req.body;
    const user = req.user;

    // Update allowed fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/user/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, requireOnboarding, [
  body('language').optional().isIn(['English', 'Spanish', 'French']).withMessage('Invalid language'),
  body('darkMode').optional().isBoolean().withMessage('Dark mode must be boolean'),
  body('autoLock').optional().isIn(['1 minute', '5 minutes', '15 minutes', '30 minutes']).withMessage('Invalid auto-lock value')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { language, darkMode, autoLock } = req.body;
    const user = req.user;

    // Update preferences
    if (language !== undefined) user.preferences.language = language;
    if (darkMode !== undefined) user.preferences.darkMode = darkMode;
    if (autoLock !== undefined) user.preferences.autoLock = autoLock;

    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user/emergency-contacts
// @desc    Add emergency contact
// @access  Private
router.post('/emergency-contacts', auth, requireOnboarding, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('relationship').trim().isLength({ min: 2 }).withMessage('Relationship must be at least 2 characters'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Please provide a valid phone number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, relationship, phone } = req.body;
    const user = req.user;

    // Add emergency contact
    user.emergencyContacts.push({ name, relationship, phone });
    await user.save();

    res.json({
      message: 'Emergency contact added successfully',
      emergencyContacts: user.emergencyContacts
    });

  } catch (error) {
    console.error('Add emergency contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/user/emergency-contacts/:id
// @desc    Update emergency contact
// @access  Private
router.put('/emergency-contacts/:id', auth, requireOnboarding, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('relationship').optional().trim().isLength({ min: 2 }).withMessage('Relationship must be at least 2 characters'),
  body('phone').optional().trim().isLength({ min: 10 }).withMessage('Please provide a valid phone number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, relationship, phone } = req.body;
    const user = req.user;

    // Find and update emergency contact
    const contact = user.emergencyContacts.id(id);
    if (!contact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }

    if (name) contact.name = name;
    if (relationship) contact.relationship = relationship;
    if (phone) contact.phone = phone;

    await user.save();

    res.json({
      message: 'Emergency contact updated successfully',
      emergencyContacts: user.emergencyContacts
    });

  } catch (error) {
    console.error('Update emergency contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/user/emergency-contacts/:id
// @desc    Delete emergency contact
// @access  Private
router.delete('/emergency-contacts/:id', auth, requireOnboarding, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Remove emergency contact
    user.emergencyContacts = user.emergencyContacts.filter(contact => contact._id.toString() !== id);
    await user.save();

    res.json({
      message: 'Emergency contact deleted successfully',
      emergencyContacts: user.emergencyContacts
    });

  } catch (error) {
    console.error('Delete emergency contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 