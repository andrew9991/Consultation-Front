import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './CreateMatch.module.css';

function CreateMatch() {

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);

    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    async function getData(){
        try{
            let teamsReq = await api.get('/teams/');
            teamsReq = teamsReq.data;
            setTeams(teamsReq);

            let venuesReq = await api.get('/venues/');
            venuesReq = venuesReq.data;
            setVenues(venuesReq);
        }
        catch(err){
            setError(err.response.data.error);
        }
    }

    async function createMatch(data) {
        data.teamA = data.teamA.length > 0 ? data.teamA : 1;
        data.teamB = data.teamB.length > 0 ? data.teamB : 1;
        data.venue = data.venue.length > 0 ? data.venue : 1;

        if(data.teamA === data.teamB){
            setError("Teams cannot be same");
            return;
        }
        const today = new Date();
        let date = new Date(data.date);
        if(date < today){
            setError("Date cannot be in the past");
            return;
        }
        try {
            const match = {
                team_A: data.teamA,
                team_B: data.teamB,
                venue: data.venue,
                date: data.date,
                referee: data.referee,
                linesman1: data.linesman1,
                linesman2: data.linesman2,
            }
            // console.log(match);
            const res = await api.post('/matches/create/', match);
            // console.log(res);
            navigate(`/manager_matches/${user.user_id}`);
        } catch (err) {
            // console.log(err);
            setError(err.response.data.error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return ( 
        <div className="home">
            <div className="habdZaka">
                <NavBar></NavBar>
                <div className={classes.createMatch}>
                    <h1>Create Match</h1>
                    <form method='POST' onSubmit={handleSubmit(createMatch)}>
                        <div className={classes.formGroup}>
                            <div className="flex">
                                <div>
                                    <select {...register("teamA")} defaultValue = {1} className="input" name="teamA" id="teamA">
                                        {teams.length > 0 &&
                                            teams.map((team) => {
                                                return (
                                                    <option key={`A${team.team_id}`} value={team.team_id}>{team.team_name}</option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                                <p className={`linearRB ${classes.vs}`}>VS</p>
                                <div>
                                    <select {...register("teamB")} className="input" name="teamB" id="teamB">
                                        {teams.length > 0 &&
                                            teams.map((team) => {
                                                return (
                                                    <option key={`B${team.team_id}`} value={team.team_id}>{team.team_name}</option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Venue</p>
                                <select className={`input ${classes.inp}`} name="venue" id="venue" {...register("venue")}>
                                    {venues.length > 0 &&
                                        venues.map((venue) => {
                                            return (
                                                <option key={`Stad${venue.venue_id}`} value={venue.venue_id}>{venue.venue_name}</option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Date</p>
                                <input required type="datetime-local" className={`input ${classes.inp}`} name="date" id="date" {...register("date")}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Referee</p>
                                <input required placeholder="Referee" type="text" className={`input ${classes.inp}`} name="referee" id="referee" {...register("referee")}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Linesman 1</p>
                                <input required placeholder="Linesman 1" type="text" className={`input ${classes.inp}`} name="linesman1" id="linesman1" {...register("linesman1")}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Linesman 2</p>
                                <input required placeholder="Linesman 2" type="text" className={`input ${classes.inp}`} name="linesman2" id="linesman2" {...register("linesman2")}/>
                            </div>
                            <br />
                            <div className={"flex " + classes.bottom}>
                                <button type="submit" className={`button`}>Create</button>
                            </div>
                            <div>
                                {error && <p className="error">{error}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default CreateMatch;