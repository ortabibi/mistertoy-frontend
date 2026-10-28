import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Bye bye')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <h1>Mister Toy</h1>
            <nav>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashbord">Dashbord</NavLink>
            </nav>
            {loggedinUser
                ? <div className="user-info">
                    <span>Hello {loggedinUser.fullname}{loggedinUser.isAdmin && ' (admin)'}</span>
                    <button onClick={onLogout}>Logout</button>
                </div>
                : <NavLink to="/login">Login</NavLink>
            }
        </header>
    )
}
