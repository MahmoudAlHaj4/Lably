const getTypeBadge = (type) => {
    const t = (type || '').toLowerCase().replace('_', '-')
    if (t === 'remote')                     return `<span class="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">Remote</span>`
    if (t === 'on-site' || t === 'on_site') return `<span class="px-2.5 py-1 bg-blue-50 text-blue-500 text-xs font-bold rounded-lg">On-Site</span>`
    if (t === 'hybrid')                     return `<span class="px-2.5 py-1 bg-purple-50 text-purple-500 text-xs font-bold rounded-lg">Hybrid</span>`
    return `<span class="px-2.5 py-1 bg-gray-100 text-gray-400 text-xs font-bold rounded-lg">${type || '—'}</span>`
}

const getStatusBadge = (status) => {
    if (status === 'active') return `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16a34a] bg-green-50 border border-green-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Active</span>`
    if (status === 'filled') return `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Filled</span>`
    if (status === 'closed') return `<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-xmark text-[10px]"></i> Closed</span>`
    return ''
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const renderSkeletonRows = () => {
    const tbody = document.getElementById('jobs-table-body')
    tbody.innerHTML = Array(PAGE_SIZE).fill(`
        <tr class="border-b border-[#F5F6F8]">
            <td class="px-6 py-4">
                <div class="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="px-4 py-4"><div class="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div></td>
            <td class="px-4 py-4"><div class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div></td>
            <td class="px-4 py-4"><div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="px-4 py-4"><div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="px-4 py-4"><div class="h-8 w-28 bg-gray-200 rounded-lg animate-pulse"></div></td>
        </tr>
    `).join('')
}

const renderPagination = (totalJobs) => {
    const totalPages = Math.ceil(totalJobs / PAGE_SIZE)
    const bar        = document.getElementById('pagination-bar')
    const info       = document.getElementById('pagination-info')
    const controls   = document.getElementById('pagination-controls')

    if (totalPages <= 1) {
        bar.classList.add('hidden')
        bar.classList.remove('flex')
        return
    }

    bar.classList.remove('hidden')
    bar.classList.add('flex')

    const start = (currentPage - 1) * PAGE_SIZE + 1
    const end   = Math.min(currentPage * PAGE_SIZE, totalJobs)
    info.textContent = `Showing ${start}–${end} of ${totalJobs} jobs`

    const btnClass = (active) =>
        active
            ? 'w-8 h-8 rounded-lg bg-[#16a34a] text-white text-xs font-bold flex items-center justify-center'
            : 'w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition cursor-pointer'

    let html = `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}
            class="w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}">
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
        </button>`

    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goToPage(${i})" class="${btnClass(i === currentPage)}">${i}</button>`
    }

    html += `
        <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}
            class="w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}">
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </button>`

    controls.innerHTML = html
}

const renderJobs = (jobs) => {
    const tbody      = document.getElementById('jobs-table-body')
    const emptyState = document.getElementById('empty-state')

    if (jobs.length === 0) {
        tbody.innerHTML = ''
        emptyState.classList.remove('hidden')
        emptyState.classList.add('flex')
        document.getElementById('pagination-bar').classList.add('hidden')
        document.getElementById('pagination-bar').classList.remove('flex')
        return
    }

    emptyState.classList.add('hidden')
    emptyState.classList.remove('flex')

    const start    = (currentPage - 1) * PAGE_SIZE
    const end      = start + PAGE_SIZE
    const pageJobs = jobs.slice(start, end)

    tbody.innerHTML = pageJobs.map(job => `
        <tr class="border-b border-[#F5F6F8] hover:bg-[#fafafa] transition-colors">
            <td class="px-6 py-4">
                <p class="text-sm font-semibold text-[#0D1B2A]">${job.job_title}</p>
                <p class="text-xs text-[#767F8C] mt-0.5">${job.location ?? '—'}</p>
            </td>
            <td class="px-4 py-4">${getTypeBadge(job.job_type)}</td>
            <td class="px-4 py-4">${getStatusBadge(job.status)}</td>
            <td class="px-4 py-4"><span class="text-sm text-[#767F8C]">${formatDate(job.created_at)}</span></td>
            <td class="px-4 py-4">
                <span class="flex items-center gap-1.5 text-sm text-[#767F8C]">
                    <i class="fa-solid fa-user-group text-xs"></i> ${job.application_count || 0} Applications
                </span>
            </td>
            <td class="px-4 py-4">
                <div class="flex items-center gap-2 relative">
                    <a href="./applications.html?job=${job.id}" class="px-3 py-1.5 text-xs font-semibold border border-[#E4E5E8] rounded-lg text-[#0D1B2A] hover:bg-[#F5F6F8] transition no-underline whitespace-nowrap">
                        View Applications
                    </a>
                    <button onclick="toggleRowDd('rdd-${job.id}', event)" class="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E4E5E8] hover:bg-[#F5F6F8] text-[#767F8C] transition">
                        <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                    </button>
                    <div id="rdd-${job.id}" class="row-dropdown">
                        <div class="drop-item" onclick="editJob('${job.id}')"><i class="fa-regular fa-pen-to-square text-[#16a34a] w-4"></i> Edit Job</div>
                        <div class="drop-item red" onclick="deleteJob('${job.id}')"><i class="fa-regular fa-trash-can w-4"></i> Delete Job</div>
                    </div>
                </div>
            </td>
        </tr>
    `).join('')

    renderPagination(jobs.length)
}

const goToPage = (page) => {
    const totalPages = Math.ceil(allJobs.length / PAGE_SIZE)
    if (page < 1 || page > totalPages) return
    currentPage = page
    renderJobs(allJobs)
}

const toggleRowDd = (id, e) => {
    e.stopPropagation()
    document.querySelectorAll('.row-dropdown').forEach(d => {
        if (d.id !== id) d.classList.remove('open')
    })
    document.getElementById(id).classList.toggle('open')
}
document.addEventListener('click', () => {
    document.querySelectorAll('.row-dropdown').forEach(d => d.classList.remove('open'))
})