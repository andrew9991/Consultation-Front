import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Axios";
import NavBar from "../Navbar/NavBar";
import classes from './EditProfile.module.css';

function EditProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    // const [user_name, setUserName] = useState(user.user_name);
    const [nationality, setNationality] = useState(user.nationality);
    const [birth_date, setBirthDate] = useState(user.birth_date);
    const [gender, setGender] = useState(user.gender);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();
    async function editProfile() {
        if(first_name === '' || last_name === '' || 
        nationality === '' || birth_date === ''){
            setError('Please fill all fields');
            return;
        }
        try{
            let userToEdit = user;
            userToEdit.first_name = first_name;
            userToEdit.last_name = last_name;
            userToEdit.nationality = nationality;
            userToEdit.birth_date = birth_date;
            userToEdit.gender = gender;
            const response = await api.post(`/user/update/`, {
                ...userToEdit
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate(`/profile/${user.user_id}`);
        }
        catch(err){
            setError('Something went wrong');
        }
    }

    async function changePassword() {
        if(oldPassword === '' || newPassword === ''){
            setError('Please fill all fields');
            return;
        }
        if(oldPassword !== user.user_password){
            setError('Old password is incorrect');
            return;
        }

        try{
            let userToEdit = user;
            user.user_password = newPassword;
            const response = await api.post(`/user/update/`, {
                ...userToEdit
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate(`/profile/${user.user_id}`);
        }
        catch(err){
            setError('Something went wrong');
        }
    }
    useEffect(() => {
        let genders = document.getElementsByName("gender");
        if(user.gender === "male"){
            genders[0].checked = true;
        }
        else{
            genders[1].checked = true;
        }
    }
    , [])

    return ( 
        <div className="home">
            <div className="habdZaka">
                <div>
                <NavBar></NavBar>

                    <div className={classes.editProfile}>
                        <h1>Edit Profile</h1>
                        <div className={classes.details}>
                            <div className={classes.headers}>
                                <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="fname">First Name</label> 
                                    <input type="text" id="fname" className={`input ${classes.inp}`} value={first_name} onChange={(e) => setFirstName(e.target.value)}></input>
                                </div>
                                <br />
                                <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" className={`input ${classes.inp}`} value={last_name} onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                                <br />
                                {/* <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="username">Username</label>
                                    <input type="text" id="username" className={`input ${classes.inp}`} value={user_name} onChange={(e) => setUserName(e.target.value)}></input>
                                </div>
                                <br /> */}
                                
                                <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="nationality">Nationality</label>
                                    <input type="text" id = "nationality" className={`input ${classes.inp}`} value={nationality} onChange={(e) => setNationality(e.target.value)}></input>
                                </div>
                                <br />
                                <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="birthdate">Birth Date</label>
                                    <input type="date" id="birthdate" className={`input ${classes.inp}`} value={birth_date} onChange={(e) => setBirthDate(e.target.value)}></input>
                                </div>
                                <br />
                                <div className={`${classes.flex}`}>
                                    <div className={"flex " + classes.radios}>
                                        <label className={classes.label} htmlFor="gender">Gender</label>
                                        <div className={classes.f}>
                                            <input type="radio" id = "male" name="gender" value={"male"} onClick={(e) => {
                                                setGender(e.target.value);
                                                }}/>
                                            <label htmlFor="male">Male</label>
                                        </div>
                                        <div className={classes.g}>
                                            <input type="radio" id = "female" name="gender" value={"female"} onClick={(e) => setGender(e.target.value)}/>
                                            <label htmlFor="female">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.edit}>
                            <button className={classes.button} onClick={editProfile}>Edit</button>
                        </div>
                        <div className={`${classes.details} ${classes.password}`}>
                            <div className={`${classes.headers}`}>
                                <div className={`${classes.flex} `}>
                                    <label className={classes.label} htmlFor="oldPassword">Old Password</label>
                                    <input type="password" id="oldPassword" className={`input ${classes.inp}`} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
                                </div>
                                <br />
                                <div className={classes.flex}>
                                    <label className={classes.label} htmlFor="newPassword">New Password</label>
                                    <input type="password" id="newPassword" className={`input ${classes.inp}`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className={classes.edit}>
                            <button onClick={changePassword} className={`${classes.button} ${classes.passButton}`} >Change Password</button>
                        </div>
                        <div className={classes.error}>
                            <p>{error}</p>
                        </div>
                    </div>
                                    
                </div>
            </div>
        </div>
     );
}

export default EditProfile;