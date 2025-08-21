# 🚀 GoMAXPAIN Setup Guide

This guide will walk you through setting up the complete GoMAXPAIN application with both frontend and backend running locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Step-by-Step Setup

### 1. **Clone and Navigate to Project**
```bash
git clone <your-repository-url>
cd gomaxpain
```

### 2. **Backend Setup**

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure MongoDB
You have two options:

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Linux/Mac)
sudo systemctl start mongod

# Or start manually
mongod

# Verify it's running
mongo --eval "db.runCommand('ping')"
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/config.js` with your connection string

#### Update Configuration
Edit `backend/config.js`:
```javascript
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gomaxpain',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
```

#### Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected successfully
```

**Test Backend:**
```bash
curl http://localhost:5000/api/health
# Should return: {"message":"Server is running","timestamp":"..."}
```

### 3. **Frontend Setup**

#### Open New Terminal
```bash
# From project root
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. **Verify Complete Setup**

#### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

#### Frontend Access
Open your browser and navigate to: `http://localhost:5173`

You should see the GoMAXPAIN application with:
- Welcome screen
- Sign up/Login options
- Responsive design

## 🧪 Testing the Application

### **Test User Registration Flow**

1. **Navigate to Sign Up**
   - Click "Sign Up" button
   - Fill in the form with test data:
     - First Name: `Test`
     - Last Name: `User`
     - Email: `test@example.com`
     - Phone: `1234567890`
     - Password: `password123`
     - Confirm Password: `password123`
     - Accept Terms: ✓

2. **Submit Registration**
   - Click "Create Account"
   - You should see a success message
   - Note the verification code displayed

3. **Email Verification**
   - Copy the verification code from the response
   - Enter it in the verification screen
   - Click "Verify Email"

4. **Complete Onboarding**
   - Welcome screen → Next
   - Features overview → Next
   - Grant permissions → Complete

5. **Access Dashboard**
   - You should now see the main dashboard
   - Test responsive design by resizing browser

### **Test Login Flow**

1. **Logout** (if logged in)
2. **Navigate to Login**
3. **Use Test Credentials:**
   - Email: `test@example.com`
   - Password: `password123`
4. **Verify successful login**

## 🔍 Troubleshooting

### **Backend Issues**

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if stopped
sudo systemctl start mongod

# Check MongoDB logs
sudo journalctl -u mongod -f
```

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in config.js
PORT: 5001
```

#### JWT Secret Issues
```bash
# Generate a new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update config.js with the new secret
```

### **Frontend Issues**

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### API Connection Issues
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure `API_BASE_URL` in `src/services/api.ts` matches backend

### **Database Issues**

#### Reset Database
```bash
# Connect to MongoDB
mongo

# Switch to database
use gomaxpain

# Drop all collections
db.dropDatabase()

# Exit
exit
```

#### Check Collections
```bash
mongo gomaxpain --eval "db.getCollectionNames()"
```

## 📱 Testing Responsive Design

### **Browser Developer Tools**
1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Test Different Devices:**
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1024px+)

### **Manual Testing**
- **Mobile**: Resize browser to mobile width
- **Tablet**: Resize to tablet width
- **Desktop**: Full browser width

### **Responsive Features to Test**
- [ ] Header adapts to screen size
- [ ] Navigation changes from sidebar to bottom nav
- [ ] Text scales appropriately
- [ ] Grids adapt from single to multi-column
- [ ] Touch-friendly interactions on mobile

## 🚀 Production Preparation

### **Environment Variables**
Create `.env` files (not tracked in git):

**Backend (.env)**
```bash
PORT=5000
MONGODB_URI=mongodb://your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

**Frontend (.env)**
```bash
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### **Build Commands**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 📚 Additional Resources

### **MongoDB**
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### **React & TypeScript**
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Tailwind CSS**
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Responsive Design Guide](https://tailwindcss.com/docs/responsive-design)

### **Node.js & Express**
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** in both terminal windows
2. **Review this setup guide** step by step
3. **Check browser console** for frontend errors
4. **Verify MongoDB connection** and status
5. **Ensure all dependencies** are installed
6. **Check port availability** (5000 for backend, 5173 for frontend)

## 🎯 Next Steps

After successful setup:

1. **Explore the codebase** - understand the structure
2. **Test all features** - registration, login, onboarding
3. **Customize the application** - modify colors, add features
4. **Deploy to production** - follow production guide
5. **Add new features** - implement additional functionality

---

**Happy Coding! 🚀**

If you have any questions or need help, please refer to the main README.md or create an issue in the repository. 