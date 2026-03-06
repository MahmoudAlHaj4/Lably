const tabBtns = document.querySelectorAll('.tab-btn')
const panels = {
    login:    document.getElementById('panel-login'),
    register: document.getElementById('panel-register')
}

function setActiveTab(id) {
    tabBtns.forEach(btn => {
        const active = btn.dataset.tab === id;
        btn.classList.toggle('bg-white',       active);
        btn.classList.toggle('text-[#0D1B2A]', active);
        btn.classList.toggle('shadow-sm',      active);
        btn.classList.toggle('text-[#767F8C]', !active);
    });
    Object.keys(panels).forEach(k => {
        panels[k].classList.toggle('hidden', k !== id);
    });
}

tabBtns.forEach(btn => btn.addEventListener('click', () => setActiveTab(btn.dataset.tab)));

document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
        const inp = document.getElementById(btn.dataset.for);
        const show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        btn.querySelector('i').className = show ? 'fa-regular fa-eye-slash text-sm' : 'fa-regular fa-eye text-sm';
    });
});

const urlTab = new URLSearchParams(location.search).get('tab');
setActiveTab(urlTab === 'register' ? 'register' : 'login');