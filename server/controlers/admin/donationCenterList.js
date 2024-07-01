const db = require("../../dbinstance");

const donationCenterList = async function (req, res) {
    const query = "SELECT * FROM `donation_center_list`";

    try {
        const result = await db.promise().query(query);
        const data = result[0];

        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("No Records Found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
}

module.exports = donationCenterList;