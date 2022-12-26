import { useContext, useEffect, useState } from "react";
import { NavLink, useParams} from "react-router-dom";
import api from "../../Axios";
import getMatchData from "../../commonFunctions";
import NavBar from "../Navbar/NavBar";
import classes from './Match.module.css';
import seatClasses from './Seats.module.css';
import Seats from "./Seats";
import { UserContext } from "../../UserContext";

function Match() {
    var match_id = useParams().match_id;
    var venueData,seats;
    const [matchData, setMatchData] = useState({});
    const [seatsArray, setSeatsArray] = useState([]);
    const userContext = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"));
    //stadium 2d array 6x10 with value -1
    async function getData() {
        try {
            
            let md = await api.get(`/matches/${match_id}`);
            md = await getMatchData(md.data);
            // console.log(md);
            setMatchData(md);
            venueData = await api.get(`/venues/${md.venue}`);
            venueData = venueData.data;
            // console.log(venueData.data);
            seats = await api.get(`/seats/matches/${match_id}`);
            seats = seats.data;
            // console.log(seats.data);
            let sa = decryptSeats();
            if(user != null){
                let res = await api.get(`/reservations/user/`);
                res = res.data;
                // console.log(res);
                for(let i=0;i<res.length;i++){
                    if(res[i].match_id == match_id){
                        sa[res[i].row][res[i].seat] = 3;
                    }
                }
            }
            setSeatsArray(sa);
            // console.log(seatsArray);
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // useEffect(() => {
    //     console.log(seatsArray);
    // }, [seatsArray]);
    
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
    async function cancelReservations(){
        try{
            let req = {
                match_id: match_id,
                seats:[]
            };
            for(let i=0;i<seatsArray.length;i++){
                for(let j=0;j<seatsArray[i].length;j++){
                    if(seatsArray[i][j] == 4){
                        req.seats.push({
                            row: i,
                            seat: j
                        });
                    }
                }
            }

            let res = await api.post(`/reservations/cancel/`, req);
            //refresh page
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className={classes.match}>
            <div className={"habdZaka"}>
            <NavBar></NavBar>
            <div className={classes.body}>
                <h1 className={classes.center}>Reserve Seat</h1>
                <Seats seatsArray={seatsArray} setSeatsArray={setSeatsArray}></Seats>
                <div className={`flex ${classes.center} ${classes.info}`}>
                    <div className={`${seatClasses.seat} ${seatClasses.reserved}`}></div>
                    <p className="mr-10">Reserved</p>
                    <div className={`${seatClasses.seat} ${seatClasses.empty}`}></div>
                    <p className="mr-10">Available</p>
                    <div className={`${seatClasses.seat} ${seatClasses.selected}`}></div>
                    <p className="mr-10">Selected</p>
                    <div className={`${seatClasses.seat} ${seatClasses.youReserved}`}></div>
                    <p className="mr-10">You Reserved</p>
                    <div className={`${seatClasses.seat} ${seatClasses.cancelReservation}`}></div>
                    <p className="mr-10">Cancel Reservation</p>
                </div>
                {userContext.isLoggedIn && user.type != 3 &&
                <div className={`flex ${classes.buttons}`}>
                    <NavLink className={`noDec mr-10`} to={"/reserve"} state ={{matchId: match_id,
                        seatsArray: JSON.stringify(seatsArray)}}>
                        <div className={`${classes.reserveButton}`}>Reserve Seats</div>
                    </NavLink>
                    
                    <div className={`${classes.reserveButton} ${classes.cancelButton}`} onClick = {cancelReservations}>Cancel Reservations</div>
                </div>}           
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
        </div>
     );
}

export default Match;