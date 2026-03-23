let currentTab = 0;
const totalTabs = 4;
const progresses = [25, 50, 75, 100];

function switchTab(index) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    for (let i = 0; i < totalTabs; i++) {
        document.getElementById('tab-' + i).className =
            'flex items-center gap-2 pb-3 text-sm font-medium tab-inactive transition-all whitespace-nowrap';
    }
    document.getElementById('panel-' + index).classList.add('active');
    document.getElementById('tab-' + index).className =
        'flex items-center gap-2 pb-3 text-sm font-medium tab-active transition-all whitespace-nowrap';
    currentTab = index;

    const pct = progresses[index];
    document.getElementById('progressBar').style.width   = pct + '%';
    document.getElementById('progressLabel').textContent = pct + '% Completed';
    document.getElementById('prevBtn').classList.toggle('hidden', index === 0);

    const isLast = index === totalTabs - 1;
    document.getElementById('btnText').textContent = isLast ? 'Save Profile' : 'Save & Next';
    document.getElementById('btnIcon').className   = isLast
        ? 'fa-solid fa-check text-xs'
        : 'fa-solid fa-arrow-right text-xs';
}

function nextTab() {
    if (currentTab < totalTabs - 1) {
        switchTab(currentTab + 1)
    } else {
        setUpProfile()
    }
}
function prevTab() {
    if (currentTab > 0) switchTab(currentTab - 1);
}

function showSuccess() {
    document.getElementById('setupForm').style.display = 'none';
    const s = document.getElementById('successScreen');
    s.style.display = 'flex';
    document.getElementById('progressBar').style.width   = '100%';
    document.getElementById('progressLabel').textContent = '100% Completed';
}

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


function toggleNavDd(e) {
    e.stopPropagation()
    document.getElementById('nav-dropdown').classList.toggle('open')
    document.getElementById('nav-chevron').classList.toggle('rotate-180')
}

document.addEventListener('click', () => {
    document.getElementById('nav-dropdown').classList.remove('open')
    document.getElementById('nav-chevron').classList.remove('rotate-180')
})

