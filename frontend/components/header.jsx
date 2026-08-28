function Header({ darkMode, setDarkMode }){
    return(
        <header>
            <h1>AREDL Companion</h1>
            <button type="button" id="theme-toggle" onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
            }}>Toggle Dark Theme</button>
        </header>
    )
}

export default Header