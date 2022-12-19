import classes from './Auth.module.css';
import '../../App.css'

function Login() {
    return (  
        <div className={classes.background}>
            <div className={classes.card}>
                <div className={classes.right}>
                    <img className={classes.regImg} src="https://efootballhub.net/images/efootball22/players/114_110718_l.png" alt="Register" />
                    <a className={classes.member} href="/register">Create an account</a>
                </div>
                <div className={classes.left}>
                    <h1>Log in</h1>
                    <form>
                        <div className={classes.formGroup}>
                            <div>
                                <input type="text" name="username" id="username"  placeholder="UserName" className="input"/>
                            </div>
                            <br />
                            <div>
                                <input type="password" className="input" placeholder="Password"/>
                            </div>
                            <br />
                            <button className={classes.regButton}>Log in</button>
                        </div>
                    </form>

                </div>
                
            </div>
        </div>
    );
}

export default Login;