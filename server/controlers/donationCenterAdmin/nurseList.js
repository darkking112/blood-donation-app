const db = require("../../dbinstance");

const getDCID = async (id) => {
    const query = "SELECT DC_ID FROM `donation_center` WHERE DC_Admin_ID = ?";
    const result = await db.promise().query(query, [id]);
    return result[0][0];
}

const nurseList = async (req, res) => {
    const { id } = req.params;
    const { DC_ID } = await getDCID(id);
    try {
        const query = "SELECT Nurse_ID, Nurse_Name, Nurse_Email, User_ID FROM `nurse` WHERE DC_ID = ? ";
        const [data] = await db.promise().query(query, [DC_ID]);
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred", error: err });
    }
};

module.exports = nurseList;