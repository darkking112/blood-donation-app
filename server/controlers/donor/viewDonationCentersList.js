const db = require("../../dbinstance");


const viewDonationCentersList = async function (req, res) {
    const query = `SELECT * FROM donation_center_addresses`;

    try {
        const result = await db.promise().query(query);
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = viewDonationCentersList;