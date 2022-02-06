import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';
import userContext from '../context/users/userContext';
import noteContext from '../context/notes/noteContext';
import signupImage from "../img/create_account.svg"

const Signup = () => {
    const usrContext = useContext(userContext);
    const notContext = useContext(noteContext);
    const alrtContext = useContext(alertContext);
    const { response, createUser, getUser } = usrContext;
    const { getNotes } = notContext;
    const { showAlert } = alrtContext;
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user/home");
            getNotes();
            getUser(localStorage.getItem("authToken"));
        } else {
            navigate("/signup");
        }
        // eslint-disable-next-line
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            await createUser(credentials.name, credentials.email, credentials.password);
            resetAllInputFields();
            handleRedirect();
        } else {
            showAlert("Password Not Matched!", "danger")
        }
    };

    const handleRedirect = async () => {
        if (response.success) {
            // Redirect to User Homepage
            localStorage.setItem("authToken", response.authToken);
            await getUser(response.authToken);
            showAlert("You are Successfully Signed Up!", "success");
            navigate("/user/home");
        } else {
            console.log("Error :", response.error);
            showAlert(response.error, "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const resetAllInputFields = () => {
        document.querySelectorAll("input")
            .forEach(input => (input.value = ""));
        setCredentials({ name: "", email: "", password: "", cpassword: "" });
    };

    return (
        <section className="my-5">
            <div className="container h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={signupImage} className="img-fluid px-5 py-5" alt="Signup" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h1 className="my-4 fw-bold">Signup to Continue</h1>
                        <form onSubmit={handleSignup}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" className="form-control form-control-lg" autoComplete="on" onChange={onChange} minLength={5} required />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input type="email" id="emailInput" name="email" className="form-control form-control-lg" autoComplete="on" onChange={onChange} required />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" autoComplete="on" onChange={onChange} minLength={6} required />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="cpassword">Comfirm Password</label>
                                <input type="password" id="cpassword" name="cpassword" className="form-control form-control-lg" autoComplete="on" onChange={onChange} minLength={6} required />
                            </div>

                            <div className="d-grid">
                                <button type="submit" disabled={(credentials.name.length <= 5) || (credentials.email.length <= 10) || (credentials.password.length <= 6) || (credentials.cpassword.length <= 6)} className="btn btn-primary btn-lg" >Sign Up</button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <div className="d-grid">
                                <Link className="btn btn-primary btn-lg btn-block" to="/login" >
                                    Login In
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
