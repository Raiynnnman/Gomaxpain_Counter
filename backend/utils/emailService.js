const nodemailer = require('nodemailer');
const config = require('../config');

// Create transporter for Gmail (you can change this to any email provider)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER || 'your-email@gmail.com',
      pass: config.EMAIL_PASSWORD || 'your-app-password' // Use App Password for Gmail
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, firstName, verificationCode) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.EMAIL_USER || 'noreply@gomaxpain.com',
      to: email,
      subject: 'GoMAXPAIN - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff6a00; margin: 0; font-size: 28px;">GoMAXPAIN</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Emergency Response & Professional Connection</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin: 0 0 20px 0; text-align: center;">Verify Your Email Address</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Hi ${firstName},
            </p>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Thank you for signing up with GoMAXPAIN! To complete your registration, please verify your email address by entering the verification code below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #ff6a00; color: white; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
                ${verificationCode}
              </div>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Need help? Contact us at support@gomaxpain.com
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 GoMAXPAIN. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.EMAIL_USER || 'noreply@gomaxpain.com',
      to: email,
      subject: 'GoMAXPAIN - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff6a00; margin: 0; font-size: 28px;">GoMAXPAIN</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Emergency Response & Professional Connection</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin: 0 0 20px 0; text-align: center;">Password Reset Request</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Hi ${firstName},
            </p>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              We received a request to reset your password. Use the token below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #ff6a00; color: white; padding: 15px 30px; border-radius: 8px; font-size: 18px; font-weight: bold; word-break: break-all;">
                ${resetToken}
              </div>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              This token will expire in 1 hour. If you didn't request this reset, please ignore this email.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Need help? Contact us at support@gomaxpain.com
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 GoMAXPAIN. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  testEmailConfig
}; 