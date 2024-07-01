const db = require("../../dbinstance")

async function getDonationCenter(id) {
    const query = `SELECT * FROM donation_center_addresses WHERE DC_ID = ?`;
    const result = await db.promise().query(query, [id]);
    return result[0];
}

const viewBookedAppointment = async function (req, res) {
    const { id } = req.body;
    const query = `SELECT * FROM appointment WHERE Donor_ID = ? AND Appointment_Status = "Pending"`;

    try {
        const result = await db.promise().query(query, [id]);
        
        if (result[0].length > 0) {
            const result2 = await getDonationCenter(result[0][0].DC_ID)
            const appointment = [true, [...result[0], ...result2]];
            return res.json(appointment);
        } else {
            return res.json([false]);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = viewBookedAppointment;
