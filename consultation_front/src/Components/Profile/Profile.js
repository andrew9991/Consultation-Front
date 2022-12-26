import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './Profile.module.css';

function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    const [matches, setMatches] = useState([]);
    async function getReservations() {
        try{
            const response = await api.get(`/reservations/user/`);
            let matchIdsSet = new Set();
            for(let i=0;i<response.data.length;i++){
                matchIdsSet.add(response.data[i].match_id);
            }
            let matchIds = Array.from(matchIdsSet);
            let matches = [];
            for(let i=0;i<matchIds.length;i++){
                let match = await api.get(`/matches/${matchIds[i]}`);
                match = match.data;
                match.team_A = await api.get(`/teams/${match.team_A}`);
                match.team_A = match.team_A.data.team_name;
                match.team_B = await api.get(`/teams/${match.team_B}`);
                match.team_B = match.team_B.data.team_name;
                matches.push(match);
            }
            setMatches(matches);
        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        getReservations();
    }, []);

    return (  
        <div className="home">
            <div className="habdZaka">
                <NavBar/>
                <div className={classes.profile}>
                    <h1>{`${user.first_name} ${user.last_name}`}</h1>
                    <div className={classes.details}>
                        <div className={classes.headers}>
                            <h2 className={`linearRB ${classes.head}`}>Username:</h2>
                            <h2 className={`linearRB ${classes.head}`}>Email:</h2>
                            <h2 className={`linearRB ${classes.head}`}>Nationality:</h2>
                            <h2 className={`linearRB ${classes.head}`}>Date Of Birth:</h2>
                            <h2 className={`linearRB ${classes.head}`}>Gender:</h2>
                        </div>
                        <div className={classes.headers}>
                            <h2>{user.user_name}</h2>
                            <h2>{user.user_email}</h2>
                            <h2>{user.nationality}</h2>
                            <h2>{user.birth_date}</h2>
                            <h2>{user.gender}</h2>
                        </div>
                    </div>
                    <NavLink to={`/editProfile/${user.user_id}`} className={`noDec`}>
                        <div className={classes.edit}>
                            <h2>Edit Profile</h2>
                        </div>
                    </NavLink>
                    {matches.length > 0 &&
                        <div className={classes.center}>
                            <h1>Reservations</h1>
                            <div className={classes.matches}>
                                {matches.map((match) => {
                                    return (
                                        <NavLink key={match.match_id} to={`/match/${match.match_id}`} className={`noDec`}>
                                            <div className= {`${classes.reservation}`}>
                                                <h2 className="linearRB">{match.team_A} vs {match.team_B}</h2>
                                            </div>
                                        </NavLink>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;