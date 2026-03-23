const applyModal = document.getElementById('applyModal')

const openModal = () => {
    applyModal.classList.remove('hidden')
    applyModal.classList.add('flex')
}

const closeModal = () => {
    applyModal.classList.add('hidden')
    applyModal.classList.remove('flex')
    document.getElementById('coverLetterInput').value = ''
    document.getElementById('resumeInput').value = ''
    document.getElementById('resumeFileName').textContent = ''
    document.getElementById('uploadSelected').classList.add('hidden')
    document.getElementById('uploadPrompt').classList.remove('hidden')
}

document.getElementById('applyBtn').addEventListener('click', openModal)
document.getElementById('closeModalBtn').addEventListener('click', closeModal)
document.getElementById('cancelModalBtn').addEventListener('click', closeModal)
applyModal.addEventListener('click', (e) => { if (e.target === applyModal) closeModal() })


document.getElementById('applyBtn').addEventListener('click', openModal)


document.getElementById('closeModalBtn').addEventListener('click', closeModal)


document.getElementById('cancelModalBtn').addEventListener('click', closeModal)


applyModal.addEventListener('click', (e) => {
    if (e.target === applyModal) closeModal()
})
