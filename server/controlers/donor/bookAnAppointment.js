const db = require("../../dbinstance");

const bookAnAppointment = async function (req, res) {
    const { Donor_ID, DC_ID, Appointment_Date, Appointment_Time } = req.body;
    const query = "INSERT INTO `appointment` (Appointment_Date, Appointment_Time, Appointment_Status, Donor_ID, DC_ID) "
                + "VALUES (?, ?, ?, ?, ?);";

    const values = [Appointment_Date, Appointment_Time, "Pending", Donor_ID, DC_ID];

    try {
        const result = await db.promise().query(query, values);
        const { insertId } = result[0];

        if (insertId) {
            return res.json("Appointment Booked Successfully");
        } else {
            return res.json("An Error Occurred");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = bookAnAppointment;