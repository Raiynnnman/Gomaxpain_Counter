module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gomaxpain',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Email Configuration (Gmail)
  EMAIL_USER: process.env.EMAIL_USER || 'your-email@gmail.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'your-app-password',
  
  // For development/testing, you can use these default values
  // EMAIL_USER: 'test@gmail.com',
  // EMAIL_PASSWORD: 'test-app-password'
}; 