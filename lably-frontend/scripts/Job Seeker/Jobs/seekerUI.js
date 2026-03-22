const JOBS_PER_PAGE = 6
let currentPage = 1
let filteredJobs = []
let isGridView = true

const skeletonGrid   = document.getElementById('skeletonGrid')
const jobsGrid       = document.getElementById('jobsGrid')
const emptyState     = document.getElementById('emptyState')
const pagination     = document.getElementById('pagination')
const jobCount       = document.getElementById('jobCount')
const prevBtn        = document.getElementById('prevBtn')
const nextBtn        = document.getElementById('nextBtn')
const pageInfo       = document.getElementById('pageInfo')
const gridViewBtn    = document.getElementById('gridViewBtn')
const listViewBtn    = document.getElementById('listViewBtn')
const searchInput    = document.getElementById('searchInput')
const locationInput  = document.getElementById('locationInput')
const searchBtn      = document.getElementById('searchBtn')
const clearFilters   = document.getElementById('clearFilters')
const typeCheckboxes = document.querySelectorAll('.job-type-filter')

// ── Skeleton ──────────────────────────────────────────────────────────────────
const showSkeleton = () => {
    skeletonGrid.classList.remove('hidden')
    jobsGrid.classList.add('hidden')
    emptyState.classList.add('hidden')
    pagination.classList.add('hidden')
}

const hideSkeleton = () => {
    skeletonGrid.classList.add('hidden')
}

const hideNavSkeleton = () => {
    document.getElementById('navBtnSkeleton').classList.add('hidden')
    document.getElementById('navNameSkeleton').classList.add('hidden')
    document.getElementById('navAvatarSkeleton').classList.add('hidden')
    document.getElementById('dropdownNameSkeleton').classList.add('hidden')
    document.getElementById('navName').classList.remove('hidden')
    document.getElementById('dropdownName').classList.remove('hidden')
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
document.getElementById('avatarBtn').addEventListener('click', (e) => {
    e.stopPropagation()
    document.getElementById('dropdown').classList.toggle('hidden')
    document.getElementById('chevron').classList.toggle('rotate-180')
})

document.addEventListener('click', () => {
    document.getElementById('dropdown').classList.add('hidden')
    document.getElementById('chevron').classList.remove('rotate-180')
})

// ── Filter ────────────────────────────────────────────────────────────────────
const applyFilters = () => {
    const keyword  = searchInput.value.trim().toLowerCase()
    const location = locationInput.value.trim().toLowerCase()
    const checked  = [...typeCheckboxes].filter(c => c.checked).map(c => c.value)

    filteredJobs = jobs.filter(job => {
        const matchesKeyword  = !keyword  || job.job_title.toLowerCase().includes(keyword)
        const matchesLocation = !location || job.location.toLowerCase().includes(location)
        const matchesType     = checked.length === 0 || checked.includes(job.job_type)
        return matchesKeyword && matchesLocation && matchesType
    })

    currentPage = 1
    displayJobs(filteredJobs)
}