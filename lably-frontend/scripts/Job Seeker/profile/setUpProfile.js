document.getElementById('tab-0').addEventListener('click', () => switchProfileTab(0))
document.getElementById('tab-1').addEventListener('click', () => switchProfileTab(1))
document.getElementById('tab-2').addEventListener('click', () => switchProfileTab(2))
document.getElementById('nextBtn').addEventListener('click', nextTab)
document.getElementById('prevBtn').addEventListener('click', prevTab)
document.getElementById('avatarInput').addEventListener('change', (e) => {
    previewImg(e, 'avatarPreview', 'avatarPlaceholder')
})
document.querySelectorAll('.richtext-btn').forEach(btn => {
    btn.addEventListener('click', () => execCmd(btn.dataset.cmd))
})


document.getElementById('addExpBtn').addEventListener('click', addExperience)
