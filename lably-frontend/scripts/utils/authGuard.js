

function authGuard(allowedRoles = []) {
    const token = localStorage.getItem('token');
    const role  = localStorage.getItem('role');

    if (!token) {
        window.location.href = '../Auth/login.html';
        return false;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        window.location.href = '../Auth/login.html';
        return false;
    }

    return true;
}