# GoMAXPAIN Backend API

A Node.js backend API for the GoMAXPAIN application with MongoDB database integration.

## Features

- **Authentication System**: JWT-based authentication with email verification
- **User Management**: Complete user profiles with onboarding flow
- **Appointment System**: Book and manage appointments with doctors and lawyers
- **Professional Directory**: Search and filter doctors and lawyers
- **Permission Management**: User consent and permission tracking
- **Emergency Contacts**: Manage emergency contact information

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Cross-origin resource sharing enabled

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally or cloud instance)
3. **npm** or **yarn**

### Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gomaxpain
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

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
- `PUT /api/user/emergency-contacts/:id` - Update emergency contact
- `DELETE /api/user/emergency-contacts/:id` - Delete emergency contact

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get doctors list
- `GET /api/doctors/:id` - Get doctor details
- `GET /api/doctors/specialties/list` - Get specialties

### Lawyers
- `GET /api/lawyers` - Get lawyers list
- `GET /api/lawyers/:id` - Get lawyer details
- `GET /api/lawyers/specialties/list` - Get specialties

## Database Models

### User Schema
- Personal information (name, email, phone)
- Authentication (password, verification status)
- Onboarding status and permissions
- Emergency contacts
- Profile and preferences

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### File Structure
```
backend/
├── config.js          # Configuration
├── server.js          # Main server file
├── models/            # Database models
│   └── User.js       # User model
├── routes/            # API routes
│   ├── auth.js       # Authentication routes
│   ├── user.js       # User management routes
│   ├── appointment.js # Appointment routes
│   ├── doctor.js     # Doctor routes
│   └── lawyer.js     # Lawyer routes
└── middleware/        # Custom middleware
    └── auth.js       # Authentication middleware
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS protection
- Protected routes with middleware

## Production Considerations

1. **Environment Variables**: Use proper environment variables for production
2. **JWT Secret**: Use a strong, unique JWT secret
3. **Database**: Use MongoDB Atlas or production MongoDB instance
4. **HTTPS**: Enable HTTPS in production
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Logging**: Add proper logging and monitoring
7. **Email Service**: Integrate real email service for verification

## Testing the API

You can test the API endpoints using:
- **Postman** or **Insomnia**
- **curl** commands
- **Frontend application** (when integrated)

## Health Check

- `GET /api/health` - API health status

## Support

For issues and questions, please refer to the main project documentation or create an issue in the repository. 