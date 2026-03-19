const { BrevoClient } = require('@getbrevo/brevo')

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY
})

const sendActivationEmail = async (toEmail, activationToken) => {
  const activationLink = `${process.env.FRONTEND_URL}?token=${activationToken}`

  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      sender: { email: process.env.BREVO_SENDER, name: 'Lably' },
      to: [{ email: toEmail }],
      subject: 'Activate your Lably account',
      htmlContent: `
        <h2>Welcome to Lably!</h2>
        <p>Your application has been approved. Click the link below to activate your account.</p>
        <a href="${activationLink}">Activate Account</a>
        <p>This link expires in 48 hours.</p>
      `
    })
   
  } catch (error) {
    console.log('Email error:', error)
  }
}

module.exports = { sendActivationEmail }