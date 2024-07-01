const db = require("../../dbinstance");

const removeUser = async (id) => {
    const query = "DELETE FROM `users` WHERE `User_ID` = ?";
    await db.promise().query(query, [id]);
}

const removeNurse = async function (req, res) {
    const { id } = req.params;
    const query = "DELETE FROM `nurse` WHERE `User_ID` = ?;";

    try {
        const result = await db.promise().query(query, [id]);
        const { affectedRows } = result[0];

        if (affectedRows > 0) {
            removeUser(id);
            return res.json("Nurse Removed Successfully");
        } else {
            return res.json("No Nurse Found or Error in Deletion");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
}

module.exports = removeNurse;