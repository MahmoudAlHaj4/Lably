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

    const data = await res.json() 

    console.log(data)
    if(res.ok) {
        showToast('Success' , 'success')
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)

        if(data.role === 'employer'){

            const profile = await fetch(`${CONFIG.apiUrl}/api/employer/profile`, {
                headers: { 'Authorization': `Bearer ${data.token}` }
            })

            const ProfileData = await profile.json()

            if(ProfileData.data){
                window.location.href = '../Employer/dashboard.html'
            }else{
                window.location.href = '../Employer/setUpProfile.html'
            }
        }else if(data.role === 'job_seeker'){
            window.location.href = '../forgetPassword.html'
        }else if(data.role === 'admin'){
            window.location.href = '../Admin/adminDashboard.html'
        }
    }else{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        showToast(data.message)
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
    const emailValidation = registerEmail.value.trim()
    const passwordValidation = registerPassword.value.trim()

    regError.textContent = ''
    regError.style.color = 'red'
    if(!emailValidation) {
        return regError.textContent = 'Email is required'
    }
    if(!passwordValidation) {
        return regError.textContent = 'Password is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(emailValidation)){
        return regError.textContent = 'Please enter a valid email'

    }
    if(passwordValidation.length < 8){
        return regError.textContent = 'Password must be at least 8 characters'
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
        setTimeout(()=> {
            regError.style.color =''
            regError.textContent =''
            document.querySelector('[data-tab="login"]').click()
        }, 2000)
    }else{
        regError.textContent = data.message
    }
    }catch (err) {
        console.log(err)
    }finally {

        regBtn.disabled = false
        regBtn.innerHTML = 'Create Account <i class="fa-solid fa-arrow-right text-xs"></i>'
    }
}

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    register()
})