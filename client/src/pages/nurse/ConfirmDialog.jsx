import React, { useState } from "react";
import "./confrimDialog.css"
function ConfrimDialog({onApprove, onCancel}) {
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onApprove(type, amount);
    }

    return (
        <div className="approve-appointment-overlay">
            <div className="confrim-dailog">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Blood type</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)} 
                            required
                        >
                            <option value="" disabled></option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <select
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        >
                            <option value="" disabled></option>
                            <option value="250">250</option>
                            <option value="300">300</option>
                            <option value="350">350</option>
                            <option value="400">400</option>
                            <option value="450">450</option>
                            <option value="500">500</option>
                            <option value="550">550</option>
                            <option value="600">600</option>
                        </select>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="confrim-appointment-btn">Confirm</button>
                        <button type="button" className="cancel-confrim-appointment-btn" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ConfrimDialog;