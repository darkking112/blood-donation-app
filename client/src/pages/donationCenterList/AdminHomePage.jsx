import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorkersHeader from "../components/WorkersHeader.jsx";
import Row from "./Row.jsx";
import ConfirmationDialog from "../components/confirmationDialog.jsx";
import ChangeAdmin from "./ChangeAdmin.jsx"; 
import AddDonationCenter from "./AddDonationCenter.jsx";
import "./adminHomePage.css"

// const donationCenters = [
//     { id: '1277306080', name: 'Alassaf', email: 'alassaf@admin.DCName.com' },
//     { id: '1211546080', name: 'Zayed', email: 'zayed@admin.DCName.com' },
//     { id: '1269406080', name: 'Maresh', email: 'maresh@admin.DCName.com' },
//     { id: '1274106080', name: 'Suliman', email: 'suliman@admin.DCName.com' },
//     { id: '1211364080', name: 'Yahya', email: 'yahya@admin.DCName.com' }
// ];

function HomePage({ adminName }) {
    const [centers, setCenters] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [currentCenter, setCurrentCenter] = useState(null);
    const [showChangeAdmin, setShowChangeAdmin] = useState(false);
    const [showAddDonatioCenter, setShowAddDonationCenter] = useState(false);
    const location = useLocation();
    const admin = location.state ? location.state.user : null;

    useEffect(() => {
        fetch('https://version-1-production.up.railway.app/admin/donationcenterlist')
            .then(response => response.json())
            .then(data => {
                if (typeof data === 'string') {
                    console.error(data); // Handle "No Records Found"
                } else {
                    setCenters(data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the donation centers!', error);
            });
    }, []);

    const handleRemoveClick = (center) => {
        setCurrentCenter(center);
        setShowDialog(true);
    }

    const handleConfirmRemove = () => {
        fetch(`https://version-1-production.up.railway.app/admin/removedonationcenter/${currentCenter.User_ID}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setCenters(centers.filter(center => center.DC_ID !== currentCenter.DC_ID));
                setShowDialog(false);
            } else {
                console.error('There was an error removing the donation center!');
            }
        })
        .catch(error => {
            console.error('There was an error removing the donation center!', error);
        });
    }

    const handleCancelRemove = () => {
        setShowDialog(false);
        setCurrentCenter(null);
    }

    const handleChangeAdminClick = (center) => {
        setCurrentCenter(center);
        setShowChangeAdmin(true);
    }

    const handleSaveAdmin = (updatedAdmin) => {
        fetch(`https://version-1-production.up.railway.app/admin/changedonationcenteradmin/${currentCenter.User_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAdmin)
        })
            .then(response => {
            if (response.ok) {
                setCenters(centers.map(center => center.DC_ID === currentCenter.DC_ID ? { ...center, ...updatedAdmin } : center));
                setShowChangeAdmin(false);
            } else {
                console.error('There was an error changing the donation center admin!');
            }
        })
        .catch(error => {
            console.error('There was an error changing the donation center admin!', error);
        });
        // setCenters(centers.map(center => center.id === currentCenter.id ? { ...center, ...updatedAdmin } : center));
        // setShowChangeAdmin(false);
    } 

    const handleCloseAdminChange = () => {
        setShowChangeAdmin(false);
        setCurrentCenter(null)
    }

    const addDonationCenter = (newCenter) => {
        fetch('https://version-1-production.up.railway.app/admin/adddonationcenter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCenter)
        })
        .then(response => response.json())
        .then(data => {
            setCenters(data);
            setShowAddDonationCenter(false);
        })
        .catch(error => {
            console.error('There was an error adding the donation center!', error);
        });
        // setCenters([...centers, newCenter]);
        // setShowAddDonationCenter(false);
    }

    return (
        <div className="home-page-container">
            <WorkersHeader buttonText={"Logout"} name={admin.Admin_Name}/>

            <div className="body-home">
                <h1>Donation Centers List</h1>
                <table>
                    <thead>
                        <th>DC ID</th>
                        <th>DC Name</th>
                        <th>DC Admin Email</th>
                        <th>Action</th>
                    </thead>
                    <tbody className="table-body-admin-home-page">
                        {!centers.length &&
                            <tr>
                                <td colSpan={4}>No Donation Centers Found</td>
                            </tr>
                        }
                        {centers.map(dc => (
                            <Row
                                key={dc.DC_ID}
                                DCID={dc.DC_ID}
                                DCName={dc.DC_Name}
                                DCAdminEmail={dc.DC_Admin_Email}
                                User_ID = {dc.User_ID}
                                onRemoveClick={() => handleRemoveClick(dc)}
                                onChangeAdminClick={() => handleChangeAdminClick(dc)}
                            />
                        ))}
                    </tbody>
                </table>
                <button className="add-btn" onClick={setShowAddDonationCenter}>+</button>
            </div>
            <ConfirmationDialog
                show={showDialog}
                onConfirm={handleConfirmRemove}
                onCancel={handleCancelRemove}
                name={currentCenter ? currentCenter.name : ""}
            />

            {showChangeAdmin &&(
                <ChangeAdmin
                    currentAdmin={currentCenter}
                    onClose={handleCloseAdminChange}
                    onSave={handleSaveAdmin}
                />
            )}

            {showAddDonatioCenter && (
                <AddDonationCenter onAdd={ addDonationCenter } onCancel = {() => setShowAddDonationCenter(false)} />
            )}
        </div>
    )
}

export default HomePage;