

const getGuestJobs = async (apiUrl) => {
    try{
        const res = await fetch(`${apiUrl}/api/guest/jobs`)

        const data = await res.json()
        console.log(data)
        if(res.ok) {
            return data
        }else{
            showToast(data.message || 'Something went wrong')
        }
    }catch(err) {
        showToast(data.message || 'Something went wrong')
    }
}