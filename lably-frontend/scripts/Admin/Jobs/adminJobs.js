authGuard(['admin'])
const jobsTable = document.getElementById('jobsTable')
const deleteJobBtn = document.getElementById('delete-job-btn')
const token = localStorage.getItem('token')
let jobs = []
let currentJobId = null
const apiUrl = CONFIG.apiUrl

console.log('adminJobs.js loaded')
console.log(deleteJobBtn)

const getJobs = async () => {
    showLoading(jobsTable)
    try{
     const data = await getAllJobs(apiUrl, token)
     jobs= data.data
     displayJobs(jobs)
     console.log(data)
    }catch(error) {
        console.log(error)
    }
}

getJobs()

jobsTable.addEventListener('click' , (e) => {
    const btn = e.target.closest('[data-action="delete"]')
    if (!btn) return
    const { id} = btn.dataset
    currentJobId = id
    openDeleteJobModal(btn.dataset.title, btn.dataset.id)
})

deleteJobBtn.addEventListener('click', async () => {
    try {
        deleteJobBtn.disabled = true
        deleteJobBtn.textContent = 'Deleting...'
        await deleteAJob(apiUrl, token, currentJobId)
        document.querySelector(`tr[data-id="${currentJobId}"]`).remove()
        closeModal('deleteJobModal')
        showToast('Job deleted successfully', 'success')
    } catch (error) {
        deleteJobBtn.disabled = false
        deleteJobBtn.textContent = 'Yes, Delete'
        showToast(error.message)
    }
})

