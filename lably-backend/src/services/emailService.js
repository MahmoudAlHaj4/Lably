const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  family: 4,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

const sendActivationEmail = async (toEmail, activationToken) => {
  const activationLink = `${process.env.FRONTEND_URL}/activate?token=${activationToken}`

  await transporter.sendMail({
    from: `"Lably" <${process.env.GMAIL_USER}>`, 
    to: toEmail,
    subject: 'Activate your Lably account',
    html: `
      <h2>Welcome to Lably!</h2>
      <p>Your application has been approved. Click the link below to activate your account.</p>
      <a href="${activationLink}">Activate Account</a>
      <p>This link expires in 48 hours.</p>
    `
  })
}

module.exports = { sendActivationEmail }