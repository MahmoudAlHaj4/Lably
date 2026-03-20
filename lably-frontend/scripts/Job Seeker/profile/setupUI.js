let currentTab = 0
const totalTabs = 3
const progressSteps = [33, 66, 100]

function switchProfileTab (newIndex) {
    document.getElementById(`tab-${currentTab}`).className = 'flex items-center gap-2 pb-3 text-sm font-bold tab-inactive transition-all whitespace-nowrap'
    document.getElementById(`panel-${currentTab}`).classList.remove('active')
    currentTab = newIndex

    document.getElementById(`tab-${currentTab}`).className = 'flex items-center gap-2 pb-3 text-sm font-bold tab-active transition-all whitespace-nowrap'
    document.getElementById(`panel-${currentTab}`).classList.add('active')

    updateProgress(currentTab)
    updateButtons(currentTab)
}

const updateButtons = (currentTab) => {
    document.getElementById('prevBtn').classList.toggle('hidden', currentTab === 0)
    const isLastTab = currentTab === totalTabs - 1
    document.getElementById('btnText').textContent = isLastTab ? 'Save Profile' : 'Save & Next'
    document.getElementById('btnIcon').className = isLastTab 
        ? 'fa-solid fa-check text-xs' 
        : 'fa-solid fa-arrow-right text-xs'
}

const updateProgress = (currentTab) => {
     const pct = progressSteps[currentTab]

    document.getElementById('progressBar').style.width = pct + '%'
    document.getElementById('progressLabel').textContent = pct + '% Completed'
}

const validateTab = (tabIndex) => {
    let isValid = true

    const markError = (id) => {
        const el = document.getElementById(id)
        if (!el) return
        el.classList.add('border-red-400')
        el.addEventListener('input', () => el.classList.remove('border-red-400'), { once: true })
    }

    if (tabIndex === 0) {
        const required = ['fullName', 'jobTitle', 'yearsOfExperience']
        required.forEach(id => {
            if (!getVal(id).trim()) {
                markError(id)
                isValid = false
            }
        })
    }

    if (tabIndex === 2) {
        const required = ['phone', 'address']
        required.forEach(id => {
            if (!getVal(id).trim()) {
                markError(id)
                isValid = false
            }
        })
    }

    if (!isValid) showToast('Please fill in all required fields.')
    return isValid
}

const nextTab = () => {
    if(!validateTab(currentTab)) return
    if (currentTab < totalTabs - 1) {
        switchProfileTab(currentTab + 1) 
    }else{
        submitProfile()
    }
}

const prevTab = () => {
    if (currentTab > 0) {
        switchProfileTab(currentTab - 1) 
    }
}

const showSuccessScreen = () => {
    document.getElementById('setupForm').style.display = 'none'
    const s = document.getElementById('successScreen')
    s.style.display = 'flex'
    s.style.flexDirection = 'column'
    s.style.alignItems = 'center'
    s.style.justifyContent = 'center'
}

const toggleCurrentJob = (e, id) => {
    const endDate = document.getElementById(`exp-${id}-end_date`)
    endDate.disabled = e.target.checked
    endDate.style.opacity = e.target.checked ? '0.4' : '1'
    if (e.target.checked) endDate.value = ''
}