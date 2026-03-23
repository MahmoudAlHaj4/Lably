
const toggleNavDd = (e) => {
    e.stopPropagation()
    document.getElementById('nav-dropdown').classList.toggle('open')
    document.getElementById('nav-chevron').classList.toggle('rotate-180')
}

const openModal = (id) => {
    const el = document.getElementById(id)
    el.classList.remove('hidden', 'closing')
    el.classList.add('flex')
    el.querySelector('.modal-box').classList.remove('closing')
}

const closeModal = (id) => {
    const el  = document.getElementById(id)
    const box = el.querySelector('.modal-box')
    el.classList.add('closing')
    box.classList.add('closing')
    setTimeout(() => {
        el.classList.add('hidden')
        el.classList.remove('flex', 'closing')
        box.classList.remove('closing')
    }, 200)
}

const showJobsView = () => {
    document.getElementById('view-apps').classList.add('hidden')
    const jobsView = document.getElementById('view-jobs')
    jobsView.classList.remove('hidden')
    jobsView.classList.add('view-back')
    setTimeout(() => jobsView.classList.remove('view-back'), 300)
}

const showAppsView = () => {
    document.getElementById('view-jobs').classList.add('hidden')
    const appsView = document.getElementById('view-apps')
    appsView.classList.remove('hidden')
    appsView.classList.add('view-enter')
    setTimeout(() => appsView.classList.remove('view-enter'), 300)
}

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('open'))
    document.getElementById('nav-chevron')?.classList.remove('rotate-180')
})


document.getElementById('view-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal('view-modal')
})


document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    const { action, target } = btn.dataset
    if (action === 'toggle-nav')  toggleNavDd(e)
    if (action === 'close-modal') closeModal(target)
    if (action === 'back')        showJobsView()
})

document.getElementById('profile-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal('profile-modal')
})

 const sidebarToggle  = document.getElementById('sidebarToggle')
  const sidebar        = document.getElementById('sidebar')
  const sidebarOverlay = document.getElementById('sidebarOverlay')

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full')
    sidebarOverlay.classList.toggle('hidden')
  })

  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full')
    sidebarOverlay.classList.add('hidden')
  })

  document.querySelector('[data-action="toggle-nav"]').addEventListener('click', (e) => {
    e.stopPropagation()
    document.getElementById('nav-dropdown').classList.toggle('open')
    document.getElementById('nav-chevron').classList.toggle('rotate-180')
  })

  document.addEventListener('click', () => {
    document.getElementById('nav-dropdown').classList.remove('open')
    document.getElementById('nav-chevron').classList.remove('rotate-180')
  })