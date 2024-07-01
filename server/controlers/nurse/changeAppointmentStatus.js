const db = require("../../dbinstance")

const changeAppointmentStatus = async function (req, res) {
    const { id } = req.params;
    const query = "SELECT Appointment_Status FROM appointment WHERE Appointment_ID = ?";

    try {
        const result = await db.promise().query(query, [id]);
        if (result[0].length !== 0) {
            const { Appointment_Status } = result[0][0];

            const newStatus = Appointment_Status === "Pending" ? "Interviewing" : "Processing";

            const updateQuery = "UPDATE `appointment` SET Appointment_Status = ? WHERE Appointment_ID = ?;";
            const updateResult = await db.promise().query(updateQuery, [newStatus, id]);
            const { affectedRows } = updateResult[0];

            if (affectedRows > 0) {
                return res.json("Status Changed Successfully");
            } else {
                return res.json("An Error Occurred");
            }
        } else {
            return res.json("Appointment Not Found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};


module.exports = changeAppointmentStatus;