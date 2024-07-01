import React from "react";
import "./dialog.css"
const ConfirmationDialog = ({ show, onConfirm, onCancel, name }) => {
    if (!show)
        return null;

    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <p>Are you sure you want to remove {name}?</p>
                <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    ) 
}

export default ConfirmationDialog;