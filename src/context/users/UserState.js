import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const URL = "http://localhost:5000";

    const [response, setResponse] = useState({});
    const [user, setUser] = useState({});

    // Get User
    const getUser = async (authToken) => {
        // API Call
        const url = `${URL}/api/auth/getuser`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        });
        const res = await resp.json();

        // Client Logic for getting user
        localStorage.setItem("userData", JSON.stringify(res.user));
        setUser(Object.assign(user, res.user));
    }

    // Add a User
    const createUser = async (name, email, password) => {
        // API Call
        const url = `${URL}/api/auth/createuser`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const res = await resp.json();

        // Client Logic for creating a User
        setResponse(Object.assign(response, res));
    }

    // User Login
    const userLogin = async (email, password) => {
        // API Call
        const url = `${URL}/api/auth/login`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const res = await resp.json();

        // Client Logic for logging in a User
        setResponse(Object.assign(response, res));
    }

    // Update a User
    const updateUser = async (id, name, password, newPassword) => {
        let obj = {}
        if (newPassword) {
            obj = { name, password, newPassword }
        } else {
            obj = { name, password }
        }

        // API Call
        const url = `${URL}/api/auth/updateuser/${id}`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem("authToken"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const res = await resp.json();
        console.log(res);

        // Client Logic for updating a User
        localStorage.setItem("userData", JSON.stringify(res.user));
        setUser(Object.assign(user, res.user));
    }

    return (
        <UserContext.Provider value={{ response, user, getUser, createUser, userLogin, updateUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;

