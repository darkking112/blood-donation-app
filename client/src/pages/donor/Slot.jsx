import React from "react";

function Slot({ timeText, status, onSelect, isSelected }) {
    let available = status ? "available-slot-btn" : "not-available-slot-btn";
    let selectedClass = isSelected ? " selected" : "";
    return (
        <button className={available + selectedClass} onClick={onSelect}>
            {timeText}
        </button>
    );
}

export default Slot;