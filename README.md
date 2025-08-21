# 🚑 GoMAXPAIN - Emergency Response & Professional Connection Platform

A fully responsive web application that connects users with medical professionals and legal experts in times of need. Built with React, TypeScript, Tailwind CSS, Node.js, and MongoDB.

## ✨ Features

### 🔐 **Authentication System**
- User registration and login
- Email verification flow
- Password reset functionality
- JWT-based authentication
- Secure password hashing

### 🚀 **User Onboarding**
- Welcome introduction
- Feature overview
- Permission management (Location, Notifications, Camera, Phone)
- Progressive user experience

### 🏥 **Medical Professionals**
- Search and filter doctors by specialty
- View doctor profiles and ratings
- Book appointments
- Real-time availability status

### ⚖️ **Legal Experts**
- Find lawyers by practice area
- View experience and credentials
- Schedule consultations
- Professional ratings and reviews

### 📅 **Appointment Management**
- Book appointments with doctors and lawyers
- View upcoming and past appointments
- Reschedule and cancel appointments
- Appointment history tracking

### 🚨 **Emergency Reporting**
- Submit emergency incident reports
- Document incidents with photos
- Location-based reporting
- Professional assistance coordination

### 👤 **User Profile Management**
- Complete profile information
- Emergency contacts management
- Preferences and settings
- Privacy controls

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Tailwind CSS** for responsive design
- **Vite** for fast development and building
- **Lucide React** for icons
- **Context API** for state management

### **Backend**
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gomaxpain
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment configuration
# Copy config.js and modify as needed

# Start MongoDB (if running locally)
mongod

# Start development server
npm run dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup
```bash
# In a new terminal, from project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
gomaxpain/
├── backend/                 # Node.js backend API
│   ├── config.js           # Configuration settings
│   ├── server.js           # Main server file
│   ├── models/             # MongoDB models
│   │   └── User.js         # User schema and methods
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   ├── user.js         # User management routes
│   │   ├── appointment.js  # Appointment routes
│   │   ├── doctor.js       # Doctor routes
│   │   └── lawyer.js       # Lawyer routes
│   └── middleware/         # Custom middleware
│       └── auth.js         # Authentication middleware
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Common components
│   │   │   ├── Header.tsx  # App header
│   │   │   ├── Sidebar.tsx # Navigation sidebar
│   │   │   └── ...         # Other components
│   │   └── ui/             # Base UI components
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── screens/            # Application screens
│   │   ├── Auth/           # Authentication screens
│   │   ├── Onboarding/     # Onboarding flow
│   │   ├── Main/           # Main application
│   │   ├── Doctors/        # Doctor-related screens
│   │   ├── Lawyers/        # Lawyer-related screens
│   │   └── ...             # Other screens
│   ├── services/           # API services
│   │   └── api.ts          # API integration
│   └── styles/             # CSS and styling
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/me` - Get current user

### User Management
- `POST /api/user/complete-onboarding` - Complete onboarding
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/preferences` - Update preferences
- `POST /api/user/emergency-contacts` - Add emergency contact

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Professionals
- `GET /api/doctors` - Get doctors list
- `GET /api/lawyers` - Get lawyers list
- `GET /api/doctors/:id` - Get doctor details
- `GET /api/lawyers/:id` - Get lawyer details

## 🎨 Responsive Design

The application is built with a **mobile-first approach** and includes:

- **Responsive breakpoints**: Mobile (<640px), Tablet (640px-1023px), Desktop (≥1024px)
- **Adaptive layouts**: Components automatically adjust to screen size
- **Touch-friendly interactions**: Optimized for mobile devices
- **Responsive typography**: Text scales appropriately per screen size
- **Flexible grids**: Layouts adapt from single-column to multi-column

## 🔒 Security Features

- **Password hashing** with bcryptjs
- **JWT token authentication**
- **Input validation** with express-validator
- **CORS protection**
- **Protected routes** with middleware
- **Secure password requirements**

## 🧪 Testing the Application

### 1. **User Registration Flow**
1. Navigate to the signup screen
2. Fill in user information
3. Accept terms and conditions
4. Submit the form
5. Verify email with the provided code

### 2. **Onboarding Process**
1. Complete welcome screen
2. Review features
3. Grant necessary permissions
4. Complete onboarding

### 3. **Main Application**
1. Access dashboard
2. Browse doctors and lawyers
3. Book appointments
4. Submit emergency reports
5. Manage profile and settings

## 🚀 Production Deployment

### Backend
1. Set proper environment variables
2. Use production MongoDB instance
3. Enable HTTPS
4. Implement rate limiting
5. Add logging and monitoring

### Frontend
1. Build production bundle: `npm run build`
2. Deploy to CDN or hosting service
3. Configure environment variables
4. Enable error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

## 🎯 Roadmap

- [ ] Real-time chat functionality
- [ ] Push notifications
- [ ] Payment integration
- [ ] Video consultations
- [ ] Document management
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app development

---

**GoMAXPAIN** - Connecting you with trusted professionals when you need them most. 🚑⚖️🏥
