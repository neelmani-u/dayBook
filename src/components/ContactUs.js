import React, { useContext, useState } from 'react';
import alertContext from '../context/alerts/alertContext';

const ContactUs = () => {
    const alert = useContext(alertContext);
    const { showAlert } = alert;
    const [credentials, setCredentials] = useState({ name: "", email: "", comment: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials.name, credentials.email, credentials.comment);
        showAlert("Your response send Successfully!", "success");
        resetAllInputFields();
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const resetAllInputFields = () => {
        document.querySelectorAll("input")
            .forEach(input => (input.value = ""));
        setCredentials({ name: "", email: "", comment: "" });
    };

    return (
        <section className="my-5">
            <div className="d-flex justify-content-center">
                <div>
                    <h1 className="my-4 fw-bold">Contact Us</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" className="form-control form-control-lg" autoComplete="on" value={credentials.name} onChange={onChange} minLength={3} required />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" className="form-control form-control-lg" autoComplete="on" value={credentials.email} onChange={onChange} minLength={10} required />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="comment">Comment</label>
                            <textarea id="comment" name="comment" rows="4" cols="50" className="form-control form-control-lg" autoComplete="on" value={credentials.comment} onChange={onChange} minLength={50} required />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={(credentials.name.length <= 3) || (credentials.email.length <= 10) || (credentials.comment.length <= 50)} >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
