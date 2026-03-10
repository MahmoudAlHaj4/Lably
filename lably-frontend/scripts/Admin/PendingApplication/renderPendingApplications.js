const displayApplications = (applications) => {
    applicationsTable.innerHTML = ''
    applications.forEach(app => createTableRow(app))
}

const createTableRow = (app) => {
    const date = new Date(app.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const status = app.application_status
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

    const actionsHtml = status === 'pending' ? `
        <button class="flex items-center gap-1.5 text-xs font-semibold bg-[#16a34a] hover:bg-[#15803d] text-white px-3 py-1.5 rounded-lg transition" data-action="approve" data-id="${app.id}" data-name="${app.full_name}">
            <i class="fa-solid fa-check text-[10px]"></i> Approve
        </button>
        <button class="flex items-center gap-1.5 text-xs font-semibold border border-blue-200 text-[#2563eb] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition" data-action="reject" data-id="${app.id}" data-name="${app.full_name}">
            <i class="fa-solid fa-xmark text-[10px]"></i> Reject
        </button>
    ` : `
        <span class="text-xs text-[#b0b7c3] font-medium px-3 py-1.5 border border-[#E4E5E8] rounded-lg cursor-default">Decision Made</span>
    `

    const rowHtml = `
        <tr class="border-b border-[#F5F6F8]" data-status="${status}" data-id="${app.id}">
            <td class="px-6 py-4">
                <p class="text-sm font-semibold text-[#0D1B2A]">${app.full_name}</p>
                <p class="text-xs text-[#767F8C] mt-0.5">${app.address ?? '—'}</p>
            </td>
            <td class="px-4 py-4">
                <p class="text-xs text-[#0D1B2A]">${app.email}</p>
                <p class="text-xs text-[#767F8C] mt-0.5">${app.phone}</p>
            </td>
            <td class="px-4 py-4">
                <p class="text-xs text-[#0D1B2A]">${date}</p>
            </td>
            <td class="px-4 py-4">
                <span class="badge-${status} inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <i class="fa-solid fa-circle text-[8px]"></i>
                    ${statusLabel}
                </span>
            </td>
            <td class="px-4 py-4">
                <button class="flex items-center gap-1.5 text-xs font-semibold text-[#767F8C] hover:text-[#0D1B2A] border border-[#E4E5E8] px-2.5 py-1.5 rounded-lg hover:bg-[#F5F6F8] transition" data-action="files" data-id="${app.id}">
                    <i class="fa-regular fa-folder-open text-xs"></i> View Files
                </button>
            </td>
            <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                    <button class="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E4E5E8] hover:bg-[#F5F6F8] text-[#767F8C] transition" data-action="notes" data-id="${app.id}" data-name="${app.full_name}" title="Decision Notes">
                        <i class="fa-regular fa-note-sticky text-xs"></i>
                    </button>
                    ${actionsHtml}
                </div>
            </td>
        </tr>`

    applicationsTable.insertAdjacentHTML('beforeend', rowHtml)
}

const displayFiles = (resumePath, portfolioPath) => {
    const container = document.getElementById('filesContainer')
    container.innerHTML = ''
    const resumeUrl = `${CONFIG.supabaseUrl}/storage/v1/object/public/resumes/${resumePath}`

    const resumeHtml = `
        <div class="flex items-center justify-between p-4 bg-[#F5F6F8] border border-[#E4E5E8] rounded-xl">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="fa-regular fa-file-pdf text-[#2563eb] text-sm"></i>
                </div>
                <div>
                    <p class="text-sm font-semibold text-[#0D1B2A]">Resume / CV</p>
                    <p class="text-xs text-[#767F8C]">${resumePath}</p>
                </div>
            </div>
            <a href="${resumeUrl}" target="_blank" class="flex items-center gap-1.5 text-xs font-semibold text-[#16a34a] hover:underline">
                <i class="fa-solid fa-arrow-down text-[10px]"></i> Download
            </a>
        </div>
    `
    container.insertAdjacentHTML('beforeend', resumeHtml)
    container.insertAdjacentHTML('beforeend', `
        <p class="text-xs font-bold text-[#b0b7c3] tracking-[.1em] uppercase pt-1">Portfolio Files</p>
    `)
    const portfolio = JSON.parse(portfolioPath)

    portfolio.forEach(filePath => {
        const fileUrl = `${CONFIG.supabaseUrl}/storage/v1/object/public/portfolios/${filePath}`
        const isImage = filePath.match(/\.(jpg|jpeg|png)$/i)
        
        const fileHtml = `
            <div class="flex items-center justify-between p-3 bg-[#F5F6F8] border border-[#E4E5E8] rounded-xl">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 ${isImage ? 'bg-blue-50' : 'bg-blue-100'} rounded-lg flex items-center justify-center">
                        <i class="${isImage ? 'fa-regular fa-image text-blue-400' : 'fa-regular fa-file-pdf text-[#2563eb]'} text-sm"></i>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#0D1B2A]">${filePath}</p>
                    </div>
                </div>
                <a href="${fileUrl}" target="_blank" class="flex items-center gap-1.5 text-xs font-semibold text-[#16a34a] hover:underline">
                    <i class="fa-solid fa-arrow-down text-[10px]"></i> Download
                </a>
            </div>
        `
        container.insertAdjacentHTML('beforeend', fileHtml)
    })
}

