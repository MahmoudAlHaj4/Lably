authGuard(['job_seeker'])
const apiUrl = CONFIG.apiUrl
const token = localStorage.getItem('token')

const loadData = async () => {
    try {
        const [profile, jobsRes] = await Promise.all([
            getJobSeekerProfile(apiUrl, token),
            getSeekerJobs(apiUrl)
        ])

      if (profile) {
    renderProfile(profile)
        hideNavSkeleton()
    }

        if (jobsRes) {
            jobs = jobsRes.data
            filteredJobs = jobs
            hideSkeleton()
            displayJobs(filteredJobs)
        }

    } catch (error) {
        console.log(error)
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; displayJobs(filteredJobs); window.scrollTo({ top: 0, behavior: 'smooth' }) }
})
nextBtn.addEventListener('click', () => {
    const total = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
    if (currentPage < total) { currentPage++; displayJobs(filteredJobs); window.scrollTo({ top: 0, behavior: 'smooth' }) }
})

gridViewBtn.addEventListener('click', () => {
    isGridView = true
    gridViewBtn.className = 'w-10 h-10 rounded-xl bg-[#16a34a] text-white flex items-center justify-center'
    listViewBtn.className = 'w-10 h-10 rounded-xl border-2 border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition'
    displayJobs(filteredJobs)
})

listViewBtn.addEventListener('click', () => {
    isGridView = false
    listViewBtn.className = 'w-10 h-10 rounded-xl bg-[#16a34a] text-white flex items-center justify-center'
    gridViewBtn.className = 'w-10 h-10 rounded-xl border-2 border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#16a34a] hover:text-[#16a34a] transition'
    displayJobs(filteredJobs)
})
searchBtn.addEventListener('click', applyFilters)
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters() })
locationInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters() })
typeCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters))

clearFilters.addEventListener('click', () => {
    searchInput.value = ''
    locationInput.value = ''
    typeCheckboxes.forEach(cb => cb.checked = false)
    applyFilters()
})

loadData()