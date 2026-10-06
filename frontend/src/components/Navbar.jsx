import { NavLink } from "react-router";

function Navbar({ darkMode, setDarkMode, id }){
    return(
        <header>
            <h1>AREDL Companion</h1>
            <nav>
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to={`/profile/${id}`} end>
                    Profile
                </NavLink>
                <NavLink to="/login" end>
                    Login
                </NavLink>
            </nav>
            <button type="button" id="theme-toggle" onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
            }}>Toggle Dark Theme</button>
        </header>
    )
}

export default Navbar