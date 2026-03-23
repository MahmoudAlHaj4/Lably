authGuard(['job_seeker'])

const params = new URLSearchParams(window.location.search)
const jobId  = params.get('id')

const apiUrl = CONFIG.apiUrl
const token  = localStorage.getItem('token')



if (!jobId) {
    showToast('Job not found.')
    setTimeout(() => window.location.href = './jobs.html', 1500)
}


const loadNavProfile = async () => {
    try {
        const res  = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (!res.ok || !json.data) return

        const profile = json.data
        const name    = profile.full_name || ''
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)


        document.getElementById('navInitials').textContent= initials
        document.getElementById('navName').textContent = name


        document.getElementById('dropdownInitials').textContent = initials
        document.getElementById('dropdownName').textContent = name


        if (profile.profile_image_path) {
            const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/avatars/${profile.profile_image_path}`

            const navAvatar = document.getElementById('navAvatar')
            navAvatar.src = url
            navAvatar.classList.remove('hidden')
            document.getElementById('navInitials').classList.add('hidden')

            const dropdownAvatar = document.getElementById('dropdownAvatar')
            dropdownAvatar.src = url
            dropdownAvatar.classList.remove('hidden')
            document.getElementById('dropdownInitials').classList.add('hidden')
        }


        document.getElementById('navBtnSkeleton').classList.add('hidden')
        document.getElementById('navNameSkeleton').classList.add('hidden')
        document.getElementById('navAvatarSkeleton').classList.add('hidden')
        document.getElementById('dropdownNameSkeleton').classList.add('hidden')
        document.getElementById('navName').classList.remove('hidden')
        document.getElementById('dropdownName').classList.remove('hidden')

    } catch (error) {
        console.error('Failed to load nav profile:', error)
    }
}


const loadJob = async () => {
    try {
        const res  = await fetch(`${apiUrl}/api/jobs/${jobId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()

        if (!res.ok) {
            showToast(json.message || 'Failed to load job.')
            return
        }

        const job = json.data
        renderJob(job)
        renderEmployer(job)

    } catch (error) {
        showToast('Something went wrong. Please try again.')
        console.error(error)
    }
}

document.getElementById('avatarBtn').addEventListener('click', (e) => {
    e.stopPropagation()
    document.getElementById('dropdown').classList.toggle('hidden')
    document.getElementById('chevron').classList.toggle('rotate-180')
})

document.addEventListener('click', () => {
    document.getElementById('dropdown').classList.add('hidden')
    document.getElementById('chevron').classList.remove('rotate-180')
})


document.getElementById('signOutBtn').addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '../Auth/login.html'
})


loadNavProfile()
loadJob()


const resumeInput      = document.getElementById('resumeInput')
const uploadPrompt     = document.getElementById('uploadPrompt')
const uploadSelected   = document.getElementById('uploadSelected')
const resumeFileName   = document.getElementById('resumeFileName')
const removeFileBtn    = document.getElementById('removeFileBtn')


const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '{}')
if (appliedJobs[jobId]) markAsApplied()

resumeInput.addEventListener('change', () => {
    const file = resumeInput.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
        showToast('Resume must be a PDF file.')
        resumeInput.value = ''
        return
    }
    if (file.size > 5 * 1024 * 1024) {
        showToast('Resume must be under 5MB.')
        resumeInput.value = ''
        return
    }

    resumeFileName.textContent = file.name
    uploadPrompt.classList.add('hidden')
    uploadSelected.classList.remove('hidden')
})


removeFileBtn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()  
    resumeInput.value = ''
    resumeFileName.textContent = ''
    uploadSelected.classList.add('hidden')
    uploadPrompt.classList.remove('hidden')
})


const markAsApplied = () => {
    const btn = document.getElementById('applyBtn')
    if (!btn) return
    btn.disabled  = true
    btn.className = 'w-full py-3.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-bold cursor-not-allowed flex items-center justify-center gap-2'
    btn.innerHTML = '<i class="fa-solid fa-circle-check text-green-400"></i> Applied'
}


document.getElementById('submitApplicationBtn').addEventListener('click', async () => {
    const file        = resumeInput.files[0]
    const coverLetter = document.getElementById('coverLetterInput').value.trim()
    const btn         = document.getElementById('submitApplicationBtn')

    if (!file) {
        showToast('Please upload your resume.')
        return
    }

    btn.disabled    = true
    btn.textContent = 'Submitting...'

    try {
        const formData = new FormData()
        formData.append('resume', file)
        if (coverLetter) formData.append('cover_letter', coverLetter)

        const res  = await fetch(`${apiUrl}/api/applications/job/${jobId}`, {
            method:  'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body:    formData
        })

        const json = await res.json()

        if (!res.ok) {
            showToast(json.message || 'Failed to submit application.')
            return
        }


        const applied = JSON.parse(localStorage.getItem('appliedJobs') || '{}')
        applied[jobId] = true
        localStorage.setItem('appliedJobs', JSON.stringify(applied))

        closeModal()
        showToast('Application submitted successfully!', 'success')
        markAsApplied()

    } catch (err) {
        showToast('Something went wrong. Please try again.')
        console.error(err)
    } finally {
        btn.disabled    = false
        btn.textContent = 'Submit Application'
    }
})