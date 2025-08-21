const express = require('express');
const { auth, requireOnboarding } = require('../middleware/auth');

const router = express.Router();

// Mock doctors data (in production, this would be a separate model)
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Emergency Medicine",
    rating: 4.9,
    reviews: 127,
    distance: "0.5 miles",
    image: "",
    isAvailable: true,
    nextAvailable: "Available now",
    experience: 8,
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    insurance: ["Blue Cross", "Aetna", "Medicare"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgery",
    rating: 4.8,
    reviews: 89,
    distance: "1.2 miles",
    image: "",
    isAvailable: false,
    nextAvailable: "Next: Tomorrow 9:00 AM",
    experience: 15,
    education: "Stanford Medical School",
    languages: ["English", "Mandarin"],
    insurance: ["Blue Cross", "Kaiser", "Medicare"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Internal Medicine",
    rating: 4.7,
    reviews: 156,
    distance: "2.1 miles",
    image: "",
    isAvailable: true,
    nextAvailable: "Available in 30 min",
    experience: 12,
    education: "UCLA Medical School",
    languages: ["English", "Spanish"],
    insurance: ["Blue Cross", "Aetna", "Medicare", "Medicaid"]
  }
];

// @route   GET /api/doctors
// @desc    Get all doctors with optional filtering
// @access  Private
router.get('/', auth, requireOnboarding, async (req, res) => {
  try {
    const { specialty, search, available } = req.query;
    let filteredDoctors = [...doctors];

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Filter by search term
    if (search) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by availability
    if (available === 'true') {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.isAvailable);
    }

    res.json({
      doctors: filteredDoctors,
      total: filteredDoctors.length
    });

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Private
router.get('/:id', auth, requireOnboarding, async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = doctors.find(d => d.id === id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ doctor });

  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/specialties
// @desc    Get all available specialties
// @access  Private
router.get('/specialties/list', auth, requireOnboarding, async (req, res) => {
  try {
    const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
    res.json({ specialties });

  } catch (error) {
    console.error('Get specialties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 