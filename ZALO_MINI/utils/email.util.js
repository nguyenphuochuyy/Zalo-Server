const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token) => {
  const html = await ejs.renderFile(
    path.join(__dirname, '../views/verifyEmail.ejs'),
    {
      verifyLink: `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`,
    }
  );

  const options = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Xác minh tài khoản ZALO_MINI',
    html,
  };

  await transporter.sendMail(options);
};

const sendResetPasswordEmail = async (to, token) => {
  const link = `${process.env.CLIENT_URL}/api/auth/reset-password?token=${token}`;

  const options = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Khôi phục mật khẩu ZALO_MINI',
    html: `<p>Nhấp vào liên kết sau để đặt lại mật khẩu:</p><a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(options);
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
