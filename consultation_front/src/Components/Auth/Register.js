import classes from "./Auth.module.css";
import "../../App.css"
import { useContext, useState } from "react";
import api from "../../Axios";
import { UserContext } from "../../UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function Register() {
    const userContext = useContext(UserContext);
    const {register, handleSubmit, errors} = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function registerUser(data) {
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        let user = {
            user_name: data.username,
            user_email: data.email,
            user_password: data.password,
            type: data.type,
            first_name: data.firstName,
            last_name: data.lastName,
            birth_date: data.date,
            gender : data.gender,
            nationality: data.nationality
        };
        console.log(user);
        const res = await api.post("/user/register/", {
            ...user
        }).catch((err) => {
            setError(err.response.data.error);
        });
        if (res.status === 200) {
            if(res.data.type == 1 && !res.data.is_approved){
                setError('Wait for an admin to approve your account');
                return;
            }
            userContext.login(res.data.Access);
            localStorage.setItem('user', JSON.stringify(res.data));
            //redirect to home
            navigate("/home");
        }
    }
    return ( 
        <div className={classes.background}>
            <div className={classes.card}>
                <div className={classes.left + " " + classes.full}>
                    <h1>Register</h1>
                    <form method="POST" onSubmit={handleSubmit(registerUser)}>
                        <div className={classes.formGroup}>
                            <div>
                                <input required type="text" name="username" id="username" {...register("username")}  placeholder="UserName" className="input"/>
                            </div>
                            <br />
                            <div>
                                <input required type="text" className="input" {...register("email")} placeholder="Email"/>
                            </div>
                            <br />
                            <div className="flex">
                                <input required type="text" name="firstName" id = "firstName" {...register("firstName")} className="input mr-10" placeholder="First Name"/>
                                <input required type="text" name="lastName" id = "lastName" {...register("lastName")} className="input" placeholder="Last Name"/>
                            </div>
                            <br />
                            <div className="flex">
                                
                                <input type="text" placeholder="Date of birth" onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} className="input mr-10" {...register("date")}
                                style = {{
                                    marginRight: "20px"
                                }}/>
                                <div className={"flex " + classes.radios}>
                                    <div>
                                        <input type="radio" id = "male" {...register("gender")} name="gender" value={"male"}/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" id = "female" {...register("gender")} name="gender" value={"female"}/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="flex">
                                <input type="text" className="input mr-10" {...register("nationality")} placeholder="Nationality"/>
                                <select {...register("type")} className="input">
                                    <option value="1">Manager</option>
                                    <option value="2">Customer</option>
                                </select>
                            </div>
                            <br />
                            <div className="flex">
                                <input required type="password" className="input mr-10" {...register("password")} placeholder="Password"/>
                                <input required type="password" className="input" {...register("confirmPassword")} placeholder="Confirm Password"/>
                            </div>
                            <br />
                            <div className={"flex " + classes.bottom}>
                                <button type="submit" className={classes.regButton}>Register</button>
                                <a className={classes.member + " none " + classes.show} href="/login">I am already a member</a>
                            </div>
                        </div>
                    </form>
                        <div className="error">
                    {error}
                    </div>
                </div>
                <div className={classes.right + " " + classes.hide}>
                    <img className={classes.regImg} src={require("../../Assets/Images/register.png")} alt="Register" />
                    <a className={classes.member} href="/login">I am already a member</a>
                </div>
            </div>
        </div>
     );
}

export default Register;