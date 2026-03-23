authGuard(['employer'])

const jobsTableBody  = document.getElementById('jobs-table-body')
const saveBtn = document.getElementById('saveEditBtn')
const token  = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl
let jobs = []
let jobId = null

const loadState = async () => {
    try{
        const[jobsData, applications , name] = await Promise.all([
            getEmployerJobs(apiUrl, token),
            getEmployerApplications(apiUrl, token),
            getprofile(apiUrl, token)
        ])
        jobs = jobsData
        renderJobStats(jobs)
        renderApplicationStats(applications)
        renderFilledJobs(jobs)
        renderCompanyName(name)
        displayRecentJobs(jobs)
        renderNav(name)
    }catch(error) {
        console.log(error)
        clearAllSkeletons()
    }
}

loadState()


function clearAllSkeletons() {
    document.getElementById('open-jobs') && (document.getElementById('open-jobs').innerHTML = '');
    document.getElementById('total-app') && (document.getElementById('total-app').innerHTML = '');
    document.getElementById('filled-jobs') && (document.getElementById('filled-jobs').innerHTML = '');
    document.getElementById('company-name') && (document.getElementById('company-name').innerHTML = '');
    document.getElementById('jobs-table-body') && (document.getElementById('jobs-table-body').innerHTML = '');
    document.getElementById('recent-applications-list') && (document.getElementById('recent-applications-list').innerHTML = '');
}
