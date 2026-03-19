function showToast(message, type = 'error') {
    const toast = document.createElement('div')
    toast.style.cssText = `
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-12px);
        display: flex;
        align-items: center;
        gap: 12px;
        background: white;
        border: 0.5px solid rgba(0,0,0,0.1);
        border-radius: 12px;
        padding: 14px 20px;
        width: 360px;
        max-width: calc(100vw - 48px);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    `

    const bar = document.createElement('div')
    bar.style.cssText = `
        width: 3px;
        height: 36px;
        border-radius: 2px;
        flex-shrink: 0;
        background: ${type === 'error' ? '#E24B4A' : '#16a34a'};
    `

    const icon = document.createElement('div')
    icon.style.cssText = `
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: ${type === 'error' ? '#FCEBEB' : '#16a34a'};
    `
    icon.innerHTML = type === 'error'
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${'#A32D2D'}" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${'#ffffff'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`

    const msg = document.createElement('span')
    msg.textContent = message
    msg.style.cssText = `font-size: 14px; color: #1a1a1a; flex: 1; font-family: 'DM Sans', sans-serif;`

    toast.appendChild(bar)
    toast.appendChild(icon)
    toast.appendChild(msg)
    document.body.appendChild(toast)

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1'
            toast.style.transform = 'translateX(-50%) translateY(0)'
        })
    })

    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateX(-50%) translateY(-12px)'
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}