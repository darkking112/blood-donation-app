const db = require("../../dbinstance");

function getDays() {
    const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const todayDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
    const nextDayDate = new Date(todayDate);
    nextDayDate.setDate(todayDate.getDate() + 1);
    const nextDay = nextDayDate.toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return [today, nextDay];
}

const appointmentList = async function (req, res) {
    const { DC_ID, timeSlot } = req.body;

    const [today, tomorrow] = getDays();

    const query = "SELECT `Appointment_ID`, `Donor_Name`, `Donor_ID`, `IC_Number`, `Appointment_Time`, `Appointment_Status`, `Appointment_Date` " +
                    "FROM appointment_list WHERE DC_ID = ? AND (Appointment_Status = 'Interviewing' OR Appointment_Status = 'Processing' " +
                    "OR(Appointment_Time = ? AND Appointment_Status = 'Pending')) AND Appointment_Date >= ? AND Appointment_Date < ?";

    const values = [DC_ID, timeSlot, today, tomorrow];

    try {
        const [result] = await db.promise().query(query, values);
        if (result.length > 0) {
            return res.json(result);
        } else {
            return res.json("No Records Found");
        }
    } catch (error) {
        console.error("Database query failed:", error);
        return res.status(500).json("Database query failed");
    }
}

module.exports = appointmentList;