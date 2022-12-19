import classes from "./Auth.module.css";
import "../../App.css"
function Register() {
    return ( 
        <div className={classes.background}>
            <div className={classes.card}>
                <div className={classes.left}>
                    <h1>Register</h1>
                    <form>
                        <div className={classes.formGroup}>
                            <div>
                                <input type="text" name="username" id="username"  placeholder="UserName" className="input"/>
                            </div>
                            <br />
                            <div>
                                <input type="text" className="input" placeholder="Email"/>
                            </div>
                            <br />
                            <div className="flex">
                                <input type="text" name="firstName" id = "firstName" className="input mr-10" placeholder="First Name"/>
                                <input type="text" name="lastName" id = "lastName" className="input" placeholder="Last Name"/>
                            </div>
                            <br />
                            <div className="flex">
                                <input type="date" className="input mr-10"/>
                                <select name="Gender" id="gender" className="input">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <br />
                            <div className="flex">
                                <input type="text" className="input mr-10" placeholder="Nationality"/>
                                <select name="role" id="role" className="input">
                                    <option value="manager">Manager</option>
                                    <option selected value="customer">Customer</option>
                                </select>
                            </div>
                            <br />
                            <div className="flex">
                                <input type="password" className="input mr-10" placeholder="Password"/>
                                <input type="password" className="input" placeholder="Confirm Password"/>
                            </div>
                            <br />
                            <button className={classes.regButton}>Register</button>
                        </div>
                    </form>

                </div>
                <div className={classes.right}>
                    <img className={classes.regImg} src="https://www.freepnglogos.com/uploads/football-player-png/football-player-cristiano-ronaldo-png-cristiano-ronaldo-png-image-20.png" alt="Register" />
                    <a className={classes.member} href="/login">I am already a member</a>
                </div>
            </div>
        </div>
     );
}

export default Register;