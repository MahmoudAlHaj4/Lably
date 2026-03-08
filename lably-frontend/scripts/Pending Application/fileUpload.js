const resume = document.getElementById('resume')
const resumePlaceholder = document.getElementById('resume-placeholder')
const resumeDropzone = document.getElementById('resume-dropzone')
const resumePreview = document.getElementById('resume-preview')
const resumeName = document.getElementById('resume-name')
const removeResume = document.getElementById('remove-resume')

const portfolioInput = document.getElementById('portfolio')
const portfolioPlaceholder = document.getElementById('portfolio-placeholder')
const portfolioDropzone = document.getElementById('portfolio-dropzone')
const portfolioPreviews = document.getElementById('portfolio-previews')
let portfolioFiles = []

window.fileUpload = {
    getPortfolioFiles: () => portfolioFiles
}

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

const portfolioValidation = (file) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg']

    if(!allowedTypes.includes(file.type)){
        portfolioPlaceholder.classList.remove('hidden')
        portfolioPreviews.classList.add('hidden')
        portfolioInput.value = ''
        return false
    }else if(file.size > 5 * 1024 * 1024){
        portfolioPlaceholder.classList.remove('hidden')
        portfolioPreviews.classList.add('hidden')
        portfolioInput.value = ''
        showToast('File size exceeds the limits')
        return false
    }
    return true
}


portfolioDropzone.addEventListener('click', ()=>{
    portfolioInput.click()
})

portfolioInput.addEventListener('change', (e) => {
    
    const selectedFiles = Array.from( portfolioInput.files)
    const validateFiles = selectedFiles.filter((file) => {
        return portfolioValidation(file)
    })

    portfolioFiles.push(...validateFiles)
    portfolioFiles = portfolioFiles.slice(0, 5)
    portfolioInput.value = ''
    
    if(portfolioFiles.length > 5){
        showToast('You exceeds the Limits')
    }
    displayPortfolioFiles()


})

const displayPortfolioFiles = () => {
 portfolioPreviews.innerHTML = ''
  if (portfolioFiles.length === 0) {
        portfolioPlaceholder.classList.remove('hidden')
        portfolioPreviews.classList.add('hidden')
        return
    }

    portfolioPlaceholder.classList.add('hidden')
    portfolioPreviews.classList.remove('hidden')

    portfolioFiles.forEach((file, index) => {
        let card = document.createElement('div')
        card.classList.add('flex', 'items-center', 'justify-between', 'w-full', 'p-2')
        let name = document.createElement('span')
        name.classList.add('text-sm', 'font-medium', 'text-[#0D1B2A]')
        name.textContent = file.name
        let deleteBtn = document.createElement('button')
        deleteBtn.dataset.id = 'delete-btn'
        deleteBtn.classList.add("text-red-500", "hover:text-red-700")
        deleteBtn.innerHTML = ` <i class="fa-regular fa-trash-can"></i>`
        deleteBtn.type = 'button'
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            portfolioFiles.splice(index, 1)
            displayPortfolioFiles()
  
        })


        card.appendChild(name)
        card.appendChild(deleteBtn)
        portfolioPreviews.appendChild(card)
        

    })
}

portfolioDropzone.addEventListener('dragover', (e) => {
    e.preventDefault()
    portfolioDropzone.classList.add('border-[#16a34a]', 'bg-green-50')
})

portfolioDropzone.addEventListener('dragleave', () => {
    portfolioDropzone.classList.remove('border-[#16a34a]', 'bg-green-50')
})

portfolioDropzone.addEventListener('drop', (e) => {
    e.preventDefault()
    portfolioDropzone.classList.remove('border-[#16a34a]', 'bg-green-50')
    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(file => portfolioValidation(file))
    portfolioFiles.push(...validFiles)
    portfolioFiles = portfolioFiles.slice(0, 5)
    displayPortfolioFiles()
})
