const db = require("../../dbinstance");

const updateUser = async (email, passeord, id) => {
    const query = "UPDATE users SET Email = ?, Password = ? WHERE User_ID = ?;";
    const result = await db.promise().query(query, [email, passeord, id]);
    return result[0].affectedRows;
}

const changeDonationCenterAdmin = async function (req, res) {
    const { id } = req.params;
    const { DC_Admin_Name, DC_Admin_Age, DC_Admin_Email, DC_Admin_Password } = req.body;

    const updateDCAdminQuery = "UPDATE donation_center_admin "
                    + "SET DC_Admin_Name = ?, DC_Admin_Age = ?, DC_Admin_Email = ?, DC_Admin_Password = ? "
                    + "WHERE User_ID = ?;";
    let values = [DC_Admin_Name, DC_Admin_Age, DC_Admin_Email, DC_Admin_Password, id];

    try {
        const result = await db.promise().query(updateDCAdminQuery, values);
        const { affectedRows } = result[0];
        if (affectedRows > 0) {
            await updateUser(DC_Admin_Email, DC_Admin_Password, id);
            res.json("Admin Updated Successfully");
        } else {
            res.json("Admin not found or no changes made");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("An internal server error occurred");
    }
}

module.exports = changeDonationCenterAdmin;