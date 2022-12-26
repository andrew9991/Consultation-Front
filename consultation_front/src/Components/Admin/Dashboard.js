import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import classes from './Admin.module.css';

function AdminDashboard(props) {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    return ( 
        <div className={classes.dashboard}>
                <h1 className={classes.dboardH}>Dashboard</h1>
                <div>
                    <p className={`${classes.dboardHeader} ${props.isApproved && classes.active}`} onClick={() => props.setIsActive(true)}>Users</p>
                    <p className={`${classes.dboardHeader} ${!props.isApproved && classes.active}`} onClick={() => props.setIsActive(false)}>Unapproved Managers</p>
                    <p className={`${classes.dboardHeader}`} onClick = {() => {
                        userContext.logout();
                        navigate('/home');
                        }}>Logout</p>
                </div>
        </div>
     );
}

export default AdminDashboard;