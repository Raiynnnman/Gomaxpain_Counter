const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, requireOnboarding } = require('../middleware/auth');

const router = express.Router();

// Mock appointments data (in production, this would be a separate model)
let appointments = [];

// @route   GET /api/appointments
// @desc    Get user appointments
// @access  Private
router.get('/', auth, requireOnboarding, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const userAppointments = appointments.filter(apt => apt.userId === userId);
    
    res.json({
      appointments: userAppointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private
router.post('/', auth, requireOnboarding, [
  body('type').isIn(['doctor', 'lawyer']).withMessage('Type must be doctor or lawyer'),
  body('providerId').notEmpty().withMessage('Provider ID is required'),
  body('providerName').notEmpty().withMessage('Provider name is required'),
  body('specialty').notEmpty().withMessage('Specialty is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      providerId,
      providerName,
      specialty,
      date,
      time,
      location,
      description
    } = req.body;

    const newAppointment = {
      id: Date.now().toString(),
      userId: req.user._id.toString(),
      type,
      providerId,
      providerName,
      specialty,
      date,
      time,
      location,
      description: description || '',
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private
router.put('/:id', auth, requireOnboarding, [
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('time').optional().notEmpty().withMessage('Time is required'),
  body('status').optional().isIn(['scheduled', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const userId = req.user._id.toString();
    
    const appointmentIndex = appointments.findIndex(apt => apt.id === id && apt.userId === userId);
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment
    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Appointment updated successfully',
      appointment: appointments[appointmentIndex]
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel appointment
// @access  Private
router.delete('/:id', auth, requireOnboarding, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    
    const appointmentIndex = appointments.findIndex(apt => apt.id === id && apt.userId === userId);
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Mark as cancelled instead of deleting
    appointments[appointmentIndex].status = 'cancelled';
    appointments[appointmentIndex].updatedAt = new Date().toISOString();

    res.json({
      message: 'Appointment cancelled successfully',
      appointment: appointments[appointmentIndex]
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 