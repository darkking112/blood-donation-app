import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointment from "./Appointment";
import DonorHeader from "./DonorHeader";
import "./viewPreviousAppointments.css"

function ViewPreviousAppointments() {
    const { donorID } = useParams();
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [showEmptyListText, setShowEmptyListText] = useState(false);
    
    useEffect(() => {
        fetch(`https://version-1-production.up.railway.app/donor/view-previous-appointments/${donorID}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0)
                    setShowEmptyListText(true);
                else 
                    setAppointmentsList(data);
            })
            .catch(err => console.error(err))
    }, [appointmentsList.length, donorID]);

    return (
        <div className="previous-appointments-container">
            <DonorHeader btnText={"Home"}/>
            <div className="previous-appointments-body">
                <h1>Previous Appointments</h1>
                <table className="previous-appointments-table">
                    <thead>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Donation Center</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {showEmptyListText &&
                        <tr>
                            <td colSpan={5}>No Previous Appointment</td>
                        </tr>}
                        {
                            appointmentsList.map(appointment => (
                                <Appointment
                                    Appointment_ID={appointment.Appointment_ID}
                                    Appointment_Date={appointment.Appointment_Date}
                                    Appointment_Time={appointment.Appointment_Time}
                                    DC_Name={appointment.DC_Name}
                                    Appointment_Status={appointment.Appointment_Status}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewPreviousAppointments;