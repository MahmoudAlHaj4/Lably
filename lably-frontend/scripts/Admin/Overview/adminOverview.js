authGuard(['admin'])
const token = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl

const init = async () => {
    if (!token) {
        window.location.href = '/pages/auth/login.html'
        return
    }

    try {
        const [users, pending, jobs, applications] = await Promise.all([
            loadUserStats(apiUrl, token),
            loadPendingAppStats(apiUrl, token),
            loadJobsStats(apiUrl, token),
            loadApplicationStats(apiUrl, token)
        ])

        renderUserStats(users.data)
        renderPendingStats(pending.data)
        renderJobStats(jobs.data)
        renderApplicationStats(applications.data)
        renderRecentPending(pending.data.filter(a => a.application_status === 'pending').slice(0, 5))

    } catch (err) {
        console.error(err)
    }
}

init()