import { useContext, useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import api from "../../Axios";
import getMatchData from "../../commonFunctions";
import { UserContext } from "../../UserContext";
import NavBar from "../Navbar/NavBar";
import classes from './Home.module.css';
import MatchCard from "./MatchCard";

function Home () {
    const [matches, setMatches] = useState([]);
    
    async function getMatches() {
        try {
            var matches = await api.get(`/matches`);
            matches = matches.data;
            // console.log(matches);
            for(let i=0;i<matches.length;i++){
                matches[i] = await getMatchData(matches[i]);
                // console.log(matches[i]);
            }
            setMatches(matches);
        } catch (err) {
            // console.log(err);
        }
    }
    useEffect(() => {
        getMatches();
    }, []);
    
    return (  
        <div className={classes.home}>
            <div className="habdZaka">
                <NavBar></NavBar>
                <div className={classes.matches}>
                    {matches.length > 0 ? matches.map((match) => {
                        return (
                            <div key={match.match_id} className={classes.center}>
                                <MatchCard data = {match}></MatchCard>
                            </div>
                        );
                    }) :
                    <div className={classes.rings}>
                        <Rings color="#3EB489" height={80} width={80} />
                    </div>
                    }     
                </div>
            </div>
        </div>
    );
}

export default Home;