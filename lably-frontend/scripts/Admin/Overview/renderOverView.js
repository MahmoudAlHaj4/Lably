const renderUserStats = (users) => {
    document.getElementById('stat-total-users').textContent = users.length
    document.getElementById('stat-verified').textContent = users.filter(u => u.role === 'job_seeker' && u.is_active).length
    document.getElementById('stat-employers').textContent = users.filter(u => u.role === 'employer').length
}

const renderPendingStats = (list) => {
    document.getElementById('stat-pending').textContent = list.filter(a => a.application_status === 'pending').length
    document.getElementById('stat-rejected').textContent = list.filter(a => a.application_status === 'rejected').length
}

const renderJobStats = (jobs) => {
    document.getElementById('stat-jobs').textContent = jobs.filter(j => j.status === 'active').length
}

const renderApplicationStats = (apps) => {
    document.getElementById('stat-applications').textContent = apps.length
}

const renderRecentPending = (items) => {
    const container = document.getElementById('recentPendingList')
    if (!items.length) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 text-[#767F8C]">
                <i class="fa-regular fa-circle-check text-2xl mb-2 text-green-400"></i>
                <p class="text-sm font-medium">No pending applications</p>
                <p class="text-xs mt-0.5">All caught up!</p>
            </div>`
        return
    }
    container.innerHTML = items.map(app => {
        const date = new Date(app.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        const initials = app.full_name ? app.full_name.charAt(0).toUpperCase() : '?'
        return `
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F6F8] rounded-xl transition cursor-default">
            <div class="w-9 h-9 rounded-full bg-blue-100 text-[#2563eb] font-bold text-sm flex items-center justify-center shrink-0">
                ${initials}
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-[#0D1B2A] truncate">${app.full_name ?? '—'}</p>
                <p class="text-xs text-[#767F8C] truncate">${app.email}</p>
            </div>
            <span class="text-xs text-[#767F8C] shrink-0">${date}</span>
        </div>`
    }).join('')
}