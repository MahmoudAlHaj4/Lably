const fullName = document.getElementById('full_name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const userLocation = document.getElementById('address')
const submitBtn = document.getElementById('submit-btn')

const apply = document.getElementById('apply-form')

const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9\s\+\-]{7,15}$/
    const emailVal = email.value.trim()
    const phoneVal = phone.value.trim()

    const markError = (el) => {
        el.classList.add('border-red-400')
        el.addEventListener('input', () => el.classList.remove('border-red-400'), { once: true })
    }

    const errors = []

    if (!fullName.value.trim()) { markError(fullName); errors.push('Full name is required') }
    if (!emailVal) { markError(email); errors.push('Email is required') }
    else if (!emailRegex.test(emailVal)) { markError(email); errors.push('Invalid email format') }
    if (!phoneVal) { markError(phone); errors.push('Phone is required') }
    else if (!phoneRegex.test(phoneVal)) { markError(phone); errors.push('Invalid phone format') }

    if (errors.length > 0) showToast(errors[0])
    return errors.length === 0
}

const submitApplication = async () => {
    if(!validateForm()) return
    submitBtn.disabled = true
    submitBtn.textContent = 'Submitting...'
    try{
        const formData = new FormData()
        formData.append('full_name', fullName.value)
        formData.append('email', email.value)
        formData.append('phone', phone.value)
        formData.append('address', userLocation.value)
        formData.append('resume', resume.files[0])
        window.fileUpload.getPortfolioFiles().forEach(file => formData.append('portfolio', file))

        const res = await fetch(`${CONFIG.apiUrl}/api/pending-applications`, {
            method: 'POST',
            body:formData
        })
        const data = await res.json()

        if(res.ok){
            showToast('Success' , 'success')
            window.location.href = '../../pages/Pending Applications/success.html'
        }else {
            showToast(data.message || 'Submission failed. Please try again.')
        }
    }catch(error) {
        showToast('Something went wrong. Please try again.')
        
    }finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Submit Application'
    }
}

apply.addEventListener('submit' , (e)=>{
    e.preventDefault()
    submitApplication()
})