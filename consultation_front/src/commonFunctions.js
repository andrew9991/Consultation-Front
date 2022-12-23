import api from "./Axios";

async function getMatchData(match){
    match.team_A = await api.get(`/teams/${match.team_A}`);
    match.team_A = match.team_A.data.team_name;
    match.team_B = await api.get(`/teams/${match.team_B}`);
    match.team_B = match.team_B.data.team_name;
    match.venue = await api.get(`/venues/${match.venue}`);
    match.venue = match.venue.data.venue_name;
    // console.log(match);
    return match;
} 

export default getMatchData;