import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './ManagerMatches.module.css';

function ManagerMatches() {
    const [matches, setMatches] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    async function getMatches() {
        try {
            var matches = await api.get(`/matches/manager/`,{
                manager_id: user.user_id
            });
            matches = matches.data;
            for(var i = 0; i < matches.length; i++){
                var teamA = await api.get(`/teams/${matches[i].team_A}`);
                teamA = teamA.data;
                matches[i].teamA = teamA;
                var teamB = await api.get(`/teams/${matches[i].team_B}`);
                teamB = teamB.data;
                matches[i].teamB = teamB;
            }
            // console.log(matches);
            setMatches(matches);
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getMatches();
    }, []);

    return ( 
        <div className="home">
            <div className="habdZaka">
                <NavBar></NavBar>
                <div className={classes.myMatches}>
                <h1>My Matches</h1>
                    <div className={classes.matchList}>
                    {matches.length > 0 && 
                    matches.map((match) => {
                        return (
                            <NavLink to={`/match/${match.match_id}`} className="noDec">
                                <div className={classes.match}>
                                    <div className={classes.flex}>
                                            <h2>{match.teamA.team_name}</h2>
                                            <h2 className={`linearRB ${classes.vs}`}>VS</h2>
                                            <h2>{match.teamB.team_name}</h2>
                                    </div>
                                    <div className={classes.flex}>
                                        <h2>{match.date}</h2>
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })}
                    </div>
                </div>
                <div className={classes.buttons}>
                    <NavLink to={"/create_match"} className= "noDec">
                        <button className="button"> Create Match</button>
                    </NavLink>
                    <NavLink to={"/add_stadium"} className= "noDec">
                        <button className="button">Add Stadium</button>
                    </NavLink>
                </div>
            </div>
        </div>
     );
}

export default ManagerMatches;