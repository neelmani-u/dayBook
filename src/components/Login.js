import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';
import userContext from '../context/users/userContext';
import noteContext from '../context/notes/noteContext';
import loginImage from "../img/access_account.svg"

const Login = () => {
    const user = useContext(userContext);
    const note = useContext(noteContext);
    const alert = useContext(alertContext);
    const { response, userLogin, getUser } = user;
    const { getNotes } = note;
    const { showAlert } = alert;
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user/home");
            getNotes();
            getUser(localStorage.getItem("authToken"));
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        await userLogin(credentials.email, credentials.password);
        resetAllInputFields();
        handleRedirect();
    };

    const handleRedirect = async () => {
        if (response.success) {
            // Redirect to User Homepage
            localStorage.setItem("authToken", response.authToken);
            await getUser(response.authToken);
            showAlert("Logged in Sucsessfully!", "success");
            navigate("/user/home");
        } else {
            showAlert(response.error, "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const resetAllInputFields = () => {
        document.querySelectorAll("input")
        .forEach(input => (input.value = ""));
        setCredentials({ email: "", password: "" });
    };

    return (
        <section className="my-5">
            <div className="container h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={loginImage} className="img-fluid px-3 py-3" alt="Login" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h1 className="my-4 fw-bold">Login to Continue</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" autoComplete="on" value={credentials.email} onChange={onChange} required />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" autoComplete="on" value={credentials.password} onChange={onChange} minLength={6} required />
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="checkbox"
                                    />
                                    <label className="form-check-label" htmlFor="checkbox"> Remember me </label>
                                </div>
                                <Link to="/login">Forgot password?</Link>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg" disabled={(credentials.email.length <= 10) || (credentials.password.length <= 6)} >Log In</button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <div className="d-grid">
                                <Link className="btn btn-primary btn-lg btn-block" to="/signup" >
                                    Sign Up
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
