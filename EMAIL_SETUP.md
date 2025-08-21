# 📧 Email Setup Guide for GoMAXPAIN

This guide will help you set up email functionality for sending verification codes and password reset tokens.

## 🔧 **Current Issue**
The application was not sending actual emails - it was only returning verification codes in the API response for development purposes.

## ✅ **What I've Fixed**

### 1. **Added Email Service**
- Created `backend/utils/emailService.js` using Nodemailer
- Integrated with Gmail SMTP for sending emails
- Added beautiful HTML email templates

### 2. **Updated Backend**
- Modified auth routes to send actual emails
- Added resend verification code endpoint
- Integrated email service with signup and password reset

### 3. **Enhanced Frontend**
- Updated VerifyEmail component with proper integration
- Added resend code functionality
- Improved user experience with loading states and error handling

## 🚀 **Setup Instructions**

### **Option 1: Gmail Setup (Recommended)**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update Backend Configuration**:

```bash
cd backend
```

Edit `config.js`:
```javascript
module.exports = {
  // ... existing config ...
  
  // Email Configuration
  EMAIL_USER: 'your-email@gmail.com',
  EMAIL_PASSWORD: 'your-16-digit-app-password'
};
```

### **Option 2: Environment Variables**

Create `.env` file in backend directory:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### **Option 3: Test with Default Values**

For testing, you can use the default values in `config.js`:
```javascript
EMAIL_USER: 'test@gmail.com',
EMAIL_PASSWORD: 'test-app-password'
```

## 🧪 **Testing Email Functionality**

### **1. Test Email Configuration**
```bash
cd backend
node -e "
const { testEmailConfig } = require('./utils/emailService');
testEmailConfig().then(result => console.log('Email config test:', result));
"
```

### **2. Test the Application**
1. **Sign up** with a new email address
2. **Check your email** for verification code
3. **Verify the code** in the application
4. **Test resend** if needed

### **3. Development Mode Features**
- Verification codes are still logged to console for development
- Beautiful HTML email templates
- Proper error handling and user feedback

## 📧 **Email Templates**

### **Verification Email**
- Professional GoMAXPAIN branding
- Clear verification code display
- Expiration information
- Support contact details

### **Password Reset Email**
- Secure token delivery
- Clear instructions
- Expiration warnings
- Professional styling

## 🔒 **Security Features**

- **App Passwords**: No need to expose your main Gmail password
- **Token Expiration**: Verification codes expire in 10 minutes
- **Rate Limiting**: Built-in protection against spam
- **Secure SMTP**: Uses Gmail's secure SMTP servers

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"Invalid credentials" error**:
   - Check your Gmail username and app password
   - Ensure 2FA is enabled
   - Verify app password is correct

2. **"Connection timeout"**:
   - Check internet connection
   - Verify Gmail SMTP settings
   - Check firewall settings

3. **"Authentication failed"**:
   - Double-check app password
   - Ensure Gmail account is not locked
   - Try generating a new app password

### **Debug Steps**

1. **Check backend logs** for email errors
2. **Test email configuration** using the test function
3. **Verify Gmail settings** and app passwords
4. **Check spam folder** for test emails

## 🌐 **Alternative Email Providers**

### **Outlook/Hotmail**
```javascript
service: 'outlook',
auth: {
  user: 'your-email@outlook.com',
  pass: 'your-password'
}
```

### **Custom SMTP**
```javascript
host: 'your-smtp-server.com',
port: 587,
secure: false,
auth: {
  user: 'your-username',
  pass: 'your-password'
}
```

## 📱 **Frontend Integration**

The frontend now includes:
- ✅ **Real-time verification** with backend
- ✅ **Resend code functionality**
- ✅ **Loading states** and error handling
- ✅ **Auto-focus** on verification inputs
- ✅ **User-friendly messages**

## 🎯 **Next Steps**

1. **Configure your email** using the setup above
2. **Test the signup flow** with real email
3. **Verify email delivery** and verification
4. **Test password reset** functionality
5. **Customize email templates** if needed

## 🆘 **Need Help?**

If you encounter issues:
1. Check the backend console for error messages
2. Verify your Gmail app password
3. Test email configuration using the test function
4. Check the troubleshooting section above

---

**Your GoMAXPAIN application now sends real verification emails! 🎉📧** 