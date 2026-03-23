authGuard(['employer'])
const token   = localStorage.getItem('token')
const apiUrl  = CONFIG.apiUrl

let allJobs         = []
let allApplications = []
let currentJobApps  = []
let currentPage     = 1
const PAGE_SIZE     = 8


document.getElementById('jobs-grid').addEventListener('click', (e) => {
    const card = e.target.closest('[data-action="show-apps"]')
    if (!card) return
    openAppsView(card.dataset.id)
})

document.getElementById('applications-table-body').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="view-app"]')
    if (!btn) return
    viewApplication(btn.dataset.id)
})

document.getElementById('pagination-controls').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="go-page"]')
    if (!btn || btn.disabled) return
    const page = parseInt(btn.dataset.page)
    const total = Math.ceil(currentJobApps.length / PAGE_SIZE)
    if (page < 1 || page > total) return
    currentPage = page
    renderApplicationsTable(currentJobApps, currentPage)
})


const viewApplication = (appId) => {
    const app = allApplications.find(a => a.id === appId)
    if (!app) return

    setText('modal-initials',    getInitials(app.full_name))
    setText('modal-name',        app.full_name   || '—')
    setText('modal-job',         app.job_title   || '—')
    setText('modal-date',        formatDate(app.applied_at))
    setText('modal-cover-letter', app.cover_letter || 'No cover letter provided.')
    setText('modal-resume-name', app.resume_path ? app.resume_path.split('/').pop() : 'resume.pdf')

    document.getElementById('modal-resume-link').href  = app.resume_path ? `${apiUrl}/uploads/resumes/${app.resume_path}` : '#'
    document.getElementById('modal-profile-link').href = `./candidate-profile.html?id=${app.job_seeker_id}`

    openModal('view-modal')
}

const openAppsView = (jobId) => {
    const job = allJobs.find(j => j.id === jobId)
    if (!job) return

    setText('apps-job-title', job.job_title)
    currentJobApps = allApplications.filter(a => a.job_id === jobId)
    currentPage    = 1

    renderAppsSkeleton()
    showAppsView()
    renderApplicationsTable(currentJobApps, currentPage)
}

document.getElementById('applications-table-body').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="view-profile"]')
    if (!btn) return
    viewProfile(btn.dataset.seekerId)
})

const viewProfile = async (seekerId) => {
    // reset state
    document.getElementById('profile-modal-loading').classList.remove('hidden')
    document.getElementById('profile-modal-loading').classList.add('flex')
    document.getElementById('profile-modal-error').classList.add('hidden')
    document.getElementById('profile-modal-error').classList.remove('flex')
    document.getElementById('profile-modal-content').classList.add('hidden')

    openModal('profile-modal')

    const profile = await getCandidateProfile(apiUrl, token, seekerId)

    document.getElementById('profile-modal-loading').classList.add('hidden')
    document.getElementById('profile-modal-loading').classList.remove('flex')

    if (!profile) {
        document.getElementById('profile-modal-error').classList.remove('hidden')
        document.getElementById('profile-modal-error').classList.add('flex')
        return
    }

    // Avatar — image or initials
    const avatarWrap = document.getElementById('profile-avatar-wrap')
    if (profile.profile_image_path) {
        avatarWrap.innerHTML = `<img src="${apiUrl}/uploads/avatars/${profile.profile_image_path}" class="w-full h-full object-cover" alt="avatar">`
    } else {
        avatarWrap.innerHTML = `<span class="text-xl font-extrabold text-[#16a34a]">${getInitials(profile.full_name)}</span>`
    }

    setText('profile-name',        profile.full_name || '—')
    setText('profile-address',     profile.address   || '')
    setText('profile-phone',       profile.phone     || '—')
    setText('profile-address-val', profile.address   || '—')

    // About section
    const aboutWrap = document.getElementById('profile-about-wrap')
    if (profile.about) {
        document.getElementById('profile-about').textContent = profile.about
        aboutWrap.classList.remove('hidden')
    } else {
        aboutWrap.classList.add('hidden')
    }

    document.getElementById('profile-modal-content').classList.remove('hidden')
}

const loadData = async () => {
    renderJobsSkeleton()
    try {
        const [jobs, apps, profile] = await Promise.all([
            getEmployerJobs(apiUrl, token),
            getEmployerApplications(apiUrl, token),
            getprofile(apiUrl, token)
        ])

        allJobs         = jobs || []
        allApplications = apps || []

        renderJobsGrid(allJobs, allApplications)
        renderNav(profile)

        const jobParam = new URLSearchParams(window.location.search).get('job')
        if (jobParam) openAppsView(jobParam)

    } catch (err) {
        showToast('Something went wrong. Please try again.')
    }
}

loadData()
