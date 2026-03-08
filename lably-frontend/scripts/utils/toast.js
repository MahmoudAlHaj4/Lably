function showToast(message, type = 'error') {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 16px 24px;
        font-size: 14px;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
        color: #ffffff;
        background: ${type === 'error' ? '#dc2626' : '#2da358'};
        z-index: 9999;
        opacity: 0;
        transform: translateX(12px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `
    document.body.appendChild(toast)

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1'
            toast.style.transform = 'translateX(0)'
        })
    })

    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateX(12px)'
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}