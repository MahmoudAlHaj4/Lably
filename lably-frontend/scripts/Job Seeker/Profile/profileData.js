const getJobSeekerProfile = async (apiUrl, token) => {
    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (res.ok) return json.data
    } catch (err) {
        console.error(err)
    }
}

const updateJobSeekerProfile = async (apiUrl, token, formData) => {
    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        const json = await res.json()
        if (res.ok) return json.data
        else showToast(json.message || 'Update failed')
    } catch (err) {
        showToast('Something went wrong')
    }
}

const getExperiences = async (apiUrl, token) => {
    try {
        const res = await fetch(`${apiUrl}/api/experiences`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        console.log(json.data)
        if (res.ok) return json.data
    } catch (err) {
        console.error(err)
    }
}

const deleteExperience = async (apiUrl, token, id) => {
    try {
        const res = await fetch(`${apiUrl}/api/experiences/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        if (res.ok) return true
        else showToast(json.message || 'Failed to delete experience')
    } catch (err) {
        showToast('Something went wrong')
    }
}

const createExperience = async (apiUrl, token, expData) => {
    try {
        const res = await fetch(`${apiUrl}/api/experiences`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expData)
        })
        const json = await res.json()
        if (res.ok) return json.data
        else showToast(json.message || 'Failed to add experience')
    } catch (err) {
        showToast('Something went wrong')
    }
}

const updateExperience = async (apiUrl, token, id, expData) => {
    try {
        const res = await fetch(`${apiUrl}/api/experiences/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expData)
        })
        const json = await res.json()
        if (res.ok) return json.data
        else showToast(json.message || 'Failed to update experience')
    } catch (err) {
        console.log(err)
        showToast('Something went wrong')
    }
}

const uploadAvatar = async (apiUrl, token, file) => {
    const formData = new FormData()
    formData.append('profile_image', file)
    try {
        const res = await fetch(`${apiUrl}/api/job-seeker/profile`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        })
        const data = await res.json()
        if (!res.ok) {
            showToast(data.message || 'Failed to update image')
            return null
        }
        showToast('Profile image updated', 'success')
        return data.data
    } catch (err) {
        showToast('Something went wrong')
        return null
    }
}