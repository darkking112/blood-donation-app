import React, { useState } from "react";
import "./addNurse.css"

function AddNurse({onAdd, onCancel}) {
    const [Nurse_Name, setNurse_Name] = useState("");
    const [Nurse_Age, setNurse_Age] = useState("");
    const [Nurse_Email, setNurse_Email] = useState("");
    const [Nurse_Password, setNurse_Password] = useState("");
    const [Gender, setGender] = useState("");
    const [License_No, setLicense_No] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNurse = {
            Nurse_Name: Nurse_Name,
            Nurse_Age: Nurse_Age,
            Nurse_Email: Nurse_Email,
            Nurse_Password: Nurse_Password,
            Gender: Gender,
            License_No
        }
        onAdd(newNurse);
        setNurse_Name("");
        setNurse_Age("");
        setNurse_Email("");
        setNurse_Password("");
        setGender("");
        setLicense_No("");
    }

    return (
        <div className="overlay">
            <div className="add-nurse-dialog">
                <form onSubmit={handleSubmit} className="add-nurse-form">
                    <div className="form-group">
                        <label htmlFor="name">Nurse Name</label>
                        <input
                            id="name"
                            type="text"
                            value={Nurse_Name}
                            onChange={(e) => setNurse_Name(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Nurse Age</label>
                        <input
                            type="number"
                            id="age"
                            value={Nurse_Age}
                            onChange={(e) => setNurse_Age(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Nurse Email</label>
                        <input
                            type="text"
                            id="email"
                            value={Nurse_Email}
                            onChange={(e) => setNurse_Email(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Nurse Password</label>
                        <input
                            id="password"
                            type="password"
                            value={Nurse_Password}
                            onChange={(e) => setNurse_Password(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Nurse Gender</label>
                        <select
                            id="gender"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" disabled></option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="licenseNo">License No</label>
                        <input
                            id="licenseNo"
                            type="text"
                            value={License_No}
                            onChange={(e) => setLicense_No(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="confirm-add-nurse-btn">Add Nurse</button>
                    <button type="button" className="cancel-adding-btn" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
} 

export default AddNurse;