const displayUsers = (users) => {
    usersTable.innerHTML = ''
    users.forEach(user => createRow(user))
}

const createRow = (user) => {
    const isActive = user.is_active
    const rowHtml = `
    <tr class="border-b border-[#F5F6F8]" data-id="${user.id}">
        <td class="px-6 py-4">
            <p class="text-sm font-semibold text-[#0D1B2A]">${user.email}</p>
        </td>
        <td class="px-4 py-4">
            <p class="text-xs text-[#0D1B2A]">${user.role}</p>
        </td>
        <td class="px-4 py-4">
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isActive 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-500'}">
                <i class="fa-solid fa-circle text-[8px]"></i>
                ${isActive ? 'Active' : 'Inactive'}
            </span>
        </td>
        <td class="px-4 py-4">
            <button class="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 hover:bg-red-50 text-red-400 hover:text-red-500 transition" 
                data-action="delete" data-id="${user.id}" data-email="${user.email}" title="Delete User">
                <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
        </td>
    </tr>`

    usersTable.insertAdjacentHTML('beforeend', rowHtml)
}