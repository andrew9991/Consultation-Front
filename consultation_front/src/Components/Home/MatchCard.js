import { NavLink } from 'react-router-dom';
import formatDateTime from '../formatDateTime';
import classes from './MatchCard.module.css';
function MatchCard(props) {
    // console.log(props);
    
    return (  
        <NavLink className="noDec" to={`/match/${props.data.match_id}`}>
            <div className={classes.card}>
                <div className={classes.cardHeader}>
                    <h1>{props.data.team_A} <span className={`${classes.vs} linearRB`}>VS</span> {props.data.team_B}</h1>
                </div>
                <div className={classes.cardBody}>
                    <div className={classes.cardBodyLeft}>
                        <h2 className='linearRB'>Date</h2>
                        <h2 className='linearRB'>Venue</h2>
                    </div>
                    <div className={classes.cardBodyRight}>
                        <h2>{formatDateTime(props.data.date)}</h2>
                        <h2>{props.data.venue}</h2>
                    </div>
                </div>

            </div>
        </NavLink>
    );
}

export default MatchCard;