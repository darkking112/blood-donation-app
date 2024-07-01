const db = require("../../dbinstance");

const editAppointmentTime = async function (req, res) {
    const { id } = req.params;
    const { Appointment_Time } = req.body;
    const query = "UPDATE appointment SET Appointment_Time = ? WHERE Appointment_ID = ?;"
    const result = await db.promise().query(query, [Appointment_Time, id]);

    console.log(result[0].affectedRows);
    return res.json(result[0].affectedRows);
}

module.exports = editAppointmentTime;