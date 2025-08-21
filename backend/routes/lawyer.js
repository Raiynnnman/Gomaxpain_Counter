const express = require('express');
const { auth, requireOnboarding } = require('../middleware/auth');

const router = express.Router();

// Mock lawyers data (in production, this would be a separate model)
const lawyers = [
  {
    id: "1",
    name: "Michael Davis",
    specialty: "Personal Injury",
    rating: 4.8,
    reviews: 94,
    distance: "0.8 miles",
    experience: 15,
    isAvailable: true,
    education: "Yale Law School",
    languages: ["English", "Spanish"],
    consultationFee: "$150/hour",
    cases: ["Car Accidents", "Slip & Fall", "Medical Malpractice"]
  },
  {
    id: "2",
    name: "Jennifer Wilson",
    specialty: "Auto Accidents",
    rating: 4.9,
    reviews: 156,
    distance: "1.5 miles",
    experience: 12,
    isAvailable: false,
    education: "Stanford Law School",
    languages: ["English"],
    consultationFee: "$200/hour",
    cases: ["Auto Accidents", "Motorcycle Accidents", "Truck Accidents"]
  },
  {
    id: "3",
    name: "Robert Martinez",
    specialty: "Workers' Compensation",
    rating: 4.7,
    reviews: 78,
    distance: "2.3 miles",
    experience: 20,
    isAvailable: true,
    education: "UC Berkeley Law School",
    languages: ["English", "Spanish"],
    consultationFee: "$175/hour",
    cases: ["Workplace Injuries", "Construction Accidents", "Industrial Accidents"]
  }
];

// @route   GET /api/lawyers
// @desc    Get all lawyers with optional filtering
// @access  Private
router.get('/', auth, requireOnboarding, async (req, res) => {
  try {
    const { specialty, search, available } = req.query;
    let filteredLawyers = [...lawyers];

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredLawyers = filteredLawyers.filter(lawyer => 
        lawyer.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Filter by search term
    if (search) {
      filteredLawyers = filteredLawyers.filter(lawyer =>
        lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by availability
    if (available === 'true') {
      filteredLawyers = filteredLawyers.filter(lawyer => lawyer.isAvailable);
    }

    res.json({
      lawyers: filteredLawyers,
      total: filteredLawyers.length
    });

  } catch (error) {
    console.error('Get lawyers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/lawyers/:id
// @desc    Get lawyer by ID
// @access  Private
router.get('/:id', auth, requireOnboarding, async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer = lawyers.find(l => l.id === id);

    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    res.json({ lawyer });

  } catch (error) {
    console.error('Get lawyer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/lawyers/specialties
// @desc    Get all available specialties
// @access  Private
router.get('/specialties/list', auth, requireOnboarding, async (req, res) => {
  try {
    const specialties = [...new Set(lawyers.map(lawyer => lawyer.specialty))];
    res.json({ specialties });

  } catch (error) {
    console.error('Get specialties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 