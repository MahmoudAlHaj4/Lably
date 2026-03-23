const formatJobType = (type) => {
    if (!type) return '—'
    const map = {
        'on_site':  'On-Site',
        'on-site':  'On-Site',
        'remote':   'Remote',
        'hybrid':   'Hybrid'
    }
    return map[type.toLowerCase()] || type
}

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day:   'numeric',
        year:  'numeric'
    })
}

const formatStatus = (status) => {
    if (!status) return ''
    return status.charAt(0).toUpperCase() + status.slice(1)
}

const renderJob = (job) => {
    setText('job-title',        job.job_title   || '—')
    setText('job-status',       formatStatus(job.status))
    setText('job-company-name', job.company_name || '')
    setText('job-location',     job.location    || 'Not specified')
    setText('job-type',         formatJobType(job.job_type))
    setText('job-posted-at',    formatDate(job.created_at))


    const descEl = document.getElementById('job-description')
    if (descEl) {
        const lines = (job.description || '').split('\n').filter(l => l.trim())
        descEl.innerHTML = lines.length
            ? lines.map(l => `<p>${l}</p>`).join('')
            : '<p class="text-gray-400">No description provided.</p>'
    }


    const reqEl = document.getElementById('job-requirements')
    if (reqEl) {
        const lines = (job.requirements || '').split('\n').filter(l => l.trim())
        reqEl.innerHTML = lines.length
            ? lines.map(l => `
                <li class="flex items-start gap-3 text-sm text-gray-500 font-medium">
                    <span class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-check text-[#16a34a] text-[10px]"></i>
                    </span>
                    ${l}
                </li>`).join('')
            : '<li class="text-sm text-gray-400">No requirements listed.</li>'
    }


    setText('summary-job-type',  formatJobType(job.job_type))
    setText('summary-location',  job.location || 'Not specified')
    setText('summary-posted-at', formatDate(job.created_at))
    setText('summary-status',    formatStatus(job.status))


    setText('modal-job-subtitle', job.job_title || '')

    document.getElementById('jobSkeleton').classList.add('hidden')
document.getElementById('jobContent').classList.remove('hidden')
document.getElementById('summarySkeleton').classList.add('hidden')
document.getElementById('summaryContent').classList.remove('hidden')
}

const renderEmployer = (job) => {
    if (!job) return

    setText('employer-name',        job.company_name        || '—')
    setText('employer-location',    job.employer_location   || '')

    const websiteLink = document.getElementById('employer-website')
    const websiteText = document.getElementById('employer-website-text')
    if (job.website) {
        websiteText.textContent = job.website
        websiteLink.href        = job.website.startsWith('http')
            ? job.website
            : `https://${job.website}`
        websiteLink.classList.remove('hidden')
    } else {
        websiteLink.classList.add('hidden')
    }

    const logoWrap = document.getElementById('employer-logo')
    if (job.logo_path && logoWrap) {
        const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/logos/${job.logo_path}`
        logoWrap.innerHTML = `<img src="${url}" class="w-full h-full object-cover rounded-xl" alt="${job.company_name}"/>`
    }

    const jobTitle = document.getElementById('job-title')?.textContent || ''
    setText('modal-job-subtitle', `${jobTitle} · ${job.company_name || ''}`)

    document.getElementById('employerSkeleton').classList.add('hidden')
document.getElementById('employerContent').classList.remove('hidden')
}