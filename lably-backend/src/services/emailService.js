const sendActivationEmail = async (toEmail, activationToken) => {
    const activationLink = `${process.env.FRONTEND_URL}/activate?token=${activationToken}`

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'Lably <onboarding@resend.dev>',
            to: toEmail,
            subject: 'Activate your Lably account',
            html: `
                <h2>Welcome to Lably!</h2>
                <p>Your application has been approved. Click the link below to activate your account.</p>
                <a href="${activationLink}">Activate Account</a>
                <p>This link expires in 48 hours.</p>
            `
        })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(`Failed to send activation email: ${error.message}`)
    }
}

module.exports = { sendActivationEmail }