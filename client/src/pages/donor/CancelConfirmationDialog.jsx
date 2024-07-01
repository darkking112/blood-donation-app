import React from "react";

const CancelConfirmationDialog = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <p>Are you sure you want to cancel your appointment?</p>
                <button className="confirm-appointment-btn" onClick={onConfirm}>Confirm</button>
                <button className="cancel-confirm-appointment-btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    ) 
}

export default CancelConfirmationDialog;