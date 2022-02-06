import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Alert(props) {
    let location = useLocation();
    let bg = ""
    if (location.pathname === "/") {
        bg = "#2079fd";
    } else {
        bg = "";
    }
    
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '50px', background: bg }} >
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}
