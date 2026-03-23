const token  = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl

const postBtn = document.getElementById('postBtn')
const postBtnText = document.getElementById('postBtnText')

const postJob = async () => {
    postBtn.disabled = true
    postBtnText.textContent = 'Posting...'

    try {
        const jobData = {
            job_title:    getVal('jobTitle'),
            job_type:     getVal('jobType'),
            location:     getVal('location'),
            description:  getVal('description'),
            requirements: getVal('requirements'),
        }

        const res = await fetch(`${apiUrl}/api/jobs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        })
        const data = await res.json()

        if (res.ok) {
            showToast('Job posted successfully', 'success')
            window.location.href = './employerJob.html'
        } else {
            showToast(data.message || 'Failed to post job. Please try again.')
        }
    } catch (error) {
        showToast('Something went wrong. Please try again.')
    } finally {
        postBtn.disabled = false
        postBtnText.textContent = 'Post Job'
    }
}

const loadNav = async () => {
    try {
        const res  = await fetch(`${apiUrl}/api/employer/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (!res.ok || !json.data) return

        const profile = json.data
        document.getElementById('company-name-nav').textContent = profile.company_name
        document.getElementById('nav-initials').textContent = profile.company_name?.[0]?.toUpperCase() || 'E'

        if (profile.logo_path) {
            const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/logos/${profile.logo_path}`
            const avatar = document.getElementById('nav-avatar')
            avatar.src = url
            avatar.classList.remove('hidden')
            document.getElementById('nav-initials').classList.add('hidden')
        }
    } catch (err) {
        console.error('Failed to load nav profile:', err)
    }
}

loadNav()

postBtn.addEventListener('click', postJob)