const resume = document.getElementById('resume')
const resumePlaceholder = document.getElementById('resume-placeholder')
const resumeDropzone = document.getElementById('resume-dropzone')
const resumePreview = document.getElementById('resume-preview')
const resumeName = document.getElementById('resume-name')
const removeResume = document.getElementById('remove-resume')

const restResumeInput = () => {
    resumePlaceholder.classList.remove('hidden')
    resumePreview.classList.add('hidden')
    resume.value = ''      
}

const handleFile = (file) => {
    if(file.type !== 'application/pdf'){
        showToast('File Type is not supported')
        restResumeInput()
        
    }else if(file.size > 5 * 1024 * 1024){
        showToast('File exceeds Limits')
        restResumeInput()
    }else{
        resumeName.textContent = file.name
        resumePlaceholder.classList.add('hidden')
        resumePreview.classList.remove('hidden')
    }
    }

resumeDropzone.addEventListener('click', ()=>{
    resume.click()
})

resume.addEventListener('change' , (e)=>{
    handleFile(resume.files[0]) 

})

resumeDropzone.addEventListener('dragover', (e)=>{
    e.preventDefault()
    resumeDropzone.classList.add('border-[#16a34a]', 'bg-green-50');
})

resumeDropzone.addEventListener('dragleave', () => {
    resumeDropzone.classList.remove('border-[#16a34a]', 'bg-green-50');
});

resumeDropzone.addEventListener('drop' , (e) => {
    e.preventDefault()
    resumeDropzone.classList.remove('border-[#16a34a]', 'bg-green-50');
    const file = e.dataTransfer.files[0]
    if(file){
        handleFile(file)
    }
    
})

removeResume.addEventListener('click', (e)=>{
    e.stopPropagation()
    resume.value = ''
    resumePlaceholder.classList.remove('hidden')
    resumePreview.classList.add('hidden')
})
