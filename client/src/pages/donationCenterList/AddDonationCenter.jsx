import React, { useState } from "react";
import "./addDonationCenter.css"
function AddDonationCenter ({onAdd, onCancel}) {
    const [DC_Admin_Name, setDC_Admin_Name] = useState("");
    const [DC_Admin_Age, setDC_Admin_Age] = useState("");
    const [DC_Admin_Email, setDC_Admin_Email] = useState("");
    const [DC_Admin_Password, setDC_Admin_Password] = useState("");
    const [DC_Name, setDC_Name] = useState("");
    const [DCAdressLink, setDC_Adress_Link] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCenter = {
            DC_Admin_Name: DC_Admin_Name,
            DC_Admin_Age: DC_Admin_Age,
            DC_Admin_Email: DC_Admin_Email,
            DC_Admin_Password: DC_Admin_Password,
            DC_Name: DC_Name,
            DCAdressLink: DCAdressLink
        };
        onAdd(newCenter);
        setDC_Admin_Name("");
        setDC_Admin_Age("");
        setDC_Admin_Email("");
        setDC_Admin_Password("");
        setDC_Name("");
        setDC_Adress_Link("");
    }

    return (
        <div className="overlay">
            <div className="add-DC-dialog">
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <label htmlFor="name">DC Admin Name</label>
                        <input
                            type="text"
                            id="name"
                            value={DC_Admin_Name}
                            onChange={(e) => setDC_Admin_Name(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Admin Age</label>
                        <input
                            type="number"
                            id="age"
                            value={DC_Admin_Age}
                            onChange={(e) => setDC_Admin_Age(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Admin Email</label>
                        <input
                            type="text"
                            id="email"
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
                    <div className="form-group">
                        <label htmlFor="dc-name">DC Name</label>
                        <input
                            type="text"
                            id="dc-name"
                            value={DC_Name}
                            onChange={(e) => setDC_Name(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">DC Address Link</label>
                        <input
                            type="text"
                            id="address"
                            value={DCAdressLink}
                            onChange={(e) => setDC_Adress_Link(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="add-donation-center-btn">Confirm</button>
                    <button type="button" className="cancel-adding-btn" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default AddDonationCenter;