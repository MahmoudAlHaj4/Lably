const submitBtn = document.getElementById('login-form')
const email = document.getElementById('login-email')
const password = document.getElementById('login-password')
const loginError = document.getElementById('login-error')
const loginBtn = document.getElementById('login-btn')

const registerEmail = document.getElementById('reg-email')
const registerPassword = document.getElementById('reg-password')
const registerForm = document.getElementById('register-form')
const regError = document.getElementById('register-error')
const regBtn = document.getElementById('reg-btn')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateFields = (fields) => {
    for(const { value, message } of fields){
        if(!value){
            return message
        }
    }
    return null
}

const redirectByRole = async (role, token) => {
    const headers = { 'Authorization': `Bearer ${token}` }

    if (role === 'employer') {
        const res = await fetch(`${CONFIG.apiUrl}/api/employer/profile`, { headers })
        const { data } = await res.json()
        window.location.href = data
            ? '../Employer/employerDashboard.html'
            : '../Employer/setUpProfile.html'

    } else if (role === 'job_seeker') {
        const res = await fetch(`${CONFIG.apiUrl}/api/job-seeker/profile`, { headers })
        const { data } = await res.json()
        window.location.href = data
            ? '../Job Seeker/jobs.html'
            : '../Job Seeker/setUpProfile.html'

    } else if (role === 'admin') {
        window.location.href = '../Admin/adminOverviewDashboard.html'
    }
}


const login = async() =>{

    const emailVal = email.value.trim()
    const passwordVal = password.value.trim()
    loginError.textContent = ''

    const error = validateFields([
        { value: emailVal, message: 'Email is required' },
        { value: emailRegex.test(emailVal) ? emailVal : '', message: 'Invalid email format' },
        { value: passwordVal, message: 'Password is required' },
    ])

    if(error){
        showToast(error)
        return
    }
    loginBtn.disabled = true
    loginBtn.textContent = 'Logging in....'

    try{
        const credentials = {
            email : email.value,
            password: password.value
        }

        const res = await fetch(CONFIG.apiUrl +'/api/auth/login', {
            method: 'POST', 
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(credentials)
        })

    const result = await res.json()
    const token = result.data?.token
    const role = result.data?.role


    if(res.ok) {
        showToast('Success' , 'success')
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        redirectByRole(role, token)
    }else{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        showToast(result.message)
    }
    }catch(error){
        showToast('Something went wrong')
    }finally {

        loginBtn.disabled = false
        loginBtn.innerHTML = 'Sign In <i class="fa-solid fa-arrow-right text-xs"></i>'
    }
   
}

submitBtn.addEventListener('submit', (e)=>{
    e.preventDefault()
    login()
})

const register = async () =>{
    const emailVal = registerEmail.value.trim()
    const passwordVal = registerPassword.value.trim()

    regError.textContent = ''
     const error = validateFields([
        { value: emailVal, message: 'Email is required' },
        { value: emailRegex.test(emailVal) ? emailVal : '', message: 'Invalid email format' },
        { value: passwordVal, message: 'Password is required' },
        { value: passwordVal.length >= 8 ? passwordVal : '', message: 'Password must be at least 8 characters' },
    ])

    if(error){
        showToast(error)
        return
    }

    regBtn.disabled = true
    regBtn.textContent = 'Creating account....'
    try{

    const registerData = {
        email: registerEmail.value,
        password: registerPassword.value
    }

    const res = await fetch(CONFIG.apiUrl + '/api/auth/register' , {
        method: 'POST',
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(registerData)
    })

    const data = await res.json()

    if(res.ok){
        regError.style.color = 'green'
        regError.textContent = 'Account created Please Sign In'
        showToast('Success')
        setTimeout(()=> {
            regError.style.color =''
            regError.textContent =''
            document.querySelector('[data-tab="login"]').click()
        }, 2000)
    }else{
        showToast(data.message)
    }
    }catch (err) {
        showToast('Something went wrong')
    }finally {

        regBtn.disabled = false
        regBtn.innerHTML = 'Create Account <i class="fa-solid fa-arrow-right text-xs"></i>'
    }
}

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    register()
})