const db = require("../../dbinstance");

function checkTimeAvailabilty(reservedSlots) {
    let repetitionTimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let timeSlots = ["09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00",
                    "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00"];

    for (let i = 0; i < repetitionTimes.length; i++)
        repetitionTimes[i] = countOccurrences(reservedSlots, timeSlots[i]) >= 5 ? false : true;
    return repetitionTimes;
}

function countOccurrences(arr, value) {
    return arr.reduce((acc, curr) => {
        return acc + (curr.Appointment_Time === value ? 1 : 0);
    }, 0);
}

const getAppointmentDetails = async function (id) {
    const query = "SELECT Appointment_Date, DC_ID FROM appointment WHERE Appointment_ID = ?";
    const result = await db.promise().query(query, [id]);
    return result[0][0];
}

const getAvailebleTime = async function (req, res) {
    const { id } = req.params;
    const { Appointment_Date, DC_ID } = await getAppointmentDetails(id);
    const query = "SELECT Appointment_Time FROM appointment WHERE Appointment_Date = ? AND DC_ID = ?";
    const result = await db.promise().query(query, [Appointment_Date, DC_ID]);
    const slots = checkTimeAvailabilty(result[0]);
    return res.json(slots);
}

module.exports = getAvailebleTime;