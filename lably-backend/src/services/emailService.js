const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendActivationEmail = async (toEmail, activationToken) => {
    const activationLink = `${process.env.FRONTEND_URL}/activate?token=${activationToken}`

    await transporter.sendMail({
        from: `"Lably" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Activate your Lably account',
        html: `
            <h2>Welcome to Lably!</h2>
            <p>Your application has been approved. Click the link below to activate your account.</p>
            <a href="${activationLink}">Activate Account</a>
            <p>This link expires in 48 hours.</p>
        `
    })

    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
}

module.exports = { sendActivationEmail }