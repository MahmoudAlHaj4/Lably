const token   = localStorage.getItem('token')
const apiUrl  = CONFIG.apiUrl

let allJobs     = []
let currentPage = 1
const PAGE_SIZE = 5


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        currentPage = 1
        const status = btn.dataset.filter
        renderJobs(status === 'all' ? allJobs : allJobs.filter(j => j.status === status))
    })
})


document.getElementById('jobs-table-body').addEventListener('click', (e) => {
    const item = e.target.closest('[data-action]')
    if (!item) return
    const { action, id } = item.dataset
    if (action === 'edit')   editJob(id)
    if (action === 'delete') deleteJob(id)
})


const deleteJob = (jobId) => {
    document.getElementById('delete-job-id').value = jobId
    openModal('delete-modal')
}

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    const jobId = getVal('delete-job-id')
    const text  = document.getElementById('confirmDeleteBtnText')
    const btn   = document.getElementById('confirmDeleteBtn')

    text.textContent = 'Deleting...'
    btn.disabled     = true

    try {
        await deleteAJob(apiUrl, token, jobId)
        closeModal('delete-modal')
        showToast('Job deleted successfully', 'success')
        allJobs = allJobs.filter(j => j.id !== jobId)
        renderJobs(allJobs)
    } catch (error) {
        showToast('Something went wrong. Please try again.')
    } finally {
        text.textContent = 'Delete'
        btn.disabled     = false
    }
})


const editJob = (jobId) => {
    const job = allJobs.find(j => j.id === jobId)
    if (!job) return

    setVal('edit-job-title',       job.job_title   || '')
    setVal('edit-location',        job.location    || '')
    setSelect('edit-job-type',     job.job_type    || '')
    setSelect('edit-status',       job.status      || '')
    setRich('edit-job-description', job.description  || '')
    setRich('edit-requirements',    job.requirements || '')
    document.getElementById('saveEditBtn').dataset.id = jobId

    openModal('edit-modal')
}

document.getElementById('saveEditBtn').addEventListener('click', async () => {
    const jobId = document.getElementById('saveEditBtn').dataset.id
    const text  = document.getElementById('saveEditBtnText')
    const btn   = document.getElementById('saveEditBtn')

    text.textContent = 'Saving...'
    btn.disabled     = true

    const payload = {
        job_title:   getVal('edit-job-title'),
        location:    getVal('edit-location'),
        job_type:    getVal('edit-job-type'),
        status:      getVal('edit-status'),
        description:  getRich('edit-job-description'),
        requirements: getRich('edit-requirements'),
    }

    try {
        await updateJob(apiUrl, token, jobId, payload)
        closeModal('edit-modal')
        showToast('Job updated successfully', 'success')
        const idx = allJobs.findIndex(j => j.id === jobId)
        if (idx !== -1) allJobs[idx] = { ...allJobs[idx], ...payload }
        renderJobs(allJobs)
    } catch (error) {
        showToast('Something went wrong. Please try again.')
    } finally {
        text.textContent = 'Save Changes'
        btn.disabled     = false
    }
})


const loadJobs = async () => {
    renderSkeletonRows()
    try {
        allJobs = await getEmployerJobs(apiUrl, token) || []
        renderJobs(allJobs)
    } catch (error) {
        showToast('Something went wrong. Please try again.')
    }
}

loadJobs()