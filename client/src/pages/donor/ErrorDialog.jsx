import React from "react";

function ErrorDialog({onClick, message}) {
    return (
        <div className="error-dialog-overlay">
            <div className="error-dialog" >
                <p>{message}</p>
                <button className="ok-btn" onClick={onClick} >OK</button>
            </div>
        </div>
    ) 
}

export default ErrorDialog;