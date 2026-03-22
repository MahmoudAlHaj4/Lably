const getJobSeekerProfile = async (apiUrl, token) => {
    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        console.log(json.data)
        if (res.ok) return json.data
    } catch (err) {
        console.error(err)
    }
}

const getSeekerJobs = async (apiUrl) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${apiUrl}/api/seeker/jobs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            return data
        } else {
            showToast(data.message || 'Something went wrong')
        }
    } catch (err) {
        showToast(err.message || 'Something went wrong')
    }
}