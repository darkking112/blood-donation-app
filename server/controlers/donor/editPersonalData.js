const db = require("../../dbinstance");

const editPersonalData = async function (req, res) {
    const { id } = req.params;
    const { Donor_Name, Donor_Age, Gender, Nationality, IC_Number } = req.body;
    const query = "UPDATE donor SET Donor_Name = ?, Donor_Age = ?, Gender = ?, Nationality = ?, IC_Number = ? WHERE Donor_ID = ?;";
    const values = [Donor_Name, Donor_Age, Gender, Nationality, IC_Number, id];

    try {
        const result = await db.promise().query(query, values);
        const { affectedRows } = result[0];

        if (affectedRows > 0) {
            return res.json("Data Has Been Updated Successfully");
        } else {
            return res.json("An Error Occurred");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = editPersonalData;
