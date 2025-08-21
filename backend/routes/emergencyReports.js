const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// In-memory storage for testing (no database required)
let emergencyReports = [];
let reportIdCounter = 1;

// @route   POST /api/emergency-reports
// @desc    Create a new emergency report
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { type, description, severity, location } = req.body;
    
    // Basic validation
    if (!type || !['car', 'medical', 'workplace', 'slip', 'other'].includes(type)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid incident type' }] });
    }
    
    if (!description || description.length < 20 || description.length > 1000) {
      return res.status(400).json({ errors: [{ msg: 'Description must be between 20 and 1000 characters' }] });
    }
    
    if (severity && !['low', 'medium', 'high', 'critical'].includes(severity)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid severity level' }] });
    }

    // Create emergency report object
    const emergencyReport = {
      id: reportIdCounter++,
      userId: req.user.id,
      type,
      location: location || { address: 'Location not specified' },
      description,
      photos: [],
      severity: severity || 'medium',
      status: 'submitted',
      priority: severity === 'critical' ? 'urgent' : severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low',
      estimatedResponseTime: severity === 'critical' ? 15 : severity === 'high' ? 30 : severity === 'medium' ? 60 : 120,
      tags: [type, severity || 'medium'],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store in memory
    emergencyReports.push(emergencyReport);

    console.log('Emergency report created:', emergencyReport);

    res.status(201).json({
      success: true,
      message: 'Emergency report created successfully',
      data: emergencyReport
    });

  } catch (error) {
    console.error('Error creating emergency report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating emergency report',
      error: error.message 
    });
  }
});

// @route   GET /api/emergency-reports
// @desc    Get all emergency reports for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userReports = emergencyReports.filter(report => report.userId === req.user.id);
    
    res.json({
      success: true,
      data: userReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });

  } catch (error) {
    console.error('Error fetching emergency reports:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching emergency reports',
      error: error.message 
    });
  }
});

// @route   GET /api/emergency-reports/:id
// @desc    Get a specific emergency report by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const emergencyReport = emergencyReports.find(report => report.id === parseInt(req.params.id));

    if (!emergencyReport) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency report not found' 
      });
    }

    // Check if user owns this report
    if (emergencyReport.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      data: emergencyReport
    });

  } catch (error) {
    console.error('Error fetching emergency report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching emergency report',
      error: error.message 
    });
  }
});

// @route   PUT /api/emergency-reports/:id
// @desc    Update an emergency report
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const reportIndex = emergencyReports.findIndex(report => report.id === parseInt(req.params.id));

    if (reportIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency report not found' 
      });
    }

    const emergencyReport = emergencyReports[reportIndex];

    // Check if user owns this report
    if (emergencyReport.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    // Only allow updates if report is not resolved or closed
    if (['resolved', 'closed'].includes(emergencyReport.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot update resolved or closed reports' 
      });
    }

    // Update fields
    const updateFields = ['type', 'description', 'severity'];
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        emergencyReport[field] = req.body[field];
      }
    });

    // Update location if provided
    if (req.body.location) {
      emergencyReport.location = { ...emergencyReport.location, ...req.body.location };
    }

    emergencyReport.updatedAt = new Date();

    // Update priority and response time based on severity
    if (emergencyReport.severity === 'critical') {
      emergencyReport.priority = 'urgent';
      emergencyReport.estimatedResponseTime = 15;
    } else if (emergencyReport.severity === 'high') {
      emergencyReport.priority = 'high';
      emergencyReport.estimatedResponseTime = 30;
    } else if (emergencyReport.severity === 'medium') {
      emergencyReport.priority = 'medium';
      emergencyReport.estimatedResponseTime = 60;
    } else {
      emergencyReport.priority = 'low';
      emergencyReport.estimatedResponseTime = 120;
    }

    emergencyReport.tags = [emergencyReport.type, emergencyReport.severity, emergencyReport.priority];

    res.json({
      success: true,
      message: 'Emergency report updated successfully',
      data: emergencyReport
    });

  } catch (error) {
    console.error('Error updating emergency report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating emergency report',
      error: error.message 
    });
  }
});

// @route   DELETE /api/emergency-reports/:id
// @desc    Delete an emergency report
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const reportIndex = emergencyReports.findIndex(report => report.id === parseInt(req.params.id));

    if (reportIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency report not found' 
      });
    }

    const emergencyReport = emergencyReports[reportIndex];

    // Check if user owns this report
    if (emergencyReport.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    // Only allow deletion if report is not resolved or closed
    if (['resolved', 'closed'].includes(emergencyReport.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete resolved or closed reports' 
      });
    }

    // Remove from memory
    emergencyReports.splice(reportIndex, 1);

    res.json({
      success: true,
      message: 'Emergency report deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting emergency report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting emergency report',
      error: error.message 
    });
  }
});

// @route   PUT /api/emergency-reports/:id/status
// @desc    Update emergency report status (for professionals)
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Basic validation
    if (!status || !['under_review', 'assigned', 'in_progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid status' }] });
    }
    
    if (notes && typeof notes !== 'string') {
      return res.status(400).json({ errors: [{ msg: 'Notes must be a string' }] });
    }

    const reportIndex = emergencyReports.findIndex(report => report.id === parseInt(req.params.id));

    if (reportIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency report not found' 
      });
    }

    const emergencyReport = emergencyReports[reportIndex];

    // Update status
    emergencyReport.status = status;
    emergencyReport.updatedAt = new Date();

    // Add notes if provided
    if (notes) {
      if (!emergencyReport.notes) emergencyReport.notes = [];
      emergencyReport.notes.push({
        content: notes,
        author: req.user.id,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Emergency report status updated successfully',
      data: emergencyReport
    });

  } catch (error) {
    console.error('Error updating emergency report status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating emergency report status',
      error: error.message 
    });
  }
});

// @route   GET /api/emergency-reports/stats/summary
// @desc    Get emergency report statistics for the user
// @access  Private
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const userReports = emergencyReports.filter(report => report.userId === req.user.id);
    
    const summary = {
      total: userReports.length,
      critical: userReports.filter(r => r.severity === 'critical').length,
      high: userReports.filter(r => r.severity === 'high').length,
      medium: userReports.filter(r => r.severity === 'medium').length,
      low: userReports.filter(r => r.severity === 'low').length,
      resolved: userReports.filter(r => r.status === 'resolved').length,
      pending: userReports.filter(r => ['submitted', 'under_review', 'assigned', 'in_progress'].includes(r.status)).length
    };

    const byType = {};
    userReports.forEach(report => {
      byType[report.type] = (byType[report.type] || 0) + 1;
    });

    const typeStats = Object.entries(byType).map(([type, count]) => ({ _id: type, count }));

    res.json({
      success: true,
      data: {
        summary,
        byType: typeStats
      }
    });

  } catch (error) {
    console.error('Error fetching emergency report stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching emergency report statistics',
      error: error.message 
    });
  }
});

// @route   GET /api/emergency-reports/test/clear
// @desc    Clear all test data (for testing purposes)
// @access  Public (no auth required for testing)
router.get('/test/clear', (req, res) => {
  emergencyReports = [];
  reportIdCounter = 1;
  res.json({
    success: true,
    message: 'All test emergency reports cleared',
    count: emergencyReports.length
  });
});

// @route   GET /api/emergency-reports/test/list
// @desc    List all test data (for testing purposes)
// @access  Public (no auth required for testing)
router.get('/test/list', (req, res) => {
  res.json({
    success: true,
    data: emergencyReports,
    count: emergencyReports.length
  });
});

module.exports = router; 