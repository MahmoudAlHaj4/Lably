let expCount = 0

const removeExperience = (id) => {
    document.getElementById(`exp-${id}`).remove()
    if (document.getElementById('experienceList').children.length === 0) {
        document.getElementById('expEmptyState').classList.remove('hidden')
    }
}

const addExperience = () => {
    const id = expCount++
    const today = new Date().toISOString().slice(0, 7) 

    document.getElementById('expEmptyState').classList.add('hidden')

    const card = document.createElement('div')
    card.className = 'exp-card'
    card.id = `exp-${id}`
    card.innerHTML = `
        <button data-remove class="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-semibold text-[#0D1B2A] mb-1.5">Job Title</label>
                <input type="text" placeholder="e.g. CAD/CAM Specialist" class="soft-input" id="exp-${id}-job_title"/>
            </div>
            <div>
                <label class="block text-sm font-semibold text-[#0D1B2A] mb-1.5">Company / Lab Name</label>
                <input type="text" placeholder="e.g. Bright Smile Dental Lab" class="soft-input" id="exp-${id}-company_name"/>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
                <label class="block text-sm font-semibold text-[#0D1B2A] mb-1.5">Start Date</label>
                <input type="month" class="soft-input" id="exp-${id}-start_date" max="${today}"/>
            </div>
            <div>
                <label class="block text-sm font-semibold text-[#0D1B2A] mb-1.5">End Date</label>
                <input type="month" class="soft-input" id="exp-${id}-end_date" max="${today}"/>
            </div>
        </div>

        <div class="mb-4">
            <label class="flex items-center gap-2 cursor-pointer w-fit">
                <input type="checkbox" class="w-4 h-4 accent-[#16a34a]" id="exp-${id}-currentJob"/>
                <span class="text-sm font-semibold text-[#0D1B2A]">This is my current job</span>
            </label>
        </div>

        <div>
            <label class="block text-sm font-semibold text-[#0D1B2A] mb-1.5">Description <span class="text-gray-400 font-normal">(optional)</span></label>
            <textarea rows="3" placeholder="Briefly describe your responsibilities and achievements..." class="soft-input resize-none" style="border-radius:12px" id="exp-${id}-description"></textarea>
        </div>
    `

    document.getElementById('experienceList').appendChild(card)

    card.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-remove]')
        if (removeBtn) removeExperience(id)
    })

    document.getElementById(`exp-${id}-currentJob`).addEventListener('change', (e) => toggleCurrentJob(e, id))
}