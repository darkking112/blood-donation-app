import React from "react";
import { useNavigate } from "react-router-dom";
import "./workersHeader.css"

function WorkersHeader({ buttonText, name }) {
    const navigate = useNavigate();
    return (
        <div className="header">
            <h3>Welcome {name}</h3>
            <button className="logout-btn" onClick={() => navigate("/")}>{buttonText}</button>
        </div>
    )
}

export default WorkersHeader;