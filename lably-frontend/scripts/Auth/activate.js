const param = new URLSearchParams(window.location.search)
const token = param.get('token')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')
const activateBtn = document.getElementById('submit-btn')

const apiUrl = CONFIG.apiUrl


if (!token) {
    document.getElementById('form-state').style.display = 'none'
    document.getElementById('error-state').style.display = 'block'
}


function toggleVisibility(inputId, iconId) {
    const input = document.getElementById(inputId)
    const icon = document.getElementById(iconId)
    if (input.type === 'password') {
        input.type = 'text'
        icon.classList.replace('fa-eye', 'fa-eye-slash')
    } else {
        input.type = 'password'
        icon.classList.replace('fa-eye-slash', 'fa-eye')
    }
}


function checkStrength(val) {
    const bars = [
        document.getElementById('bar1'),
        document.getElementById('bar2'),
        document.getElementById('bar3'),
        document.getElementById('bar4')
    ]
    const label = document.getElementById('strength-label')

    let score = 0
    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++

    const colors = ['#ef4444', '#f97316', '#eab308', '#16a34a']
    const labels = ['Too weak', 'Could be stronger', 'Getting there!', 'Strong password ✓']

    bars.forEach((bar, i) => {
        if (i < score) {
            bar.style.width = '100%'
            bar.style.backgroundColor = colors[score - 1]
        } else {
            bar.style.width = '0%'
        }
    })

    if (val.length === 0) {
        label.textContent = 'Use 8+ characters with letters, numbers & symbols'
        label.style.color = '#b0b7c3'
    } else {
        label.textContent = labels[score - 1] || 'Too weak'
        label.style.color = colors[score - 1] || '#ef4444'
    }

    checkMatch()
}


function checkMatch() {
    const pw = password.value
    const cpw = confirmPassword.value
    const msg = document.getElementById('match-msg')

    if (cpw.length === 0) {
        msg.classList.add('hidden')
        confirmPassword.classList.remove('error')
        return
    }

    if (pw === cpw) {
        msg.textContent = '✓ Passwords match'
        msg.style.color = '#16a34a'
        msg.classList.remove('hidden')
        confirmPassword.classList.remove('error')
    } else {
        msg.textContent = 'Passwords do not match'
        msg.style.color = '#ef4444'
        msg.classList.remove('hidden')
        confirmPassword.classList.add('error')
    }
}


const activateAccount = async () => {

  
    if (!password.value) {
        password.classList.add('error')
        showToast('Please enter a password.')
        return
    }
    if (password.value.length < 8) {
        password.classList.add('error')
        showToast('Password must be at least 8 characters.')
        return
    }
    if (!confirmPassword.value) {
        confirmPassword.classList.add('error')
        showToast('Please confirm your password.')
        return
    }
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('error')
        showToast('Passwords do not match.')
        return
    }

    password.classList.remove('error')
    confirmPassword.classList.remove('error')

    activateBtn.disabled = true
    activateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-sm"></i> Activating...'

    try {
        console.log('activate start')
        const response = await fetch(`${apiUrl}/api/auth/activate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token,
                password: password.value
            })
        })

        const data = await response.json()

        if (response.ok) {
            showToast('Account activated successfully!', 'success')
            setTimeout(() => {
                window.location.href = '../Auth/login.html'
            }, 1500)
        } else {
            if (response.status === 400 || response.status === 404) {
                document.getElementById('form-state').style.display = 'none'
                document.getElementById('error-state').style.display = 'block'
            } else {
                showToast(data.message || 'Something went wrong. Please try again.')
                activateBtn.disabled = false
                activateBtn.innerHTML = '<i class="fa-solid fa-check text-sm"></i> Activate Account'
            }
        }
    } catch (error) {
        console.log(error)
        showToast('Could not connect to the server. Please try again.')
        activateBtn.disabled = false
        activateBtn.innerHTML = '<i class="fa-solid fa-check text-sm"></i> Activate Account'
    }
}


activateBtn.addEventListener('click', () => {
    activateAccount()
})

password.addEventListener('input', () => {
    checkStrength(password.value)
})