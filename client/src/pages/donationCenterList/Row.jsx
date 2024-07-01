import React from "react";

function Row({DCID, DCName, DCAdminEmail, onRemoveClick, onChangeAdminClick}) {
    return (
            <tr>
                <td>{DCID}</td>
                <td>{DCName}</td>
                <td>{DCAdminEmail}</td>
                <td>
                    <button className="change-admin-btn" onClick={onChangeAdminClick}>Change Admin</button>
                    <button className="remove-btn" onClick={onRemoveClick}>Remove</button>
                </td>
            </tr>
    )
}

export default Row;