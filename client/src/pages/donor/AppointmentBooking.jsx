import React, { useState } from "react";
import DonationCentersTable from "./DonationCentersTable";
import SlotsTable from "./SlotsTable";
import PersonalInfoDialog from "./PersonalInfoDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import ManualFormDialog from "./ManualFormDialog";
import ErrorDialog from "./ErrorDialog";

function getDays() {
    let today = new Date();
    let days = [];

    for (let i = 3; i <= 5; i++) {
        let newDay = new Date(today);
        newDay.setDate(today.getDate() + i); 
        days.push(newDay.toISOString().split('T')[0]);
    }
    return days;
}

function AppointmentBooking({ donationCenters, donor }) {
    console.log(donor);
    const days = getDays();
    const errorMessage = "You are unable to book an appointment due to a confirmed donation within the previous 90 days"
    const [viewCentersTable, setViewCentersTable] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [appointmentTime, setAppointmentTime] = useState(null);
    const [currentCenter, setCurrentCenter] = useState(null);
    const [showSlots, setShowSlots] = useState(false);
    const [slots, setSlots] = useState({});
    const [showPersonalInfo, setShowPersonalInfo] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [showManualFormDialog, setShowManualFormDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const handleCancelCenterClicked = () => {
        setViewCentersTable(true);
        setCurrentCenter(null);
        setShowSlots(false);
    };

    const handleConfirmSlot = (date, time) => {
        setAppointmentDate(date);
        setAppointmentTime(time);
        setShowPersonalInfo(true);
    };

    const viewTimeSlots = async (id) => {
        setViewCentersTable(false);
        setCurrentCenter(donationCenters.filter(dc => dc.DC_ID === id));
        try {
            const response = await fetch('http://version-1-production.up.railway.app/donor/view-available-appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ DCID: id, donorID: donor.donor_ID, days: days }), // assuming you have the donorID available
            });
            const data = await response.json();
            if (data === "You are unable to book an appointment due to a confirmed donation within the previous 90 days")
                setShowErrorDialog(true)
            else {
                setSlots(data);
                setShowSlots(true);
            }
        } catch (error) {
            console.error('Error fetching available appointments:', error);
        }
    };

    const handleConfirmPersonalInfo = async (donor) => {
        console.log(donor);
        try {
        const response = await fetch(`http://version-1-production.up.railway.app/donor/edit-personal-data/${donor.Donor_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donor),
        });

        if (!response.ok) {
            throw new Error('Error confirming personal information');
        }

        setShowPersonalInfo(false);
        setConfirmationDialog(true);
    } catch (error) {
        console.error('Error confirming personal information:', error);
        // Handle the error appropriately, e.g., show a message to the user
    }
    };

    const handleConfirmAppointment = async () => {
        console.log(donor);
        try {
        const response = await fetch('http://version-1-production.up.railway.app/donor/book-an-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Donor_ID: donor.Donor_ID, // Replace with the actual donor ID
                DC_ID: currentCenter[0].DC_ID,
                Appointment_Date: appointmentDate,
                Appointment_Time: appointmentTime,
            }),
        });

        if (!response.ok) {
            throw new Error('Error booking the appointment');
        }
        setShowManualFormDialog(true);
        setConfirmationDialog(false);
        setShowSlots(false);
        setCurrentCenter(null);
        setAppointmentDate(null);
        setAppointmentTime(null);
    } catch (error) {
        console.error('Error booking the appointment:', error);
        // Handle the error appropriately, e.g., show a message to the user
    }
        // fetch call to insert the new appointment in the DB
        // setShowManualFormDialog(true);
        // setConfirmationDialog(false);
        // setShowSlots(false);
        // setCurrentCenter(null);
    };

    return (
        <div className="appointment-booking-body">
            <h1>Appointment Booking</h1>
            {viewCentersTable && (
                <DonationCentersTable
                    centersList={donationCenters}
                    onViewTimeClick={id => viewTimeSlots(id)}
                />
            )}
            {showErrorDialog && (
                <ErrorDialog
                    onClick={() => { setShowErrorDialog(false); setViewCentersTable(true) }}
                    message = {errorMessage}
                />
            )}
            {showSlots && (
                <SlotsTable
                    center={currentCenter[0]}
                    days={days}
                    slotsAvailablity={slots}
                    onConfirm={(date, time) => handleConfirmSlot(date, time)}
                    onCancel={handleCancelCenterClicked}
                />
            )}
            {showPersonalInfo && (
                <PersonalInfoDialog
                    donor={donor}
                    onConfirm={(donor) => handleConfirmPersonalInfo(donor)}
                    onCancel={() => setShowPersonalInfo(false)}
                />
            )}
            {confirmationDialog && (
                <ConfirmationDialog
                    center={currentCenter[0].DC_Name}
                    date={appointmentDate}
                    time={appointmentTime}
                    onConfirm={handleConfirmAppointment}
                    onCancel={() => setConfirmationDialog(false)}
                />
            )}
            {showManualFormDialog && (
                <ManualFormDialog />
            )}
        </div>
    );
}

export default AppointmentBooking;
