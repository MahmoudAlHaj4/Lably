


const getAllUsers = async (apiUrl , token) => {
    try{
        
        const res = await fetch(`${apiUrl}/api/admin/users` , {
            headers: {'Authorization': `Bearer ${token}`}
        })

        const data = await res.json()

        if(res.ok) {
            return data
        
        }
    }catch(error){
        console.log(error)
    }
}


const deleteUser = async (apiUrl , token , id) =>{
    try{
        const res = await fetch(`${apiUrl}/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {'Authorization' : `Bearer ${token}`}
        })

        const data = await res.json()

        if(res.ok){
            return data
        }
    }catch(error){
        throw error
    }
}
