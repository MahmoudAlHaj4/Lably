const apiUrl = CONFIG.apiUrl
const token = localStorage.getItem('token')

const collectProfileData = () => {
    return {
        full_name: getVal('fullName'),
        job_title: getVal('jobTitle'),
        years_of_experience: getVal('yearsOfExperience'),
        about: getRich('aboutMe'),
        phone: getVal('phone'),
        address: getVal('address')
    }
}

const collectExperiences = () => {
    const cards = document.getElementById('experienceList').children
    return Array.from(cards).map(card => {
        const id = card.id.replace('exp-', '')
        return {
            job_title: getVal(`exp-${id}-job_title`),
            company_name: getVal(`exp-${id}-company_name`),
            start_date: getVal(`exp-${id}-start_date`),
            end_date: getVal(`exp-${id}-end_date`) || null,
            description: getVal(`exp-${id}-description`) || null
        }
    })
}

const submitProfile = async () => {
    const profileData = collectProfileData()
    const experiences = collectExperiences()

    const avatarFile = document.getElementById('avatarInput').files[0]
    const formData = new FormData()
    Object.entries(profileData).forEach(([key, val]) => {
        if (val) formData.append(key, val)
    })
    if (avatarFile) formData.append('profile_image', avatarFile)

    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        const result = await res.json()
        if (!res.ok) {
            console.log(result)
            showToast(result.message)
            return
        }

        for (const exp of experiences) {
            await fetch(`${apiUrl}/api/experiences`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exp)
            })
        }
        showSuccessScreen()

    } catch (err) {
        showToast('Something went wrong. Please try again.')
    }
}