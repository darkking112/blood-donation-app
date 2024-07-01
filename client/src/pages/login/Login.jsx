import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../donor/ErrorDialog";
import logo from "../logo.png"

function Login() {
    let [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [password, setPassword] = useState("");
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://version-1-production.up.railway.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        });

        const data = await response.json();
        console.log(data);
        if (data[0] === "Logged in Successfully" && data[1] === "donation_center_admin")
            navigate(`/dc-home-page`, { state: { user: data[2] } });
        
        else if (data[0] === "Logged in Successfully")
            navigate(`/${data[1]}-home-page`, { state: { user: data[2] } });
        
        else if (data === "Email or Password is Wrong" || data === "User Not Found") {
            setErrorMessage(data);
            setShowErrorDialog(true);
            setShowForm(false);
        }
            

    };

    return (
        <div className="login-container">
            <div className="header">
                <img className="logo-image" src={logo} alt="Logo" />
                <button className="signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>

            {showErrorDialog && (
                <ErrorDialog
                    onClick={() => { setShowErrorDialog(false); setShowForm(true)}}
                    message = {errorMessage}
                />
            )}

            {showForm && <div className="body">
                <h2>Welcome to MMU Blood Donation System</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>}
        </div>
    );
}

export default Login;