import React from "react";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function BookedAppointmentRow({ appointment, onCancel }) {
    console.log(appointment);
    const goToAddress = function (address) {
        window.open(address, "_blank")
    }

    const downloadForm = function () {
        const downloadUrl = process.env.PUBLIC_URL + "/Manual_Form.pdf";
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Manual_Form.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="booked-appointment-body">
            <h1>Booked Appointment</h1>
            <table className="booked-appointment-table">
                <thead>
                    <th>Appointment ID</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Donation Center</th>
                    <th>Action</th>
                </thead>
                <tr>
                    <td>{appointment[0].Appointment_ID}</td>
                    <td>{formatDate(appointment[0].Appointment_Date)}</td>
                    <td>{appointment[0].Appointment_Time}</td>
                    <td>
                        <button className="view-in-map-btn"
                            onClick={() => goToAddress(appointment[1].Address_Link)}>
                            {appointment[1].DC_Name}
                        </button>
                    </td>
                    <td>
                        <button className="manual-form-btn" onClick={() => downloadForm()}>Manual Form</button>
                        <button className="cancel-appointment-btn" onClick={onCancel}>Cancel</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default BookedAppointmentRow;