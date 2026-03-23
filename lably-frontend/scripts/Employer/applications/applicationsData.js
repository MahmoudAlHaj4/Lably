
const getEmployerJobs = async (apiUrl , token) => {
    try{
        const res = await fetch(`${apiUrl}/api/jobs`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const json = await res.json()
        if (res.ok) {
            return json.data
        }
    }catch (error) {
        throw error
    }
}

const getEmployerApplications = async (apiUrl, token) => {
    try{
        const res = await fetch(`${apiUrl}/api/applications` , {
            headers : {'Authorization' : `Bearer ${token}`}
        })
        const json = await res.json()

        if(res.ok) {
            return json.data
        }
    }catch(error) {
        throw error
    }
}

const getCandidateProfile = async (apiUrl, token, profileId) => {
    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile/${profileId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (res.ok) return json.data
        return null
    } catch (error) {
        showToast(json.message)
    }
}

const getprofile = async (apiUrl, token) => {
    try {
        const res = await fetch(`${apiUrl}/api/employer/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        console.log(json.data)
        if (res.ok) return json.data
        return null
    } catch (error) {
        throw error
    }
}