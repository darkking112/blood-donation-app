import React, { useState, useEffect } from "react";
import "./changeAdmin.css";

function ChangeAdmin({ currentAdmin, onClose, onSave }) {
    const [DC_Admin_Name, setDC_Admin_Name] = useState("");
    const [DC_Admin_Age, setDC_Admin_Age] = useState("");
    const [DC_Admin_Email, setDC_Admin_Email] = useState("");
    const [DC_Admin_Password, setDC_Admin_Password] = useState("");

    useEffect(() => {
        if (currentAdmin) {
            setDC_Admin_Name(currentAdmin.DC_Admin_Name || "");
            setDC_Admin_Age(currentAdmin.age || "");
            setDC_Admin_Email(currentAdmin.DC_Admin_Email || "");
        }
    }, [currentAdmin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAdmin = {
            DC_Admin_Name: DC_Admin_Name,
            DC_Admin_Age: DC_Admin_Age,
            DC_Admin_Email: DC_Admin_Email,
            DC_Admin_Password: DC_Admin_Password
        };
        onSave(newAdmin);
        onClose();
    };

    return (
        <div className="overlay">
            <div className="dialog-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">DC Admin Name</label>
                        <input
                            id="name"
                            type="text"
                            value={DC_Admin_Name}
                            onChange={(e) => setDC_Admin_Name(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Admin Age</label>
                        <input
                            id="age"
                            type="number"
                            value={DC_Admin_Age}
                            onChange={(e) => setDC_Admin_Age(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Admin Email</label>
                        <input
                            id="email"
                            type="email"
                            value={DC_Admin_Email}
                            onChange={(e) => setDC_Admin_Email(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Admin Password</label>
                        <input
                            id="password"
                            type="password"
                            value={DC_Admin_Password}
                            onChange={(e) => setDC_Admin_Password(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="change-btn">Confirm</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangeAdmin;
