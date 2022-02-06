import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';


const NavBar = () => {
    const alrtContext = useContext(alertContext);
    let location = useLocation();

    const { showAlert } = alrtContext;

    const userData = JSON.parse(localStorage.getItem("userData"));

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        showAlert("Logged out Successfully!", "success");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><b>day</b>Book</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        {!localStorage.getItem("authToken") ?
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/demo" ? "active" : ""}`} aria-current="page" to="/demo">Demo</Link>
                                </li>
                            </> :
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/user/home" ? "active" : ""}`} aria-current="page" to="/user/home">Notes</Link>
                                </li>
                            </>}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contactus" ? "active" : ""}`} to="/contactus">Contact Us</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("authToken") ?
                        <>
                            <Link type="submit" className="btn btn-primary mx-1" to="/login">Login</Link>
                            <Link type="submit" className="btn btn-primary mx-1" to="/signup">Signup</Link>
                        </> :
                        <>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle" alt="User" />
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/user/home" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {userData.name} </Link>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/user/profile">Edit Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/demo">Support</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><Link className="dropdown-item" onClick={handleLogout} to="/login">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            {/* <Link type="submit" className="btn btn-primary mx-1" onClick={handleLogout} to="/login">Logout</Link> */}
                        </>}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
