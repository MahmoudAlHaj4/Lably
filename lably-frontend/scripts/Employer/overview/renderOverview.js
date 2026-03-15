const renderJobStats  = (jobs) => {
    setText('open-jobs',jobs.filter(j => j.status === 'active').length)
}
const renderApplicationStats = (apps) => {
    setText('total-app', apps.length)
}

const renderFilledJobs = (jobs) => {
    setText('filled-jobs' , jobs.filter(j => j.status === 'filled').length)
}

const renderCompanyName = (profile) => {
    setText('company-name', profile.company_name)
}

const displayRecentJobs = (jobs) => {
    const tbody = document.getElementById('jobs-table-body');
    const emptyDiv = document.getElementById('jobs-empty');
    tbody.innerHTML = '';
    document.getElementById('recent-applications-list').innerHTML = '';

    if (!jobs || jobs.length === 0) {
        emptyDiv?.classList.remove('hidden');
        return;
    }
    emptyDiv?.classList.add('hidden');
    jobs.slice(0, 5).forEach(job => createDashboardRow(job));
};

const statusBadge = {
    active: `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16a34a] bg-green-50 border border-green-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Active</span>`,
    filled: `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Filled</span>`,
    closed: `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-xmark text-[10px]"></i> Closed</span>`
}

const viewAppBtn = (job) => {
    if (job.status === 'closed') {
        return `<span class="px-3 py-1.5 text-xs font-semibold border border-[#E4E5E8] rounded-lg text-[#b0b7c3] cursor-not-allowed whitespace-nowrap">View Applications</span>`
    }
    return `<a href="./applications.html?job=${job.id}" class="px-3 py-1.5 text-xs font-semibold border border-[#E4E5E8] rounded-lg text-[#0D1B2A] hover:bg-[#F5F6F8] transition no-underline whitespace-nowrap">View Applications</a>`
}

const createDashboardRow = (job) => {
    const rowHtml = `
        <tr class="border-b border-[#F5F6F8] flex items-center justify-between p-[2px] data-id="${job.id}">
            <td class="px-6 py-4">
                <p class="text-sm font-semibold text-[#0D1B2A]">${job.job_title}</p>
                <p class="text-xs text-[#767F8C] mt-0.5">${job.job_type} &nbsp;·&nbsp; ${job.location ?? '—'}</p>
            </td>
            <td class="px-4 py-4">${statusBadge[job.status] ?? ''}</td>

            <td class="px-4 py-5 ">
                <div class="flex items-center gap-2 relative">
                    ${viewAppBtn(job)}


                </div>
            </td>
        </tr>`

    jobsTableBody.insertAdjacentHTML('beforeend', rowHtml)
}

const openEditModal = (id) => {
    const job = jobs.find(j => j.id === id)
    if (!job) return

    setVal('edit-job-title', job.job_title)
    setVal('edit-location',  job.location)
    setVal('edit-job-type',  job.job_type)
    setVal('edit-status',    job.status)

    document.getElementById('edit-modal').classList.remove('hidden')
    document.getElementById('saveEditBtn').dataset.id = id
}