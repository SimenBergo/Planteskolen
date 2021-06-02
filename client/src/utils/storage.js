
const LOCAL_STORAGE_PREFIX = 'planteskolen-';

function getToken() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}token`));
}

function getUser() {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`));
}

function getResetToken () {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}resetToken`));
}

function setUser(user) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(user));
}

function setToken(token) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}token`, JSON.stringify(token));
}

function setResetToken(resetToken) {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}resetToken`, JSON.stringify(resetToken));
}

function clearLocalStorage() {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}token`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}user`);
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}resetToken`);
}

export { getToken, setToken, getUser, getResetToken, setResetToken, setUser, clearLocalStorage };