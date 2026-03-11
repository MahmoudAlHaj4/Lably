
function filterTable(status) {
    document.querySelectorAll('#applicationsTable tr').forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        row.style.display = (status === 'all' || rowStatus === status) ? '' : 'none';
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('border-[#2563eb]', 'text-[#2563eb]', 'bg-blue-50');
        btn.classList.add('border-[#E4E5E8]', 'text-[#767F8C]');
    });

    const active = document.getElementById('filter-' + status);
    active.classList.add('border-[#2563eb]', 'text-[#2563eb]', 'bg-blue-50');
    active.classList.remove('border-[#E4E5E8]', 'text-[#767F8C]');
}


function openModal(id) {
    document.getElementById(id).classList.add('open');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

function closeOnOverlay(event, id) {
    if (event.target === document.getElementById(id)) closeModal(id);
}

function openFilesModal(name, resumePath, portfolioPath) {
    document.getElementById('filesModalName').textContent = name;
    document.getElementById('filesContainer').innerHTML = ''
    openModal('filesModal');
    displayFiles(resumePath, portfolioPath)
}

function openNotesModal(name, notes) {
    document.getElementById('notesModalName').textContent = name;
    document.getElementById('notesTextarea').value = notes || '';
    openModal('notesModal');
}

function saveNotes() {

    closeModal('notesModal');
}


function openApproveModal(name) {
    document.getElementById('approveModalName').textContent = name;
    openModal('approveModal');
}

function confirmApprove() {

    closeModal('approveModal');
}


function openRejectModal(name) {
    document.getElementById('rejectModalName').textContent = name;
    openModal('rejectModal');
}

function confirmReject() {

    closeModal('rejectModal');
}
function openDeleteUserModal(email, id) {
    document.getElementById('deleteUserEmail').textContent = email;
    openModal('deleteUserModal');
}
function openDeleteJobModal(jobTitle, id) {
    document.getElementById('deleteJobTitle').textContent = jobTitle;
    openModal('deleteJobModal');
}


document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        ['filesModal', 'notesModal', 'approveModal', 'rejectModal', 'deleteUserModal', 'deleteJobModal'].forEach(closeModal);
    }
});

const showLoading = (container) => {
    container.innerHTML = `
        <tr>
            <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex items-center justify-center gap-2 text-[#767F8C]">
                    <i class="fa-solid fa-spinner animate-spin text-sm"></i>
                    <span class="text-sm">Loading applications...</span>
                </div>
            </td>
        </tr>
    `
}