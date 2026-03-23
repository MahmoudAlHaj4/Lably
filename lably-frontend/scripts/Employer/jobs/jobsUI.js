function toggleNavDd(e) {
    e.stopPropagation();
    const dd = document.getElementById('nav-dropdown');
    const ch = document.getElementById('nav-chevron');
    dd.classList.toggle('open');
    ch.classList.toggle('rotate-180');
  }

document.addEventListener('click', () => {
    document.getElementById('nav-dropdown').classList.remove('open');
    document.getElementById('nav-chevron').classList.remove('rotate-180');
});

function toggleDd(id, e) {
    e.stopPropagation();
    document.querySelectorAll('.dropdown-menu').forEach(d => {
      if (d.id !== id) d.classList.remove('open');
    });
    document.getElementById(id).classList.toggle('open');
}

  
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('open'));
});

function openModal(id) {
    const el = document.getElementById(id);
    el.classList.remove('hidden');
    el.classList.add('flex');
    el.classList.remove('closing');
    el.querySelector('.modal-box').classList.remove('closing');
}

function closeModal(id) {
    const el = document.getElementById(id);
    const box = el.querySelector('.modal-box');
    el.classList.add('closing');
    box.classList.add('closing');
    setTimeout(() => {
      el.classList.add('hidden');
      el.classList.remove('flex', 'closing');
      box.classList.remove('closing');
    }, 200);
}

document.querySelector('[data-action="toggle-nav"]').addEventListener('click', toggleNavDd)


document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return

    const { action, target } = btn.dataset

    if (action === 'toggle-nav')   toggleNavDd(e)
    if (action === 'close-modal')  closeModal(target)
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