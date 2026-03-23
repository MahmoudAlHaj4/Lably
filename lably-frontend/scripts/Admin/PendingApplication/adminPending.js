authGuard(['admin'])
const applicationsTable = document.getElementById('applicationsTable')
const rejectBtn = document.getElementById('reject-btn')
const approveBtn = document.getElementById('approve-btn')
const rejectReason = document.getElementById('rejectReason')
const approveReason = document.getElementById('approveReason')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const token = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl

let currentApplicantId = null
let currentApplicant = null
let applications = []
let currentPage = 1
let LIMIT = 10



const getData = async () => {
    showLoading(applicationsTable)
    try{
        const data = await getAllPendingApplication(apiUrl, token)
        applications = data.data
        displayApplications(getPageData(currentPage))
        updateButtons()
        updatePageLabel()

    }catch(error) {
        showToast(error.message)
    }
}

const getPageData  = (page) => {
    const start = (page -1) * LIMIT
    const end = start + LIMIT

    return applications.slice(start, end)
}

const nextPage = () => {
    const totalPages = Math.ceil(applications.length / LIMIT)
    if (currentPage === totalPages) return
    currentPage++
    displayApplications(getPageData(currentPage))
    updateButtons()
    updatePageLabel()
}

const prevPage = () => {
    if (currentPage === 1) return
    currentPage--
    displayApplications(getPageData(currentPage))
    updateButtons()
    updatePageLabel()

}

const totalPages =  Math.ceil(applications.length / LIMIT)

const updateButtons = () => {
    prevBtn.disabled = currentPage === 1
    nextBtn.disabled = currentPage === totalPages
}

const updatePageLabel = () => {
    document.getElementById('currentPageLabel').textContent = currentPage
    document.getElementById('totalPagesLabel').textContent = totalPages
}


getData()

applicationsTable.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return

    const { action, name, id } = btn.dataset

    if (action === 'approve') {
        currentApplicantId = id
        currentApplicant = applications.find(app => app.id === id)
        openApproveModal(name)
    }
    if (action === 'reject') {
        currentApplicantId = id
        currentApplicant = applications.find(app => app.id === id)
        openRejectModal(name)
    } 
        
   if (action === 'files') {
        const applicant = applications.find(app => app.id === id)
        openFilesModal(name, applicant.resume_path, applicant.portfolio_path)
    }
    if (action === 'notes') {
        const applicant = applications.find(app => app.id === id)
        openNotesModal(name, applicant.decision_notes)
    }
})

approveBtn.addEventListener('click', async () => {
    try {
        approveBtn.disabled = true
        approveBtn.textContent = 'Approving...'
        await approveApplication(apiUrl, token, currentApplicantId, approveReason.value)
        
        showToast('Success' , 'success')
        const row = applicationsTable.querySelector(`[data-id="${currentApplicantId}"]`)
        currentApplicant = { ...currentApplicant, application_status: 'approved' }
        applications = applications.map(app => app.id === currentApplicantId ? { ...app, application_status: 'approved', decision_notes: approveReason.value } : app)
        row.remove()
        createTableRow(currentApplicant)
        closeModal('approveModal')
    }catch(error){
        approveBtn.disabled = false
        approveBtn.textContent = 'Approve'
        showToast(error.message)
    }

    
})

rejectBtn.addEventListener('click', async () => {
    try{
        rejectBtn.disabled = true
        rejectBtn.textContent = 'Rejecting...'
        await rejectApplication(apiUrl, token, currentApplicantId, rejectReason.value)
        showToast('Success' , 'success')
        const updatedApp = { ...currentApplicant, application_status: 'rejected' }
        const row = applicationsTable.querySelector(`[data-id="${currentApplicantId}"]`)
        applications = applications.map(app => app.id === currentApplicantId ? { ...app, application_status: 'rejected', decision_notes: rejectReason.value } : app)
        row.remove()
        createTableRow(updatedApp)
        closeModal('rejectModal')
    }catch(error) {
        rejectBtn.disabled = false
        rejectBtn.textContent = 'Reject'
        console.log(error.message)
        showToast(error.message)
    }
    
})

nextBtn.addEventListener('click' , ()=>{
    nextPage()

})
prevBtn.addEventListener('click' , ()=>{
    prevPage()
    updateButtons()
})