const showCurrentImage = (previewId, placeholderId, path, bucket) => {
    const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
    document.getElementById(placeholderId).classList.add('hidden')
    const img = document.getElementById(previewId)
    img.src = url
    img.classList.remove('hidden')
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

const expIcons = [
    { icon: 'fa-flask', bg: 'bg-teal-50', color: 'text-teal-500' },
    { icon: 'fa-tooth', bg: 'bg-blue-50', color: 'text-blue-400' },
    { icon: 'fa-microscope', bg: 'bg-purple-50', color: 'text-purple-400' },
    { icon: 'fa-briefcase', bg: 'bg-orange-50', color: 'text-orange-400' },
    { icon: 'fa-star', bg: 'bg-yellow-50', color: 'text-yellow-400' },
    { icon: 'fa-gear', bg: 'bg-gray-100', color: 'text-gray-400' },
]

const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const renderExperiences = (experiences, onEdit, onDelete) => {
    const list = document.getElementById('experienceList')

    if (!experiences || experiences.length === 0) {
        list.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 text-center">
                <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                    <i class="fa-solid fa-briefcase text-gray-300 text-lg"></i>
                </div>
                <p class="text-sm font-bold text-gray-400">No experience added yet</p>
                <p class="text-xs text-gray-300 font-medium mt-1">Click Add to get started</p>
            </div>
        `
        return
    }

    list.innerHTML = ''

    experiences.forEach((exp, index) => {
        const icon = expIcons[index % expIcons.length]
        const startDate = formatDate(exp.start_date)
        const endDate = exp.end_date ? formatDate(exp.end_date) : 'Present'

        const item = document.createElement('div')
        item.className = 'flex gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0'
        item.innerHTML = `
            <div class="w-11 h-11 rounded-xl ${icon.bg} flex items-center justify-center shrink-0">
                <i class="fa-solid ${icon.icon} ${icon.color}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <h3 class="text-base font-extrabold text-[#0D1B2A]">${exp.job_title}</h3>
                        <p class="text-sm text-gray-400 font-semibold mt-0.5">${exp.company_name}</p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button class="editExpBtn w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#16a34a] hover:text-[#16a34a] transition">
                            <i class="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button class="deleteExpBtn w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-200 hover:text-red-400 transition">
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
                <p class="text-xs text-gray-400 font-medium mt-2 mb-3">
                    <i class="fa-regular fa-calendar text-gray-300 mr-1"></i>
                    ${startDate} — ${endDate}
                </p>
                ${exp.description ? `<p class="text-sm text-gray-500 font-medium leading-relaxed">${exp.description}</p>` : ''}
            </div>
        `

        item.querySelector('.editExpBtn').addEventListener('click', () => onEdit(exp))
        item.querySelector('.deleteExpBtn').addEventListener('click', () => onDelete(exp.id))

        list.appendChild(item)
    })
}