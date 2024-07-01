import React from "react";
import "./donorHeader.css";
import { useNavigate } from "react-router-dom";

function DonorHeader({ btnText, donorID }) {
    let path = "";
    if (btnText === "Home")
        path = -1
    else
        path = `/previous-appointments/${donorID}`

    const navigate = useNavigate();

    return ( 
        <div className="donor-header">
            <button className="left-btn" onClick={() => navigate(path)}>{btnText}</button>
            <button className="right-btn"
                onClick={ ()=> navigate("/")}
            >Logout</button>
        </div>
    )
}

export default DonorHeader;