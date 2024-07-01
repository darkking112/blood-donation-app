import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/WorkersHeader";
import ConfirmationDialog from "../components/confirmationDialog";
import AddNurse from "./AddNurse";
import Row from "./Row";
import "./dcHomePage.css"

function DCHomePage() {
    const [nursesList, setNursesList] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [currentNurse, setCurrentNurse] = useState(null);
    const [showAddNurse, setShowAddNurse] = useState(false);
    const [showEmptyListText, setShowEmptyListText] = useState(false);

    const location = useLocation();
    const DC = location.state ? location.state.user : null;
    useEffect(() => {
        fetch(`http://version-1-production.up.railway.app/donationcenteradmin/nurse-list/${DC.DC_Admin_ID}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0)
                    setShowEmptyListText(true)
                else
                    setNursesList(data)
            })
        .catch(error => console.error('Error fetching nurses:', error));
    }, [DC.DC_Admin_ID]);
    
    const handleRemoveClick = (nurse) => {
        setCurrentNurse(nurse);
        setShowDialog(true);
    }

    const handleConfirmRemove = () => {
        console.log(currentNurse);
        fetch(`http://version-1-production.up.railway.app/donationcenteradmin/remove-nurse/${currentNurse.User_ID}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setNursesList(nursesList.filter(nurse => nurse.Nurse_ID !== currentNurse.Nurse_ID));
            } else {
                console.error('Error removing nurse');
            }
            setShowDialog(false);
        })
            .catch(error => console.error('Error removing nurse:', error));
        
        nursesList.length === 0 ? setShowEmptyListText(true) : setShowEmptyListText(false);
        // setNursesList(nursesList.filter(nurse => nurse.id !== currentNurse.id));
        // setShowDialog(false);
    }

    const handleCancelRemove = () => {
        setCurrentNurse(null);
        setShowDialog(false);
    }

    const handleAddNurse = (newNurse) => {
        console.log(DC);
        fetch(`http://version-1-production.up.railway.app/donationcenteradmin/add-nurse/${DC.DC_Admin_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNurse)
        })
        .then(response => response.json())
        .then(data => {
            setNursesList(data);
            data.length === 0 ? setShowEmptyListText(true) : setShowEmptyListText(false);
            setShowAddNurse(false);
        })
        .catch(error => console.error('Error adding nurse:', error));

        // setNursesList([...nursesList, newNurse]);
        // setShowAddNurse(false)
    }

    return (
        <div className="home-page-container">
            <Header buttonText={"Logout"} name={"Ali"} />
            <div className="donation-center-home-body">
                <h1>Nurse List</h1>
                <table className="nurse-list-table">
                    <thead>
                        <th>Nurse ID</th>
                        <th>Nurse Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {showEmptyListText &&
                        <tr>
                            <td colSpan={4}>No Nurses Found</td>
                        </tr>
                        }
                        {
                            nursesList.map(nurse => (
                                <Row
                                    onRemoveClick={handleRemoveClick}
                                    Nurse_Name={nurse.Nurse_Name}
                                    Nurse_ID={nurse.Nurse_ID}
                                    Nurse_Email={nurse.Nurse_Email}
                                    User_ID = {nurse.User_ID}
                                />  
                            ))
                        }
                    </tbody>
                </table>
                <button className="add-nurse-btn" onClick={setShowAddNurse}>+</button>

                {showDialog && currentNurse && (
                    <ConfirmationDialog
                        show={showDialog}
                        onConfirm={handleConfirmRemove}
                        onCancel={handleCancelRemove}
                        name={currentNurse.Nurse_Name}
                    />
                )}
                
                {showAddNurse && (
                    <AddNurse
                        onAdd={handleAddNurse}
                        onCancel={() => setShowAddNurse(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default DCHomePage;