const db = require("../../dbinstance")

function calculateDate() {
    let today = new Date();
    today.setDate(today.getDate() + 41);
    let formattedDate = today.toISOString().split('T')[0];
    formattedDate = formattedDate.toString();
    return formattedDate;
}

const approveAppointment = async function (req, res) {
    const { id } = req.params;
    const { type, amount, donorID } = req.body;
    const expiryDate = calculateDate();
    const updateQuery = "UPDATE `appointment` SET Appointment_Status = 'Confirmed' WHERE Appointment_ID = ?;";
    const insertQuery = "INSERT INTO blood_unit (Type, Amount, Expiry_Date, Donor_ID, Appointment_ID) "
                        + "VALUES (?, ?, ?, ?, ?);";
    const values = [type, amount, expiryDate, donorID, id];
    
    try {
        const updateResult = await db.promise().query(updateQuery, [id]);
        const insertResult = await db.promise().query(insertQuery, values);

        if (updateResult[0].length !== 0 && insertResult[0].length !== 0) {
            return res.json("Appointment Approved Successfully");
        } else {
            return res.json("An Error Occurred");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = approveAppointment;