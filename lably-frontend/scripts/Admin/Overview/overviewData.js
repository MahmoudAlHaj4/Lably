const loadUserStats = async (apiUrl, token) => {
    try{ 
       const res = await fetch(`${apiUrl}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
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
const loadPendingAppStats = async (apiUrl, token) => {
    try{ 
       const res = await fetch(`${apiUrl}/api/admin/pending-applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
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
const loadJobsStats = async (apiUrl, token) => {
    try{ 
       const res = await fetch(`${apiUrl}/api/admin/jobs`, {
        headers: { 'Authorization': `Bearer ${token}` }
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
const loadApplicationStats = async (apiUrl, token) => {
    try{ 
       const res = await fetch(`${apiUrl}/api/admin/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
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