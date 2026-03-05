const nodemailer = require('nodemailer')

const sendActivationEmail = async (toEmail, activationToken) => {
    const activationLink = `${process.env.FRONTEND_URL}/activate?token=${activationToken}`

    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    const info = await transporter.sendMail({
        from: `"Lably" <${testAccount.user}>`,
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