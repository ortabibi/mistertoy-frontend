import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = await httpService.post(BASE_URL + 'signup', { username, password, fullname })
    return _setLoggedinUser(user)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// Keep only what the UI needs (the real proof of login is the httpOnly cookie)
function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
