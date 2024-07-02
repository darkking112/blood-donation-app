import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../donor/ErrorDialog";
import "./Signup.css"
import logo from "../logo.png"

function Signup() {
    const [errorMessage, setErrorMessage] = useState("")
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [ICNo, setICNo] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let donor = {
            name: name,
            email: email,
            password: password,
            phoneNo: phoneNo,
            age: age,
            gender: gender,
            nationality: nationality,
            ic: ICNo
        }

        try {
        const response = await fetch('https://version-1-production.up.railway.app/donor/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donor),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Signup successful:", data);
            if (data === "Account Created Successfully")
                navigate('/'); 
            else if (data === "Account Already Exists" || data === "An Error Occurred") {
                setErrorMessage(data);
                setShowErrorDialog(true);
                setShowForm(false);
            }
        } else {
            console.error("Signup failed:", data);

        }
    } catch (error) {
        console.error('Request failed:', error);
        }
    }

    return (
        <div className="signup-container">
            <div className="header">
                <img className="logo-image" src={logo} alt="Logo" />
                <button className="login-button" onClick={() => navigate("/")}>Login</button>
            </div>

            {showErrorDialog && (
                <ErrorDialog
                    onClick={() => { setShowErrorDialog(false); setShowForm(true)}}
                    message = {errorMessage}
                />
            )}

            {showForm && 
            <div className="body-signup">
                <form onSubmit={handleSubmit} className="signup-form">
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone-No">Phone No</label>
                        <input
                            type="text"
                            maxlength="10"
                            id="phone-No"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
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
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="" disabled></option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
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
                            maxlength="10"
                            id="icno"
                            value={ICNo}
                            onChange={(e) => setICNo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
            </div>
            }
        </div>
    )
}

export default Signup;