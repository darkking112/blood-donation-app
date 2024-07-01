import React from "react";

function Row({ centersList, onViewTimeClick }) {
    const goToAddress = function (address) {
        window.open(address, "_blank")
    }

    return (
        <tr>
            <td>{centersList.DC_Name}</td>
            <td>
                <button className="view-times-btn" onClick={onViewTimeClick}>Available Donation Time</button>
                <button className="view-in-map-btn" onClick={() => goToAddress(centersList.Address_Link)}>View on Map</button>
            </td>
        </tr>
    )
}

export default Row;