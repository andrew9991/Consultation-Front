import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import api from "../../Axios";
import getMatchData from "../../commonFunctions";
import NavBar from "../Navbar/NavBar";
import classes from './Match.module.css';
import Seats from "./Seats";

function Match() {
    var match_id = useParams().match_id;
    var venueData,seats;
    const [matchData, setMatchData] = useState({});
    const [seatsArray, setSeatsArray] = useState([]);
    
    async function getData() {
        try {
            
            let md = await api.get(`/matches/${match_id}`);
            md = await getMatchData(md.data);
            console.log(md);
            setMatchData(md);
            venueData = await api.get(`/venues/${md.venue}`);
            venueData = venueData.data;
            // console.log(venueData.data);
            seats = await api.get(`/seats/matches/${match_id}`);
            seats = seats.data;
            // console.log(seats.data);
            setSeatsArray(decryptSeats());
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    function decryptSeats(){
        var rows = venueData.rows;
        var cols = venueData.seats_per_row;
        var string = seats.seats;
        // console.log(string.length);
        var seatsArray = [];
        for(var i=0;i<rows;i++){
            seatsArray.push([]);
            for(var j=0;j<cols;j++){
                seatsArray[i].push(parseInt(string[i*cols+j]));
            }
        }
        // console.log(seatsArray);
        return seatsArray;
    }

    return ( 
        <div className={classes.match}>
            <NavBar></NavBar>
            <div className={classes.body}>
                <h1 className={classes.center}>Reserve Seat</h1>
                <Seats seatsArray={seatsArray} setSeatsArray={setSeatsArray}></Seats>

                <h1 className={classes.center}>Match Details</h1>
                {matchData != null && 
                <div className={classes.details}>
                    <div className={classes.center}>
                        <h2>{matchData.team_A} <span className="linearRB">VS</span> {matchData.team_B}</h2>
                    </div>
                    <div>
                        <h3><span className="linearRB">Date: </span> {matchData.date}</h3>
                        <h3><span className="linearRB">Venue: </span> {matchData.venue}</h3>
                        <h3><span className="linearRB">Referee: </span> {matchData.referee}</h3>
                        <h3><span className="linearRB">Linesman 1: </span> {matchData.linesman1}</h3>
                        <h3><span className="linearRB">Linesman 2: </span> {matchData.linesman2}</h3>
                    </div>
                </div>}
            </div>
        </div>
     );
}

export default Match;