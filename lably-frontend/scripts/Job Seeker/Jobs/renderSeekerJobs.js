const showCurrentImage = (previewId, placeholderId, path, bucket) => {
    const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
    const placeholder = document.getElementById(placeholderId)
    const img = document.getElementById(previewId)
    if (placeholder) placeholder.classList.add('hidden')
    if (img) {
        img.src = url
        img.classList.remove('hidden')
    }
}


const renderProfile = (p) => {
    console.log('p is: ',p)
    const initials = p.full_name.split(' ').map(n => n[0]).join('').toUpperCase()


    setText('navInitials', initials)
    setText('navName', p.full_name)


    setText('dropdownInitials', initials)
    setText('dropdownName', p.full_name)


    setText('profileName', p.full_name)
    setText('profileLocationText', p.address || '—')

    setText('profileAbout', p.about || 'No about info yet.')

    setText('profile-phone', p.phone || '—')
    setText('profile-address', p.address || '—')

    if (p.profile_image_path) {
        showCurrentImage('profileAvatar', 'profileInitials', p.profile_image_path, 'avatars')
        showCurrentImage('navAvatar', 'navInitials', p.profile_image_path, 'avatars')
        showCurrentImage('dropdownAvatar', 'dropdownInitials', p.profile_image_path, 'avatars')
    }
}

const getJobTypeBadge = (jobType) => {
    const badges = {
        'remote':  { badge: 'bg-emerald-50 text-emerald-600' },
        'on_site': { badge: 'bg-blue-50 text-blue-500' },
        'hybrid':  { badge: 'bg-purple-50 text-purple-500' }
    }
    return badges[jobType] || { badge: 'bg-gray-100 text-gray-500' }
}

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const jobIcons = [
    { iconBg: 'bg-green-100', iconColor: 'text-[#16a34a]', icon: 'fa-tooth' },
    { iconBg: 'bg-teal-50', iconColor: 'text-teal-500', icon: 'fa-flask' },
    { iconBg: 'bg-orange-50', iconColor: 'text-orange-400', icon: 'fa-microscope' },
    { iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', icon: 'fa-laptop' },
    { iconBg: 'bg-blue-50', iconColor: 'text-blue-400', icon: 'fa-gear' },
    { iconBg: 'bg-purple-50', iconColor: 'text-purple-400', icon: 'fa-cube' },
    { iconBg: 'bg-rose-50', iconColor: 'text-rose-400', icon: 'fa-syringe' },
]

const getRandomIcon = () => jobIcons[Math.floor(Math.random() * jobIcons.length)]

const createCard = (job) => {
    const { badge } = getJobTypeBadge(job.job_type)
    const jobTypeLabel = job.job_type === 'on_site' ? 'On-Site' : job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)
    const date = formatDate(job.created_at)

    const { iconBg, iconColor, icon } = getRandomIcon()
    const iconHTML = job.logo_path
        ? `<img src="${CONFIG.supabaseUrl}/storage/v1/object/public/logos/${job.logo_path}" class="w-14 h-14 rounded-2xl object-cover" />`
        : `<div class="w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0">
               <i class="fa-solid ${icon} ${iconColor} text-xl"></i>
           </div>`

    return `
    <div class="bg-white rounded-2xl border border-gray-100 p-7 hover:border-green-200 hover:shadow-md transition-all duration-200">
        <div class="flex items-center gap-4 mb-5">
            ${iconHTML}
            <div>
                <h3 class="text-lg font-extrabold text-[#0D1B2A] leading-snug">${job.job_title}</h3>
                <p class="text-sm text-gray-400 font-semibold mt-0.5">${job.company_name}</p>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                <i class="fa-solid fa-location-dot text-gray-300 text-xs"></i> ${job.location}
            </span>
            <span class="px-3 py-1 ${badge} text-xs font-bold rounded-lg">${jobTypeLabel}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-400 font-medium mb-6">
            <i class="fa-regular fa-calendar text-gray-300"></i> ${date}
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
            <a href="./jobDetail.html?id=${job.id}" class="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-[#0D1B2A] hover:border-[#16a34a] hover:text-[#16a34a] transition no-underline">
                Apply Now
            </a>
        </div>
    </div>`
}

const displayJobs = (jobsList) => {
    const totalPages = Math.ceil(jobsList.length / JOBS_PER_PAGE)
    const start = (currentPage - 1) * JOBS_PER_PAGE
    const pageJobs = jobsList.slice(start, start + JOBS_PER_PAGE)

    jobCount.textContent = jobsList.length

    if (jobsList.length === 0) {
        jobsGrid.classList.add('hidden')
        pagination.classList.add('hidden')
        emptyState.classList.remove('hidden')
        return
    }

    emptyState.classList.add('hidden')
    jobsGrid.classList.remove('hidden')
    jobsGrid.className = isGridView
        ? 'grid grid-cols-1 xl:grid-cols-2 gap-5'
        : 'grid grid-cols-1 gap-5'

    jobsGrid.innerHTML = pageJobs.map(createCard).join('')

    if (totalPages > 1) {
        pagination.classList.remove('hidden')
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`
        prevBtn.disabled = currentPage === 1
        nextBtn.disabled = currentPage === totalPages
    } else {
        pagination.classList.add('hidden')
    }
}