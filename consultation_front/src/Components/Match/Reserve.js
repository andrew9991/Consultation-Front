import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../Axios';
import classes from './Reserve.module.css';

function Reserve() {
    let location = useLocation();
    // console.log(location.state);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    async function reserveSeats() {
        console.log('Reserving Seats');
        try {
            let seats = JSON.parse(location.state.seatsArray);
            let match_id = location.state.matchId;
            let req = {match_id,
                 seats:[]};
            for (let i = 0; i < seats.length; i++) {
                for (let j = 0; j < seats[i].length; j++) {
                    if (seats[i][j] === 2) {
                        req.seats.push({
                            row: i,
                            seat: j
                        });
                    }
                }
            }
            // console.log(req);
            await api.post('/reservations/reserve/', req);
            navigate(`/match/${match_id}`);
        } catch (err) {
            console.log(err);
        }
    }
    return (  
        <div className={classes.background}>
            <div className={classes.card}>
                <form method='POST' onSubmit={handleSubmit(reserveSeats)}>
                    <input required type="number" placeholder='Card Number' className='input' />
                    <br />
                    <br />
                    <input required type="number" placeholder='Pin Number' className='input' />
                    <br />
                    <br />
                    <div className='centerm'>
                        <button type="submit" className={classes.reserveButton}>Reserve</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Reserve;