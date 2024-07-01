import React from "react";

function Row({id, name, IC, time, onApprove, onReject}) {
    return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{IC}</td>
                <td>{time}</td>
                <td>
                    <button className="approve-btn" onClick={onApprove}>Approve</button>
                    <button className="reject-btn" onClick={onReject}>Reject</button>
                </td>
            </tr>
    )
}

export default Row;