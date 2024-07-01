const db = require("../../dbinstance")

const rejectAppointment = async function (req, res) {
    const { id } = req.params;
    const query = "UPDATE `appointment` SET Appointment_Status = 'Rejected' WHERE Appointment_ID = ?;";

    try {
        const result = await db.promise().query(query, [id]);
        const { affectedRows } = result[0];

        if (affectedRows > 0) {
            return res.json("Appointment Rejected Successfully");
        } else {
            return res.json("An Error Occurred");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = rejectAppointment;