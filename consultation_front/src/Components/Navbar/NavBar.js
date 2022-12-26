import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import classes from './NavBar.module.css';

function NavBar() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    return (  
        <nav className={classes.navBar}>
            <NavLink to={"/home"} className="noDec">
                <h1 className={classes.navHeader}>
                    FIFA Reservation
                </h1>
            </NavLink>
            <ul className={classes.navList}>
                {user != null  && user.type == 1 &&
                    <li className={classes.navListItem}>
                        <NavLink to={`/manager_matches/${user.user_id}`} className="noDec">
                            <p className={classes.navListHeader}>
                                My Matches
                            </p>
                        </NavLink>
                    </li>
                }
                {user != null &&
                    <li className={classes.navListItem}>
                        <NavLink to={`/profile/${user.user_id}`} className="noDec">
                            <p className={classes.navListHeader}>
                                Profile
                            </p>
                        </NavLink>
                    </li>
                }
                <li className={classes.navListItem}>
                    {user != null ? 
                        <p className={classes.navListHeader} onClick = {() => {
                            userContext.logout();
                            navigate('/home');
                        }}>
                            Logout
                        </p>
                        :
                        <NavLink to={"/login"} className="noDec">
                            <p className={classes.navListHeader}>
                                Login
                            </p>
                        </NavLink>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;