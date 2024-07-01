import React, { useState } from "react";

function PersonalInfoDialog({ donor, onConfirm, onCancel }) {
    const [name, setName] = useState(donor.Donor_Name);
    const [age, setAge] = useState(donor.Donor_Age);
    const [gender, setGender] = useState(donor.Gender);
    const [nationality, setNationality] = useState(donor.Nationality);
    const [IC, setIC] = useState(donor.IC_Number);
    const Donor_ID = donor.Donor_ID;

    const handleSubmit = (e) => {
        e.preventDefault();
        let donor = {
            Donor_ID: Donor_ID,
            Donor_Name: name,
            Donor_Age: age,
            Gender: gender,
            Nationality: nationality,
            IC_Number: IC
        };
        console.log(donor);
        onConfirm(donor);
    }
    return (
        <div className="personal-info-dialog-overlay">
            <div className="personal-info-dialog">
                <p>Please confirm your information before appointment confirmation</p>
                <form className="personal-data-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            min={18}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" disabled></option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <select
                            id="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required
                        >
                            <option value="" disabled></option>
                            <option value="Malaysia">Malaysian</option>
                            <option value="Others">Non-Malaysian</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="icno">IC/Passport No</label>
                        <input
                            type="text"
                            id="icno"
                            value={IC}
                            onChange={(e) => setIC(e.target.value)}
                            required
                        />
                    </div>
                    <button className="confirm-personal-info-btn" type="submit">Cofirm</button>
                    <button className="cancel-personal-info-btn" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default PersonalInfoDialog;