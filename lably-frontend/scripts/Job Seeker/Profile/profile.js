const apiUrl = CONFIG.apiUrl
const token = localStorage.getItem('token')
let expToEdit = null
let expToDelete = null
let currentProfile = null


const expModal = {
    endDate: document.getElementById('expEndDate'),
    currentJob: document.getElementById('expCurrentJob'),
    saveBtn: document.getElementById('saveExpBtn'),
    title: document.getElementById('expModalTitle'),
    subtitle: document.getElementById('expModalSubtitle'),
}


const resetExpModal = () => {
    expToEdit = null
    expModal.title.textContent = 'Add Experience'
    expModal.subtitle.textContent = 'Add a new role to your profile'
    expModal.saveBtn.textContent = 'Save Experience'
    setVal('expJobTitle', '')
    setVal('expCompanyName', '')
    setVal('expStartDate', '')
    setVal('expEndDate', '')
    setVal('expDescription', '')
    expModal.currentJob.checked = false
    expModal.endDate.disabled = false
    expModal.endDate.style.opacity = '1'
}

const openEditExp = (exp) => {
    expToEdit = exp
    expModal.title.textContent = 'Edit Experience'
    expModal.subtitle.textContent = 'Update your role details'
    expModal.saveBtn.textContent = 'Update Experience'
    setVal('expJobTitle', exp.job_title || '')
    setVal('expCompanyName', exp.company_name || '')
    setVal('expStartDate', exp.start_date ? exp.start_date.slice(0, 10) : '')
    setVal('expEndDate', exp.end_date ? exp.end_date.slice(0, 10) : '')
    setVal('expDescription', exp.description || '')
    const isCurrent = !exp.end_date
    expModal.currentJob.checked = isCurrent
    expModal.endDate.disabled = isCurrent
    expModal.endDate.style.opacity = isCurrent ? '0.4' : '1'
    openModal('addExpModal')
}

const refreshExperiences = async () => {
    const experiences = await getExperiences(apiUrl, token)
    renderExperiences(
        experiences || [],
        (exp) => openEditExp(exp),
        (id) => { expToDelete = id; openModal('deleteExpModal') }
    )
}


const loadProfile = async () => {
    showSkeletons()
    const [profile, experiences] = await Promise.all([
        getJobSeekerProfile(apiUrl, token),
        getExperiences(apiUrl, token)
    ])
    if (profile) {
        currentProfile = profile
        renderProfile(profile)
        renderExperiences(
            experiences || [],
            (exp) => openEditExp(exp),
            (id) => { expToDelete = id; openModal('deleteExpModal') }
        )
        hideSkeletons()
    }
}

loadProfile()


document.getElementById('avatarWrapper').addEventListener('click', () => {
    document.getElementById('avatarInput').click()
})

document.getElementById('avatarInput').addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return
    document.getElementById('avatarSkeleton').classList.remove('hidden')
    const updated = await uploadAvatar(apiUrl, token, file)
    if (updated) {
        currentProfile = { ...currentProfile, ...updated }
        renderProfile(currentProfile)
    }
    document.getElementById('avatarSkeleton').classList.add('hidden')
})


document.getElementById('editProfileBtn').addEventListener('click', () => openProfileModal(currentProfile))
document.getElementById('editAboutBtn').addEventListener('click', () => openProfileModal(currentProfile))

document.getElementById('saveProfileBtn').addEventListener('click', async () => {
    const formData = new FormData()
    formData.append('phone', document.getElementById('modal-phone').value)
    formData.append('address', document.getElementById('modal-address').value)
    formData.append('about', document.getElementById('modal-about').value)

    const saveBtn = document.getElementById('saveProfileBtn')
    saveBtn.disabled = true
    saveBtn.textContent = 'Saving...'

    const updated = await updateJobSeekerProfile(apiUrl, token, formData)
    if (updated) {
        currentProfile = { ...currentProfile, ...updated }
        renderProfile(currentProfile)
        closeModal('profileModal')
        showToast('Profile updated', 'success')
    }

    saveBtn.disabled = false
    saveBtn.textContent = 'Save Changes'
})


document.getElementById('addExpBtn').addEventListener('click', () => {
    resetExpModal()
    openModal('addExpModal')
})

document.getElementById('closeExpModalBtn').addEventListener('click', () => {
    closeModal('addExpModal')
    resetExpModal()
})

document.getElementById('cancelExpBtn').addEventListener('click', () => {
    closeModal('addExpModal')
    resetExpModal()
})

expModal.currentJob.addEventListener('change', (e) => {
    expModal.endDate.disabled = e.target.checked
    expModal.endDate.style.opacity = e.target.checked ? '0.4' : '1'
    if (e.target.checked) setVal('expEndDate', '')
})

expModal.saveBtn.addEventListener('click', async () => {
    const jobTitle = getVal('expJobTitle')
    const companyName = getVal('expCompanyName')
    const startDate = getVal('expStartDate')

    if (!jobTitle) { markError(document.getElementById('expJobTitle')); showToast('Job title is required'); return }
    if (!companyName) { markError(document.getElementById('expCompanyName')); showToast('Company name is required'); return }
    if (!startDate) { markError(document.getElementById('expStartDate')); showToast('Start date is required'); return }

    const expData = {
        job_title: jobTitle,
        company_name: companyName,
        start_date: startDate,
        end_date: getVal('expEndDate') || null,
        description: getVal('expDescription') || null
    }

    expModal.saveBtn.disabled = true
    expModal.saveBtn.textContent = 'Saving...'

    if (expToEdit) {
        const updated = await updateExperience(apiUrl, token, expToEdit.id, expData)
        if (updated) {
            await refreshExperiences()
            closeModal('addExpModal')
            resetExpModal()
            showToast('Experience updated', 'success')
        }
    } else {
        const created = await createExperience(apiUrl, token, expData)
        if (created) {
            await refreshExperiences()
            closeModal('addExpModal')
            resetExpModal()
            showToast('Experience added', 'success')
        }
    }

    expModal.saveBtn.disabled = false
    expModal.saveBtn.textContent = expToEdit ? 'Update Experience' : 'Save Experience'
})

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (!expToDelete) return
    const success = await deleteExperience(apiUrl, token, expToDelete)
    if (success) {
        await refreshExperiences()
        showToast('Experience deleted', 'success')
    }
    closeModal('deleteExpModal')
    expToDelete = null
})

document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    closeModal('deleteExpModal')
    expToDelete = null
})