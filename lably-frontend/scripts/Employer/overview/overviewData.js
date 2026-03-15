const getEmployerJobs = async (apiUrl, token) => {
    try{
        const res = await fetch(`${apiUrl}/api/jobs`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })

        const json = await res.json()

        const data = json.data

        if(res.ok) {
            console.log(data)
            return data 
        }
    }catch(error){
        console.log(error)
    }
}

const getEmployerApplications = async (apiUrl, token) => {
    try{
        const res = await fetch(`${apiUrl}/api/applications`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const json = await res.json()
        const data = json.data
        if(res.ok) {
            console.log(data)
            return data
        }
    }catch(error) {
        console.log(error)
    }
}


const getprofile = async (apiUrl, token) => {
    try{
        const res = await fetch(`${apiUrl}/api/employer/profile`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const json = await res.json()

        const data = json.data

        if(res.ok) {
            return data
        }
    }catch(error) {
        console.log(error)
    }
}

const deleteAJob = async (apiUrl, token, id) => {
    try{
        const res = await fetch(`${apiUrl}/api/jobs/${id}`, {
            method: 'DELETE',
            headers: {'Authorization' : `Bearer ${token}`}
        })

        const json = res.json()

        const data = json.data

        if(res.ok) {
            return data
        }else{
           console.log(data.message)
        }
    }catch(error) {
        throw error
    }
}

const updateJob = async (apiUrl, token, id, jobData) => {
    console.log(`${apiUrl}/api/jobs/${id}`)
    try{
        const res = await fetch(`${apiUrl}/api/jobs/${id}`, {
           method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        })

        const json = await res.json()

        const data = json.data

        if(res.ok) {
            return data
        }else{
            console.log(data)
        }
    }catch(error) {
        throw error
    }
}