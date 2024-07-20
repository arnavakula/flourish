const NavBar = () => {
    return (
        <nav className="w-[100vw] border flex flex-row">
            <h2 className="mx-[4em]">Flourish</h2>
            <ul className="flex flex-row gap-[2em]">
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About Us </a></li>
                <li><a href='#'>Dashboard</a></li>
            </ul>
        </nav>
    )
}

export default NavBar;