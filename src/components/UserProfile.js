import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/users/userContext';
import alertContext from '../context/alerts/alertContext';

const UserProfile = () => {
    const usrContext = useContext(userContext);
    const alrtContext = useContext(alertContext);
    const navigate = useNavigate();
    const { user, updateUser } = usrContext;
    const { showAlert } = alrtContext;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [credentials, setCredentials] = useState({ name: userData.name, email: userData.email, password: "", npassword: "", cnpassword: "" });

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user/profile");
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (credentials.npassword === credentials.cnpassword) {
            await updateUser(user._id, credentials.name, credentials.password);
            showAlert("User Profile Updated Successfully!", "success");
            setCredentials({ name: user.name, email: user.email, password: "", npassword: "", cnpassword: "" });
        } else {
            showAlert("Password Not Matched!", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container rounded bg-white mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="User" />
                        <span className="font-weight-bold">{userData.name}</span>
                        <span className="text-black-50">{userData.email}</span>
                        <span> </span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5" >
                        <form onSubmit={handleUpdate}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12"><label className="labels" htmlFor="name" >Name</label><input type="text" className="form-control" placeholder="Full Name" id="name" name="name" value={credentials.name} autoComplete="on" onChange={onChange} minLength={5} /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels" htmlFor="email" >Email ID</label><input type="text" className="form-control" placeholder="Enter Email Id" id="email" name="email" value={credentials.email} autoComplete="on" onChange={onChange} minLength={6} /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels" htmlFor="password" >Current Password</label><input type="password" className="form-control" placeholder="Enter Current Password" id="password" name="password" value={credentials.password} autoComplete="on" onChange={onChange} minLength={5} required /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels" htmlFor="npassword" >Enter New Password</label><input type="password" className="form-control" placeholder="Enter New Password" id="npassword" name="npassword" value={credentials.npassword} autoComplete="on" onChange={onChange} minLength={5} /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels" htmlFor="cnpassword" >Confirm New Password</label><input type="password" className="form-control" placeholder="Confirm New Password" id="cnpassword" name="cnpassword" value={credentials.cnpassword} autoComplete="on" onChange={onChange} minLength={5} required={credentials.npassword !== ""} /></div>
                            </div>
                            <div className="mt-5 d-grid"><input className="btn btn-primary profile-button" type="submit" disabled={(credentials.name === user.name) && (credentials.email === user.email) && (credentials.password === "")} /></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
