

const getAllPendingApplication = async (apiUrl, token) => {
    try{
        const res = await fetch(`${apiUrl}/api/admin/pending-applications`, {
            headers: {'Authorization' : `Bearer ${token}`}
        })

        const data = await res.json()
        if(res.ok) {
            
            console.log(data )
            return data
        }else{
            // console.log(data.message)
            throw new Error(data.message)
        }
    }catch(error) {
        throw error
    }
}

const getPendingApplication = async (apiUrl, token, id)=>{
    try{
        console.log('data coming')
        const res = await fetch(`${apiUrl}/api/admin/pending-application/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })


        const data = await res.json()

        if(res.ok) {

            return data
        }else{

            throw new Error(data.message)
        }
    }catch(error) {
        throw error
    }
}

const approveApplication = async (apiUrl, token, id, note) =>{
    try{
        const res = await fetch(`${apiUrl}/api/admin/approve/${id}`, {
            method: 'PUT',
            headers: {'Authorization' : `Bearer ${token}`, 'Content-Type' : "application/json"},
            body: JSON.stringify({ decision_notes: note })

        })
        const data = await res.json()
    

        
        if(res.ok) {
            return data
        }else{
            throw new Error(data.message)
        }
    }catch(error) {
       throw error
    }
}

const rejectApplication = async (apiUrl, token, id , note) => {
    try{
        const res = await fetch(`${apiUrl}/api/admin/reject/${id}`, {
            method: 'PUT',
            headers: {'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({ decision_notes: note })
        })

        const data =  await res.json()
        

        if(res.ok){
            return data
        }else{
            throw new Error(data.message)
        }
    }catch(error) {
        throw error
    }
}
