import classes from './NavBar.module.css';

function NavBar() {
    return (  
        <nav className={classes.navBar}>
            <h1 className={classes.navHeader}>
                FIFA Reserve
            </h1>
            <ul className={classes.navList}>
                <li className={classes.navListItem}>
                    <a href="/">Home</a>
                </li>
                <li className={classes.navListItem}>
                    <a href="/players">Players</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;