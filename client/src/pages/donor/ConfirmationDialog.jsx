import React from "react";

const ConfirmationDialog = ({ center, date, time, onConfirm, onCancel }) => {
    console.log(center, date, time);
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <p>Are you sure you want to confirm your donation appointment in {center} at {time} on the {date}?</p>
                <button className="confirm-appointment-btn" onClick={onConfirm}>Confirm</button>
                <button className="cancel-confirm-appointment-btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    ) 
}

export default ConfirmationDialog;