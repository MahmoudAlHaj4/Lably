authGuard(['employer'])

const companyName = document.getElementById('companyName')
const aboutUs = document.getElementById('aboutUs')
const organizationType = document.getElementById('organizationType')
const industryType = document.getElementById('industryType')
const teamSize = document.getElementById('teamSize')
const yearEstablished = document.getElementById('yearEstablished')
const website = document.getElementById('website')
const companyVision = document.getElementById('companyVision')
const linkedinUrl = document.getElementById('linkedinUrl')
const instagramUrl = document.getElementById('instagramUrl')
const facebookUrl = document.getElementById('facebookUrl')
const twitterUrl = document.getElementById('twitterUrl')
const contactEmail = document.getElementById('contactEmail')
const contactPhone = document.getElementById('contactPhone')
const address = document.getElementById('address')

const apiUrl = CONFIG.apiUrl
const token = localStorage.getItem('token')

const checkExistingProfile = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/employer/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if(res.ok && data.data) {
            window.location.href = './dashboard.html'
        }
    } catch(error) {
        console.log(error)
    }
}

checkExistingProfile()


const setUpProfile = async () => {
    try {
        const logoFile = document.getElementById('logoInput').files[0]
        const bannerFile = document.getElementById('bannerInput').files[0]

        const formData = new FormData()
        formData.append('company_name', companyName.value)
        formData.append('company_description', aboutUs.innerHTML)
        formData.append('location', address.value)
        formData.append('website', website.value)
        formData.append('organization_type', organizationType.value)
        formData.append('industry_type', industryType.value)
        formData.append('team_size', teamSize.value)
        formData.append('year_established', yearEstablished.value)
        formData.append('company_vision', companyVision.innerHTML)
        formData.append('linkedin_url', linkedinUrl.value)
        formData.append('twitter_url', twitterUrl.value)
        formData.append('facebook_url', facebookUrl.value)
        formData.append('instagram_url', instagramUrl.value)
        formData.append('contact_email', contactEmail.value)
        formData.append('contact_phone', contactPhone.value)

        if(logoFile) formData.append('logo', logoFile)
        if(bannerFile) formData.append('banner', bannerFile)

        const res = await fetch(`${apiUrl}/api/employer/profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        const data = await res.json()
        if(res.ok) {
            showSuccess()
        } else {
            throw new Error(data.message)
        }
    } catch(error) {
        showToast(error.message)
    }
}