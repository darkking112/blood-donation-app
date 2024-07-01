import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorkersHeader from "../components/WorkersHeader";
import Row from "./Row";
import ConfrimDialog from "./ConfirmDialog";
import "./nurseHomePage.css"

function NurseHomePage() {
    const timeSlot = getRoundedTime();
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const [showConfirmDialog, setConfirmDialog] = useState(false);
    const [approvedAppointment, setApprovedAppointment] = useState(null);
    const [selectedButton, setSelectedButton] = useState("Pending");
    const location = useLocation();
    const nurse = location.state ? location.state.user : null;

    useEffect(() => {
        fetch('https://version-1-production.up.railway.app/nurse/appointment-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ DC_ID: nurse.DC_ID, timeSlot: timeSlot })
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAppointmentsList(data);
                    // console.log(data);
                    setCurrentList(data.filter(appointment => appointment.Appointment_Status === "Pending"));
                } else {
                    console.error('Error fetching appointments:', data);
                }
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const distributeAppointments = (type) => {
        setCurrentList(appointmentsList.filter((appointment) => appointment.Appointment_Status === type));
        setSelectedButton(type);
    };

    const handleApprovement = (appointment) => {
        fetch(`https://version-1-production.up.railway.app/nurse/change-appointment-status/${appointment.Appointment_ID}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data === "Status Changed Successfully") {
                    let newStatus = "";
                    if (appointment.Appointment_Status === "Pending")
                        newStatus = "Interviewing";
                    else if (appointment.Appointment_Status === "Interviewing")
                        newStatus = "Processing";
                    else {
                        newStatus = "Approved";
                        setApprovedAppointment(appointment);
                        setConfirmDialog(true);
                    }

                    if (appointment.Appointment_Status !== "Processing")
                        setCurrentList(currentList.filter(a => a.Appointment_ID !== appointment.Appointment_ID));

                    setAppointmentsList(appointmentsList.map(a => {
                        if (a.Appointment_ID === appointment.Appointment_ID) {
                            a.Appointment_Status = newStatus;
                        }
                        return a;
                    }));
                } else {
                    console.error('Error changing status:', data);
                }
            })
            .catch(error => console.error('Error changing status:', error));
    }

    const confrimAppointment = (type, amount) => {
        fetch(`https://version-1-production.up.railway.app/nurse/approve-appointment/${approvedAppointment.Appointment_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, amount, donorID: approvedAppointment.Donor_ID })
        })
            .then(response => response.json())
            .then(data => {
                if (data === "Appointment Approved Successfully") {
                    setAppointmentsList(appointmentsList.map(a => {
                        if (a.Appointment_ID === approvedAppointment.Appointment_ID) {
                            a.Type = type;
                            a.Amount = amount;
                        }
                        return a;
                    }));
                    setCurrentList(currentList.filter(a => a.Appointment_ID !== approvedAppointment.Appointment_ID));
                    setConfirmDialog(false);
                } else {
                    console.error('Error approving appointment:', data);
                }
            })
            .catch(error => console.error('Error approving appointment:', error));
    }

    const cancelConfrimAppointment = () => {
        setConfirmDialog(false);
        setApprovedAppointment(null);
    }

    const rejectAppointment = (appointment) => {
        fetch(`https://version-1-production.up.railway.app/nurse/reject-appointment/${appointment.Appointment_ID}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data === "Appointment Rejected Successfully") {
                    setAppointmentsList(appointmentsList.map(a => {
                        if (a.Appointment_ID === appointment.Appointment_ID) {
                            a.Appointment_Status = "Rejected";
                        }
                        return a;
                    }));
                    setCurrentList(currentList.filter(a => a.Appointment_ID !== appointment.Appointment_ID));
                } else {
                    console.error('Error rejecting appointment:', data);
                }
            })
            .catch(error => console.error('Error rejecting appointment:', error));
    }

    return (
        <div className="nurse-home-page-container">
            <WorkersHeader name={nurse.Nurse_Name} buttonText={"logout"} />

            <div className="nurse-home-body">
                <h1>Current Appointments</h1>
                <div className="status-btns">
                    <button
                        className={`status-btn ${selectedButton === "Pending" ? "selected" : ""}`}
                        onClick={() => distributeAppointments("Pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`status-btn ${selectedButton === "Interviewing" ? "selected" : ""}`}
                        onClick={() => distributeAppointments("Interviewing")}
                    >
                        Interviewing
                    </button>
                    <button
                        className={`status-btn ${selectedButton === "Processing" ? "selected" : ""}`}
                        onClick={() => distributeAppointments("Processing")}
                    >
                        Processing
                    </button>
                </div>

                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Donor Name</th>
                            <th>IC/Passport No</th>
                            <th>Appointment Time</th>
                            <th>Procedure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map(appointment => (
                            <Row
                                key={appointment.Appointment_ID}
                                id={appointment.Appointment_ID}
                                name={appointment.Donor_Name}
                                IC={appointment.IC_Number}
                                time={appointment.Appointment_Time}
                                onApprove={() => handleApprovement(appointment)}
                                onReject={() => rejectAppointment(appointment)}
                            />
                        ))}
                    </tbody>
                </table>
                
                {showConfirmDialog && (<ConfrimDialog onApprove={confrimAppointment} onCancel={cancelConfrimAppointment}/>)}
            </div>
        </div>
    );
}

export default NurseHomePage;


function getRoundedTime() {
    // Create a new Date object with the current time
    const now = new Date();

    // Extract the hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Round minutes to the nearest half-hour mark
    minutes = minutes >= 30 ? 30 : 0;

    // Create a new Date object with the rounded time
    const roundedTime = new Date();
    roundedTime.setHours(hours);
    roundedTime.setMinutes(minutes);
    roundedTime.setSeconds(0);
    roundedTime.setMilliseconds(0);

    // Format the rounded time as a string in the format HH:MM
    const roundedTimeString = roundedTime.toTimeString().slice(0, 5);

    return roundedTimeString;
}
