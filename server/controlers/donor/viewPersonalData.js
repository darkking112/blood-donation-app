const db = require("../../dbinstance");

const viewPersonaldata = async function (req, res) {
    const { id } = req.params;

    const query = "SELECT Donor_Name, Donor_Age, Gender, Nationality, IC_Number FROM donor WHERE Donor_ID = ?";
    const result = await db.promise().query(query, [id]);
    return res.json(result[0]);
}

module.exports = viewPersonaldata;