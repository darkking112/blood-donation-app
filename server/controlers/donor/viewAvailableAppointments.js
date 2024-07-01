const db = require("../../dbinstance");

function getHours() {
    let timeSlot = ["09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00",
                    "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00"];
    return timeSlot;
}

function checkTimeAvailabilty(reservedSlots) { // [9:00, 9:00, 4:30, ...]
    let repetitionTimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let timeSlots = getHours();

    for (let i = 0; i < repetitionTimes.length; i++)
        repetitionTimes[i] = countOccurrences(reservedSlots, timeSlots[i]) >= 5 ? false : true;
    return repetitionTimes; // []
}

function countOccurrences(arr, value) {
    return arr.reduce((acc, curr) => {
        return acc + (curr === value ? 1 : 0);
    }, 0);
}

async function checkEligibility(id) {
    let today = new Date();
    today.setDate(today.getDate() - 90);
    today = today.toISOString().split('T')[0];
    const query = `SELECT Appointment_Date FROM appointment WHERE Appointment_Date > ? AND Appointment_Status = "Confirmed" AND Donor_ID = ?;`
    const result = await db.promise().query(query, [today, id]);
    if (result[0].length > 0)
        return false;
    else
        return true;
}

const viewAvailablAppointments = async function (req, res) {
    const { DCID, donorID, days} = req.body;
    
    try {
        let isEligibil = await checkEligibility(donorID);
        
        if (isEligibil) {
            let values = days;
            values.push(DCID);
            const query = "SELECT Appointment_Time, Appointment_Date from appointment WHERE "
                            + "(Appointment_Date = ? OR Appointment_Date = ? OR Appointment_Date = ?) AND DC_ID = ? "
                            + "ORDER BY Appointment_Date ASC, Appointment_Time ASC;";
            const result = await db.promise().query(query, values);
            
            let firstDayBookedTimes = [], secondDayBookedTimes = [], thirdDayBookedTimes = [];
            result[0].forEach((date) => {
                let appointmentDateCopy = date.Appointment_Date.toISOString().split('T')[0];
                if (appointmentDateCopy === values[0]) {
                    firstDayBookedTimes.push(date.Appointment_Time);
                } else if (appointmentDateCopy === values[1]) {
                    secondDayBookedTimes.push(date.Appointment_Time);
                } else if (appointmentDateCopy === values[2]) {
                    thirdDayBookedTimes.push(date.Appointment_Time);
                }
            });

            let reservedSlots = {
                day1: checkTimeAvailabilty(firstDayBookedTimes),
                day2: checkTimeAvailabilty(secondDayBookedTimes),
                day3: checkTimeAvailabilty(thirdDayBookedTimes)
            };
            return res.json(reservedSlots);
        } else {
            return res.json("You are unable to book an appointment due to a confirmed donation within the previous 90 days");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};


module.exports = viewAvailablAppointments;