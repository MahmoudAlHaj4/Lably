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

function watchAndTrim(containerId, emptyId, useRows) {
    const container = document.getElementById(containerId);
    const empty     = document.getElementById(emptyId);
    if (!container || !empty) return;

    function update() {
        const items = useRows
            ? Array.from(container.querySelectorAll('tr'))
            : Array.from(container.children).filter(el => !el.id.includes('empty'));

        if (items.length === 0) {
                empty.classList.remove('hidden');
                empty.classList.add('flex');
            } else {
                empty.classList.add('hidden');
                empty.classList.remove('flex');
                items.slice(3).forEach(el => el.remove());
            }
        }

        const observer = new MutationObserver(update);
        observer.observe(container, { childList: true, subtree: false });
        update(); 
    }

    watchAndTrim('jobs-table-body',          'jobs-empty', true);
    watchAndTrim('recent-applications-list', 'apps-empty', false);



