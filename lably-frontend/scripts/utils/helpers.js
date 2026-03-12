const setVal = (id, value) => {
    const el = document.getElementById(id)
    if (el && value != null) el.value = value
}

const setRich = (id, value) => {
    const el = document.getElementById(id)
    if (el && value != null) el.innerHTML = value
}

const setSelect = (id, value) => {
    const el = document.getElementById(id)
    if (!el || value == null) return
    const option = [...el.options].find(o => o.value === value)
    if (option) el.value = value
}

const getVal = (id) => {
    const el = document.getElementById(id)
    return el ? el.value.trim() : ''
}

const getRich = (id) => {
    const el = document.getElementById(id)
    return el ? el.innerHTML.trim() : ''
}

const previewImg = (e, previewId, placeholderId) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
        document.getElementById(placeholderId).classList.add('hidden')
        const img = document.getElementById(previewId)
        img.src = ev.target.result
        img.classList.remove('hidden')
    }
    reader.readAsDataURL(file)
}

const execCmd = (cmd) => {
    if (cmd === 'createLink') {
        const url = prompt('Enter URL:')
        if (url) document.execCommand('createLink', false, url)
    } else {
        document.execCommand(cmd, false, null)
    }
}