const displayJobs = (jobs) => {
    jobsTable.innerHTML = ''
    jobs.forEach(job => createRow(job))
}
const typeLabel = { 'remote': 'Remote', 'on-site': 'On-site', 'hybrid': 'Hybrid' }
const typeColors = {
    'remote': 'bg-blue-50 text-blue-600',
    'on_site': 'bg-purple-50 text-purple-600',
    'hybrid': 'bg-orange-50 text-orange-500'
}

const createRow = (job) => {
    const status = job.status
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

    const rowHtml = `
    <tr class="border-b border-[#F5F6F8]" data-status="${status}" data-id="${job.id}">
        <td class="px-6 py-4">
            <p class="text-sm font-semibold text-[#0D1B2A]">${job.job_title}</p>
            <p class="text-xs text-[#767F8C] mt-0.5 line-clamp-1 max-w-xs">${job.description ?? '—'}</p>
        </td>
        <td class="px-4 py-4">
            <p class="text-xs text-[#0D1B2A]">${job.location ?? '—'}</p>
        </td>
        <td class="px-4 py-4">
            <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[job.job_type] ?? 'bg-[#F5F6F8] text-[#767F8C]'}">
                ${typeLabel[job.job_type] ?? job.job_type}
            </span>
        </td>
        <td class="px-4 py-4">
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full badge-${status}">
                <i class="fa-solid fa-circle text-[8px]"></i>
                ${statusLabel}
            </span>
        </td>
        <td class="px-4 py-4">
            <button class="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 hover:bg-red-50 text-red-400 hover:text-red-500 transition"
                data-action="delete" data-id="${job.id}" data-title="${job.job_title}" title="Delete Job">
                <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
        </td>
    </tr>`

    jobsTable.insertAdjacentHTML('beforeend', rowHtml)
}