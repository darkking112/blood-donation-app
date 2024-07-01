import React from "react";

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Helper function to determine status style
function getStatusStyle(status) {
    let color;
    switch(status.toLowerCase()) {
        case 'no show':
        case 'pending':
            color = '#FF9A00';
            break;
        case 'canceled':
        case 'rejected':
            color = '#FF3131';
            break;
        case 'confirmed':
            color = '#39BF00';
            break;
        default:
            color = 'black';
    }
    return { color: color, fontWeight: 'bold' };
}

function Appointment({ Appointment_ID, Appointment_Date, Appointment_Time, DC_Name, Appointment_Status }) {
    return (
        <tr>
            <td>{Appointment_ID}</td>
            <td>{formatDate(Appointment_Date)}</td>
            <td>{Appointment_Time}</td>
            <td>{DC_Name}</td>
            <td style={getStatusStyle(Appointment_Status)}>{Appointment_Status}</td>
        </tr>
    )
}

export default Appointment;
