import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './CreateMatch.module.css';

function AddStadium() {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    async function createStadium(data) {
        try {
            const stadium = {
                venue_name: data.stadiumName,
                rows: data.seatRows,
                seats_per_row: data.seatColumns,
            }
            // console.log(stadium);
            const res = await api.post('/venues/add_venue', stadium);
            // console.log(res);
            navigate(`/manager_matches/${user.user_id}`);
        } catch (err) {
            // console.log(err);
            setError(err.response.data.error);
        }
    }
    return ( 
        <div className="home">
            <div className="habdZaka">
                <NavBar></NavBar>
                <div className={classes.createMatch}>
                    <h1>Add Stadium</h1>
                    <form method='POST' onSubmit={handleSubmit(createStadium)}>
                        <div className={classes.formGroup}>
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Stadium Name</p>
                                <input required type="text" className={`input ${classes.inp}`} name="stadiumName" id="stadiumName" {...register("stadiumName")}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Seat Rows</p>
                                <input required type="number" className={`input ${classes.inp}`} name="seatRows" id="seatRows" {...register("seatRows")}/>
                            </div>
                            <br />
                            <div className={classes.flex}>
                                <p className={`linearRB ${classes.header}`}>Seat Columns</p>
                                <input required type="number" className={`input ${classes.inp}`} name="seatColumns" id="seatColumns" {...register("seatColumns")}/>
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

export default AddStadium;