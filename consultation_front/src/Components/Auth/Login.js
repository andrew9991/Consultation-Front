import classes from './Auth.module.css';
import '../../App.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import api from '../../Axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
    const userContext = useContext(UserContext);
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function loginUser(data) {
        const res = await api.post('/user/sign_in/', {
            user_name: data.username,
            user_password: data.password
        }).catch((err) => {
            // console.log(err.response.data.error);
            setError(err.response.data.error);
        });
        if (res.status === 200) {
            // console.log(res.data);
            userContext.login(res.data.Access);
            localStorage.setItem('user', JSON.stringify(res.data));
            //redirect to home
            navigate('/home');
        } 
    }
    return (  
        <div className={classes.background}>
            <div className= {classes.card + " " + classes.login}>
                <div className={classes.right + " " + classes.hide}>
                    <img className={classes.regImg} src={require("../../Assets/Images/login.png")} alt="Register" />
                    <a className={classes.member} href="/register">Create an account</a>
                </div>
                <div className={classes.left+ " " + classes.full}>
                    <h1>Log in</h1>
                    <form method='POST' onSubmit={handleSubmit(loginUser)}>
                        <div className={classes.formGroup}>
                            <div>
                                <input {...register("username")} type="text" name="username" id="username"  placeholder="UserName" className="input"/>
                            </div>
                            <br />
                            <div>
                                <input {...register("password")} type="password" className="input" placeholder="Password"/>
                            </div>
                            <br />
                            <div className={"flex " + classes.bottom}>
                                <button type="submit" className={classes.regButton}>Log in</button>
                                <a className={classes.member + " none " + classes.show} href="/register">Create an account</a>
                            </div>
                        </div>
                    </form>
                    <div>
                        <p className="error">{error}</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Login;