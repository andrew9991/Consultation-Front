import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './CreateMatch.module.css';

function EditMatch() {
    const {register, handleSubmit} = useForm();
    const [match, setMatch] = useState(null);
    const [error, setError] = useState(null);
    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);
    const [date, setDate] = useState(null);
    const [referee, setReferee] = useState(null);
    const [linesman1, setLinesman1] = useState(null);
    const [linesman2, setLinesman2] = useState(null);
    const [teams, setTeams] = useState([]);

    const navigate =useNavigate();
    var match_id = useParams().match_id;
    async function getData(){
        try{
            let teamsReq = await api.get('/teams/');
            teamsReq = teamsReq.data;
            setTeams(teamsReq);

            let matchReq = await api.get(`/matches/${match_id}/`);
            matchReq = matchReq.data;
            matchReq.date = matchReq.date.slice(0, -4);
            setTeamA(matchReq.team_A);
            setTeamB(matchReq.team_B);
            setDate(matchReq.date);
            setReferee(matchReq.referee);
            setLinesman1(matchReq.linesman1);
            setLinesman2(matchReq.linesman2);
            setMatch(matchReq);
        }
        catch(err){
            setError(err.response.data.error);
        }
    }

    async function editMatch(){
        let dat = new Date(date);
        let today = new Date();
        if(dat < today){
            setError("Date cannot be in the past");
            return;
        }
        if(teamA === teamB){
            setError("Teams cannot be same");
            return;
        }
        try{
            await api.post(`/matches/update/`, {
                match_id: match.match_id,
                team_A: teamA,
                team_B: teamB,
                date: date,
                venue: match.venue,
                referee: referee,
                linesman1: linesman1,
                linesman2: linesman2,
                manager: match.manager
            });
            navigate(`/manager_matches/${match.manager}`);
        }
        catch(err){
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
                    <h1>Edit Match</h1>
                    {linesman1 &&
                    <form method='POST' onSubmit={handleSubmit(editMatch)}>
                        <div className={classes.formGroup}>
                            <div className="flex">
                                <div>
                                    <select className="input" name="teamA" id="teamA" defaultValue={teamA} onChange={(e) => setTeamA(e.target.value)}>
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
                                    <select className="input" name="teamB" id="teamB" defaultValue={teamB} onChange={(e) => setTeamB(e.target.value)}>
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
                                <p className={`linearRB ${classes.header}`}>Date</p>
                                <input required type="datetime-local" className={`input ${classes.inp}`} name="date" id="date" defaultValue={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Referee</p>
                                <input required placeholder="Referee" type="text" className={`input ${classes.inp}`} name="referee" id="referee" defaultValue={referee} onChange={(e) => setReferee(e.target.value)}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Linesman 1</p>
                                <input required placeholder="Linesman 1" type="text" className={`input ${classes.inp}`} name="linesman1" id="linesman1" defaultValue={linesman1} onChange={(e) => setLinesman1(e.target.value)}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Linesman 2</p>
                                <input required placeholder="Linesman 2" type="text" className={`input ${classes.inp}`} name="linesman2" id="linesman2" defaultValue={linesman2} onChange={(e) => setLinesman2(e.target.value)}/>
                            </div>
                            <br />
                            <div className={"flex " + classes.bottom}>
                                <button type="submit" className={`button`}>Edit</button>
                            </div>
                            <div>
                                {error && <p className="error">{error}</p>}
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
     );
}

export default EditMatch;