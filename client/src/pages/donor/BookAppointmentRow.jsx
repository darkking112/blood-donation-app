import React, { useState } from "react";
import BookNow from "./BookNow";
import AppointmentBooking from "./AppointmentBooking";

function BookAppointmentRow({donor}) {
    const [showBoookNow, setShowBookNow] = useState(true) 
    const [bookNowClicked, setBookNowClicked] = useState(false)
    const [donationCenters, setDonationCenters] = useState([]);

    const handleBookNowClick = async () => {
        setShowBookNow(false);
        setBookNowClicked(true);
        try {
            const response = await fetch('https://version-1-production.up.railway.app/donor/view-donation-centers-list');
            const data = await response.json();
            setDonationCenters(data);
        } catch (error) {
            console.error('Error fetching donation centers:', error);
        }
    }
    
    return (
        <>
            {showBoookNow && <BookNow onBookNow={handleBookNowClick} />}
            {bookNowClicked && <AppointmentBooking donationCenters = {donationCenters} donor={donor}/>}
        </>
        
    )
}

export default BookAppointmentRow;