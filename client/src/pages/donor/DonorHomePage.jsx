import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookedAppointmentRow from "./BookedAppointmentRow"
import BookAppointmentRow from "./BookAppointmentRow";
import CancelConfirmationDialog from "./CancelConfirmationDialog";
import DonorHeader from "./DonorHeader";
import "./donorHomePage.css"

function DonorHomePage() {
    const [bookedAppointment, setBookedAppointment] = useState(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const donor = location.state ? location.state.user : null;
    // const donorId = 4; 
    useEffect(() => {
        fetchBookedAppointment();
    }, []);

    const fetchBookedAppointment = async () => {
        try {
            const response = await fetch('https://version-1-production.up.railway.app/donor/view-booked-appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: donor.Donor_ID })
            });

            const data = await response.json();
            setBookedAppointment(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching booked appointment:', error);
            setError('Error fetching booked appointment');
            setLoading(false);
        }
    };

    
    const handleCancelAppointment = async () => {
        console.log(bookedAppointment[1][0].Appointment_ID);
        try {
            const response = await fetch(`https://version-1-production.up.railway.app/donor/cancel-appointment/${bookedAppointment[1][0].Appointment_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to cancel appointment');
            }
            setBookedAppointment([false]);
            setShowCancelDialog(false);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <DonorHeader btnText={"Home"}/>
                {error}
            </div>
        )
    }

    return (
        <div className="donor-home-page-container">
            <DonorHeader btnText={"Previous Appointments"} donorID={donor.Donor_ID} />

            <div className="donor-home-body">
                {bookedAppointment[0] &&
                    <BookedAppointmentRow
                        appointment={bookedAppointment[1]}
                        onCancel={() => setShowCancelDialog(true)}
                    />
                }
                {showCancelDialog && 
                    <CancelConfirmationDialog
                        onCancel={() => setShowCancelDialog(false)}
                        onConfirm={handleCancelAppointment}
                    />
                }
                {bookedAppointment[0] === false && <BookAppointmentRow donor={donor}/>}
            </div>
        </div>
    )
}

export default DonorHomePage;