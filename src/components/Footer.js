import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    let location = useLocation();
    let navigate = useNavigate();
    var CurrentYear = new Date().getFullYear()

    const goToAbout = (e)=>{
        e.preventDefault();
        if (location.pathname !== "/"){
            navigate("/");
        }
        document.getElementById("aboutSection").scrollIntoView();
    };

    const goToServices = (e)=>{
        e.preventDefault();
        if (location.pathname !== "/"){
            navigate("/");
        }
        document.getElementById("services").scrollIntoView();
    };

    return (
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
                <li className="nav-item"><Link to="/" onClick={goToServices} className="nav-link px-2 text-muted">Services</Link></li>
                {/* <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Pricing</Link></li> */}
                {/* <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">FAQs</Link></li> */}
                <li className="nav-item"><Link to="/" onClick={goToAbout} className="nav-link px-2 text-muted">About</Link></li>
                <li className="nav-item"><Link to="/contactus" className="nav-link px-2 text-muted">Contact Us</Link></li>
            </ul>
            <p className="text-center text-muted">© {CurrentYear} <b>day</b>Book Inc.</p>
        </footer>
    );
};

export default Footer;
