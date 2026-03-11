
const getAllJobs = async(apiUrl, token) => {
     try{
        const res= await fetch(`${apiUrl}/api/admin/jobs`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const data = await res.json()

        if(res.ok){
            return data
        }else{
            throw data.message
        }
    }catch(error) {
        throw error
    }

}

const deleteAJob = async (apiUrl, token, id) => {
    try{
        const res = await fetch(`${apiUrl}/api/admin/jobs/${id}` , {
            method:'DELETE', 
            headers: {'Authorization' : `Bearer ${token}`}
        })
        const data = await res.json()
        if(res.ok) {
            return data
        }
    }catch(error){
        throw error
    }
}