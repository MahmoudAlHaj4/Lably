const formatDate  = (str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

const getTypeBadge = (type) => {
    const t = (type || '').toLowerCase().replace('_', '-')
    if (t === 'remote')                     return `<span class="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">Remote</span>`
    if (t === 'on-site' || t === 'on_site') return `<span class="px-2.5 py-1 bg-blue-50 text-blue-500 text-xs font-bold rounded-lg">On-Site</span>`
    if (t === 'hybrid')                     return `<span class="px-2.5 py-1 bg-purple-50 text-purple-500 text-xs font-bold rounded-lg">Hybrid</span>`
    return ''
}

const getStatusBadge = (status) => {
    if (status === 'active') return `<span class="inline-flex items-center gap-1 text-xs font-semibold text-[#16a34a] bg-green-50 border border-green-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Active</span>`
    if (status === 'filled') return `<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check text-[10px]"></i> Filled</span>`
    if (status === 'closed') return `<span class="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-xmark text-[10px]"></i> Closed</span>`
    return ''
}


const renderJobsSkeleton = () => {
    const grid = document.getElementById('jobs-grid')
    grid.innerHTML = Array(6).fill(`
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-xl animate-pulse"></div>
                <div class="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
            <div class="h-4 w-3/4 bg-gray-100 rounded animate-pulse mb-2"></div>
            <div class="h-3 w-1/2 bg-gray-100 rounded animate-pulse mb-4"></div>
            <div class="pt-4 border-t border-gray-50">
                <div class="h-3 w-1/3 bg-gray-100 rounded animate-pulse"></div>
            </div>
        </div>
    `).join('')
}

const renderAppsSkeleton = () => {
    const tbody = document.getElementById('applications-table-body')
    tbody.innerHTML = Array(PAGE_SIZE).fill(`
        <tr class="border-b border-gray-50">
            <td class="px-7 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-gray-100 animate-pulse shrink-0"></div>
                    <div>
                        <div class="h-4 w-32 bg-gray-100 rounded animate-pulse mb-1.5"></div>
                        <div class="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-4"><div class="h-4 w-24 bg-gray-100 rounded animate-pulse"></div></td>
            <td class="px-4 py-4"><div class="h-8 w-16 bg-gray-100 rounded-xl animate-pulse"></div></td>
        </tr>
    `).join('')
}


const renderJobsGrid = (allJobs, allApplications) => {
    const grid  = document.getElementById('jobs-grid')
    const empty = document.getElementById('jobs-empty')

    if (allJobs.length === 0) {
        grid.innerHTML = ''
        empty.classList.remove('hidden')
        empty.classList.add('flex')
        return
    }

    empty.classList.add('hidden')
    empty.classList.remove('flex')

    grid.innerHTML = allJobs.map(job => {
        const count = allApplications.filter(a => a.job_id === job.id).length
        return `
            <div data-action="show-apps" data-id="${job.id}"
                 class="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-green-200 hover:shadow-md transition-all duration-200 group">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                        <i class="fa-regular fa-briefcase text-[#16a34a]"></i>
                    </div>
                    ${getStatusBadge(job.status)}
                </div>
                <h3 class="text-base font-extrabold text-[#0D1B2A] mb-1 group-hover:text-[#16a34a] transition">${job.job_title}</h3>
                <p class="text-xs text-gray-400 font-medium mb-4">${job.location ?? '—'} · ${getTypeBadge(job.job_type)}</p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span class="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                        <i class="fa-solid fa-user-group text-xs"></i>
                        <span class="font-bold text-[#0D1B2A]">${count}</span> Application${count !== 1 ? 's' : ''}
                    </span>
                    <span class="text-xs font-bold text-[#16a34a] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        View <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </span>
                </div>
            </div>`
    }).join('')
}


const renderApplicationsTable = (currentJobApps, currentPage) => {
    const tbody = document.getElementById('applications-table-body')
    const empty = document.getElementById('apps-empty')
    const bar   = document.getElementById('pagination-bar')

    if (currentJobApps.length === 0) {
        tbody.innerHTML = ''
        empty.classList.remove('hidden')
        empty.classList.add('flex')
        bar.classList.add('hidden')
        bar.classList.remove('flex')
        return
    }

    empty.classList.add('hidden')
    empty.classList.remove('flex')

    const start = (currentPage - 1) * PAGE_SIZE
    const page  = currentJobApps.slice(start, start + PAGE_SIZE)

    tbody.innerHTML = page.map(app => `
        <tr class="border-b border-gray-50 hover:bg-gray-50/40 transition">
            <td class="px-7 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <span class="text-xs font-extrabold text-[#16a34a]">${getInitials(app.full_name)}</span>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#0D1B2A]">${app.full_name || '—'}</p>
                    </div>
                </div>
            </td>
            <td class="px-4 py-4">
                <span class="text-sm text-gray-400 font-medium">${formatDate(app.applied_at)}</span>
            </td>
            <td class="px-4 py-4">
                ${app.cover_letter
                    ? `<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-check text-[10px]"></i> Yes</span>`
                    : `<span class="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-xmark text-[10px]"></i> No</span>`
                }
            </td>
            <td class="px-4 py-4">
                ${app.resume_path
                    ? `<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-check text-[10px]"></i> Yes</span>`
                    : `<span class="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"><i class="fa-solid fa-xmark text-[10px]"></i> No</span>`
                }
            </td>
            <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                    <button data-action="view-app" data-id="${app.id}"
                            class="px-4 py-2 rounded-xl border-2 border-gray-200 text-xs font-bold text-[#0D1B2A] hover:border-[#16a34a] hover:text-[#16a34a] transition">
                        View
                    </button>
                    <button data-action="view-profile" data-seeker-id="${app.job_seeker_id}" data-resume="${app.resume_path || ''}"
                            class="px-4 py-2 rounded-xl bg-[#16a34a] text-xs font-bold text-white hover:bg-[#15803d] transition">
                        View Profile
                    </button>
                </div>
            </td>
        </tr>
    `).join('')

    renderPagination(currentJobApps.length, currentPage)
}

// ── Pagination ──
const renderPagination = (total, currentPage) => {
    const totalPages = Math.ceil(total / PAGE_SIZE)
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
    const end   = Math.min(currentPage * PAGE_SIZE, total)
    info.textContent = `Showing ${start}–${end} of ${total} applications`

    const btnCls = (active) => active
        ? 'w-8 h-8 rounded-lg bg-[#16a34a] text-white text-xs font-bold flex items-center justify-center'
        : 'w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition cursor-pointer'

    let html = `
        <button data-action="go-page" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}
            class="w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:border-[#16a34a] hover:text-[#16a34a] transition cursor-pointer'}">
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
        </button>`

    for (let i = 1; i <= totalPages; i++) {
        html += `<button data-action="go-page" data-page="${i}" class="${btnCls(i === currentPage)}">${i}</button>`
    }

    html += `
        <button data-action="go-page" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}
            class="w-8 h-8 rounded-lg border-2 border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:border-[#16a34a] hover:text-[#16a34a] transition cursor-pointer'}">
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </button>`

    controls.innerHTML = html
}