const usersTable = document.getElementById('usersTable')
const deleteBtn = document.getElementById('delete-user-btn')

const token = localStorage.getItem('token')
const apiUrl = CONFIG.apiUrl
let users = []
let userId= null

const getUsersData = async () => {
    showLoading(usersTable)
    try{
        const data = await getAllUsers(apiUrl , token)
        users = data.data
        displayUsers(users)
    }catch(error) {
        throw new Error
    }
}

getUsersData()

document.getElementById('usersTable').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="delete"]')
    if (!btn) return
    const { id} = btn.dataset
    userId = id
    userToDelete = id
    openDeleteUserModal(btn.dataset.email, btn.dataset.id)
})

deleteBtn.addEventListener('click' , async () => {
    await deleteUser(apiUrl, token , userId)
    closeModal('deleteUserModal')
})