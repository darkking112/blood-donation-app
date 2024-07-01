import React from "react";
import Row from "./Row";

function DonationCentersTable({ centersList, onViewTimeClick }) {
    const handleViewTime = (id) => {
        onViewTimeClick(id);
    }

    return (
        <table className="donation-centers-table">
            <thead>
                <th>Donation Center Name</th>
                <th>Acttion</th>
            </thead>
            <tbody>
                {centersList.map(dc => <Row centersList={dc} onViewTimeClick={() => handleViewTime(dc.DC_ID)}/>)}
                {/* <tr>
                    <td>{centersList.name}</td>
                    <td>{centersList.distance}</td>
                    <td>
                        <button onClick={onViewTimeClick}>Available Donation Time</button>
                        <button onClick={() => goToAddress(centersList.address)}>View on Map</button>
                    </td>
                </tr> */}
            </tbody>
        </table>
    )
}

export default DonationCentersTable;