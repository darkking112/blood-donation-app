const db = require("../../dbinstance");

const viewPreviousAppointments = async function (req, res) {
    const { id } = req.params;
    const query = "SELECT Appointment_ID, Appointment_Date, Appointment_Time, DC_Name, Appointment_Status "
                + "FROM previous_appointments WHERE Donor_ID = ?";

    try {
        const result = await db.promise().query(query, [id]);
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
}

module.exports = viewPreviousAppointments;
