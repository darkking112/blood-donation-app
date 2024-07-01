import React, { useEffect } from "react";

function ManualFormDialog() {
    const goToRegulationsPage = function () {
        window.open(`${process.env.PUBLIC_URL}/donationRegulations.html`, "_blank")
    }

    const downloadForm = function () {
        const downloadUrl = process.env.PUBLIC_URL + "/Manual_Form.pdf";
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Manual_Form.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        const reloadPage = setTimeout(() => {
            window.location.reload();
        }, 20000); // 60000 milliseconds = 1 minute

        return () => clearTimeout(reloadPage);
    }, []); // Empty dependency array ensures effect runs only once

    return (
        <div className="manual-form-dialog-overlay">
            <div className="manual-form-dialog">
                <p>Thank you! Your appointment has been confirmed. Please print & fill in this form before attending the appointment.</p>
                <button className="manual-form-btn" onClick={downloadForm}>Manual_Form.pdf</button>
                <button className="view-donation-regulation-btn" onClick={goToRegulationsPage}>View Donation Regulations</button>
            </div>
        </div>
    ) 
}

export default ManualFormDialog;
