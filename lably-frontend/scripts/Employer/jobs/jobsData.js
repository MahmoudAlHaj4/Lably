const token  = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl

const postBtn = document.getElementById('postBtn')
const postBtnText = document.getElementById('postBtnText')

const postJob = async () => {
    postBtn.disabled = true
    postBtnText.textContent = 'Posting...'

    try {
        const jobData = {
            job_title:    getVal('jobTitle'),
            job_type:     getVal('jobType'),
            location:     getVal('location'),
            description:  getVal('description'),
            requirements: getVal('requirements'),
        }

        const res = await fetch(`${apiUrl}/api/jobs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        })
        const data = await res.json()

        if (res.ok) {
            showToast('Job posted successfully', 'success')
            window.location.href = './employerJob.html'
        } else {
            showToast(data.message || 'Failed to post job. Please try again.')
        }
    } catch (error) {
        showToast('Something went wrong. Please try again.')
    } finally {
        postBtn.disabled = false
        postBtnText.textContent = 'Post Job'
    }
}

postBtn.addEventListener('click', postJob)