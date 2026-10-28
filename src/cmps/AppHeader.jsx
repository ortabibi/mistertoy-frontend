import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>Mister Toy</h1>
            <nav>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashbord">Dashbord</NavLink>
            </nav>
        </header>
    )
}