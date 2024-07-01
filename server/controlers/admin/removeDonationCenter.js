const db = require("../../dbinstance");

const removeUser = async (id) => {
    const query = "DELETE FROM `users` WHERE `User_ID` = ?";
    await db.promise().query(query, [id]);
}

const removeDonationCenter = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM `donation_center` WHERE `User_ID` = ?";

    try {
        const result = await db.promise().query(query, [id]);
        const { affectedRows } = result[0];

        if (affectedRows > 0) {
            await removeUser(id);
            return res.json("Donation Center removed successfully.");
        } else {
            return res.json("No Donation Center found with the provided ID.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
}

module.exports = removeDonationCenter;