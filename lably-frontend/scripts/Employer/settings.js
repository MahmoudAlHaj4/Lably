authGuard(['employer'])
const token  = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl

const loadProfile = async () => {
    try {
        const res  = await fetch(`${apiUrl}/api/employer/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (!res.ok) return

        const data = json.data
        if (!data) return

        setVal('companyName', data.company_name)
        setVal('aboutUs',    data.company_description)
        setSelect('organizationType', data.organization_type)
        setSelect('industryType',     data.industry_type)
        setSelect('teamSize',         data.team_size)
        setVal('yearEstablished',     data.year_established)
        setVal('website',             data.website)
        setVal('companyVision',      data.company_vision)
        setVal('linkedinUrl',  data.linkedin_url)
        setVal('instagramUrl', data.instagram_url)
        setVal('facebookUrl',  data.facebook_url)
        setVal('twitterUrl',   data.twitter_url)
        setVal('contactEmail', data.contact_email)
        setVal('contactPhone', data.contact_phone)
        setVal('address',      data.location)

        if (data.logo_path) {
           showCurrentImage('logoPreview',   'logoPlaceholder',   data.logo_path,   'logos')  
        }  
        if (data.banner_path) {
           showCurrentImage('bannerPreview', 'bannerPlaceholder', data.banner_path, 'banners')   
        } 

    } catch (err) {
        console.error('Failed to load profile:', err)
    }
}


const saveSettings = async () => {
    const btn     = document.getElementById('saveBtn')
    const btnText = document.getElementById('saveBtnText')
    const status  = document.getElementById('saveStatus')

    btn.disabled   = true
    btnText.textContent = 'Saving...'
    status.textContent  = ''

    try {
        const formData = new FormData()

        formData.append('company_name',        getVal('companyName'))
        formData.append('company_description', getVal('aboutUs'))
        formData.append('company_vision',      getVal('companyVision'))
        formData.append('organization_type',   getVal('organizationType'))
        formData.append('industry_type',       getVal('industryType'))
        formData.append('team_size',           getVal('teamSize'))
        formData.append('year_established',    getVal('yearEstablished'))
        formData.append('website',             getVal('website'))
        formData.append('linkedin_url',        getVal('linkedinUrl'))
        formData.append('instagram_url',       getVal('instagramUrl'))
        formData.append('facebook_url',        getVal('facebookUrl'))
        formData.append('twitter_url',         getVal('twitterUrl'))
        formData.append('contact_email',       getVal('contactEmail'))
        formData.append('contact_phone',       getVal('contactPhone'))
        formData.append('location',            getVal('address'))

        const logoFile   = document.getElementById('logoInput').files[0]
        const bannerFile = document.getElementById('bannerInput').files[0]

        if (logoFile){
            formData.append('logo',   logoFile)
        }
        if (bannerFile){
            formData.append('banner', bannerFile)
        }

        const res = await fetch(`${apiUrl}/api/employer/profile`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })

        const json = await res.json()

        if (res.ok) {
            status.textContent = '✓ Changes saved'
            status.className   = 'text-xs text-[#16a34a]'
            if (typeof showToast === 'function') showToast('Profile updated successfully', 'success')
        } else {
            status.textContent = json.message || 'Something went wrong'
            status.className   = 'text-xs text-red-500'
            if (typeof showToast === 'function') showToast(json.message || 'Update failed', 'error')
        }

    } catch (err) {
        console.error('Save failed:', err)
        status.textContent = 'Network error — please try again'
        status.className   = 'text-xs text-red-500'
    } finally {
        btn.disabled        = false
        btnText.textContent = 'Save Changes'
    }
}



const showCurrentImage = (previewId, placeholderId, path, bucket) => {
    const url = `${CONFIG.supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
    document.getElementById(placeholderId).classList.add('hidden')
    const img = document.getElementById(previewId)
    img.src = url
    img.classList.remove('hidden')
}

let currentTab = 0

function switchTab(index) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    for (let i = 0; i < 4; i++) {
        document.getElementById('tab-' + i).className =
            'flex items-center gap-2 py-4 text-sm font-medium tab-inactive transition-all whitespace-nowrap'
    }
    document.getElementById('panel-' + index).classList.add('active')
    document.getElementById('tab-' + index).className =
        'flex items-center gap-2 py-4 text-sm font-medium tab-active transition-all whitespace-nowrap'
    currentTab = index
}


loadProfile()