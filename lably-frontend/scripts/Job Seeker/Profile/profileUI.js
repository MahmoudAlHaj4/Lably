
document.getElementById('avatarBtn').addEventListener('click', (e) => {
    e.stopPropagation()
    const dd = document.getElementById('dropdown')
    const ch = document.getElementById('chevron')
    dd.classList.toggle('hidden')
    ch.classList.toggle('rotate-180')
})


document.addEventListener('click', () => {
    document.getElementById('dropdown').classList.add('hidden')
    document.getElementById('chevron').classList.remove('rotate-180')
})

const toggleSkeleton = (show) => {
    const pairs = [
        ['navBtnSkeleton', 'navName'],
        ['navNameSkeleton', null],
        ['navAvatarSkeleton', null],
        ['dropdownNameSkeleton', 'dropdownName'],
        ['avatarSkeleton', null],
        ['nameSkeleton', 'profileName'],
        ['locationSkeleton', 'profileLocation'],
        ['aboutSkeleton', 'profileAbout'],
        ['expSkeleton', 'experienceList'],
        ['phoneSkeletion', 'profile-phone'],
        ['addressSkeleton', 'profile-address'],
    ]

    pairs.forEach(([skeletonId, realId]) => {
        document.getElementById(skeletonId).classList.toggle('hidden', !show)
        if (realId) document.getElementById(realId).classList.toggle('hidden', show)
    })
}

const showSkeletons = () => toggleSkeleton(true)
const hideSkeletons = () => toggleSkeleton(false)

document.addEventListener('click', () => {
    document.getElementById('dropdown').classList.add('hidden')
    document.getElementById('chevron').classList.remove('rotate-180')
})

function openModal(id) {
    const modal = document.getElementById(id);
    const box = modal.querySelector('.modal-box');
    box.classList.remove('animate');
    void box.offsetWidth;
    box.classList.add('animate');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}
function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
function closeModalOutside(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
}


const openProfileModal = (profile) => {
    document.getElementById('modalProfileName').textContent = profile.full_name
    document.getElementById('modal-phone').value = profile.phone || ''
    document.getElementById('modal-address').value = profile.address || ''
    document.getElementById('modal-about').value = profile.about || ''
    openModal('profileModal')
}