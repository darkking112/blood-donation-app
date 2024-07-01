import React from "react";

function Row({Nurse_ID, Nurse_Name, Nurse_Email, User_ID, onRemoveClick}) {
    return (
        <tr>
            <td>{Nurse_ID}</td>
            <td>{Nurse_Name}</td>
            <td>{Nurse_Email}</td>
            <td>
                <button className="remove-nurse-btn" onClick={() => onRemoveClick({Nurse_ID, Nurse_Name, Nurse_Email, User_ID})}>Remove</button>
            </td>
        </tr>
    )
}

export default Row;