import React from "react";

function BookNow({onBookNow}) { 
    return (
        <div className="book-appointment-body">
            <h1>Booked Appointment</h1>
            <p>No Booked Appointment</p>
            <hr />
            <button className="book-now-btn" onClick={onBookNow}>Book Now </button>
        </div>
    )
}

export default BookNow;