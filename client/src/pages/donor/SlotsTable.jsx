import React, { useState } from "react";
import Slot from "./Slot";

const slots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am",
    "11:00 am", "11:30 am", "12:00 pm", "12:30 pm",
    "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm"
];

function SlotsTable({ center, days, slotsAvailablity, onConfirm, onCancel }) {
    const [currentDate, setCurrentDate] = useState(days[0]);
    const [currentSlot, setCurrentSlot] = useState("");
    const [currentSlots, setCurrentSlots] = useState(slotsAvailablity.day1);

    const goToAddress = (address) => {
        window.open(address, "_blank");
    }

    const handleDateClick = (day) => {
        setCurrentDate(day);
        if (day === days[0])
            setCurrentSlots(slotsAvailablity["day1"]);
        else if (day === days[1])
            setCurrentSlots(slotsAvailablity["day2"]);
        else if (day === days[2])
            setCurrentSlots(slotsAvailablity["day3"]);
        setCurrentSlot("");
    }

    const handleConfirmClick = () => {
        console.log(currentDate, currentSlot);
        onConfirm(currentDate, currentSlot);
    }

    const handleCancelClick = () => {
        onCancel();
    }

    return (
        <table className="time-slots-table">
            <thead>
                <tr>
                    <th>Donation Center</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{center.DC_Name}</td>
                    <td>
                        <button className={"view-in-map-btn"} onClick={() => goToAddress(center.Address_Link)}>View on Map</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <div className="dates-btns">
                                <button className={`_1st-date ${currentDate === days[0] ? 'selected' : ''}`} onClick={() => handleDateClick(days[0])}>{days[0]}</button>
                                <button className={`_2nd-date ${currentDate === days[1] ? 'selected' : ''}`} onClick={() => handleDateClick(days[1])}>{days[1]}</button>
                                <button className={`_3rd-date ${currentDate === days[2] ? 'selected' : ''}`} onClick={() => handleDateClick(days[2])}>{days[2]}</button>
                        </div>
                        <div className="time-slots">
                            {slots.map((slot, index) => (
                                <Slot 
                                    key={index}
                                    timeText={slot} 
                                    status={currentSlots[index]} 
                                    isSelected={currentSlot === slot}
                                    onSelect={() => setCurrentSlot(slot)} 
                                />
                            ))}
                        </div>
                        <div className="action-btns">
                            <button className="confirm-slot-btn" onClick={handleConfirmClick}>Book</button>
                            <button className="Cancel-slot-btn" onClick={handleCancelClick}>Cancel</button>
                        </div>
                        <div className="legend">
                            <div>
                                <div className="legend-item legend-available"></div>
                                <span>Available</span>
                            </div>
                            <div>
                                <div className="legend-item legend-unavailable"></div>
                                <span>Unavailable</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default SlotsTable;
