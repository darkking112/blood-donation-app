const db = require("../../dbinstance");

const insertAddress = async (link) => {
    const query = "INSERT INTO `address` (Address_Link) VALUES (?)";
    try {
        const result = await db.promise().query(query, [link]);
        return result[0].insertId;
    } catch (error) {
        console.error('Failed to insert address:', error);
        throw new Error('Database error during address insertion.');
    }
}

const insertUser = async (email, password) => {
    const query = `INSERT INTO users (Email, Password, User_Type) VALUES (?, ?, "donation_center_admin")`;
    try {
        const result = await db.promise().query(query, [email, password]);
        return result[0].insertId;
    } catch (error) {
        console.error('Failed to insert user:', error);
        throw new Error('Database error during user insertion.');
    }
}

const insertAdmin = async (name, age, email, password, userId) => {
    const query = "INSERT INTO `donation_center_admin` (DC_Admin_Name, DC_Admin_Age, DC_Admin_Email, DC_Admin_Password, User_ID) VALUES (?, ?, ?, ?, ?)";
    try {
        const result = await db.promise().query(query, [name, age, email, password, userId]);
        return result[0].insertId;
    } catch (error) {
        console.error('Failed to insert admin:', error);
        throw new Error('Database error during admin insertion.');
    }
}

const addDonationCenter = async (req, res) => {
    const { DC_Admin_Name, DC_Admin_Age, DC_Admin_Email, DC_Admin_Password, DC_Name, DCAdressLink } = req.body;

    try {
        const addressID = await insertAddress(DCAdressLink);
        const userId = await insertUser(DC_Admin_Email, DC_Admin_Password);
        const adminID = await insertAdmin(DC_Admin_Name, DC_Admin_Age, DC_Admin_Email, DC_Admin_Password, userId);

        const query = "INSERT INTO `donation_center` (DC_Name, Address_ID, DC_Admin_ID) VALUES (?, ?, ?)";
        await db.promise().query(query, [DC_Name, addressID, adminID]);

        const result = await db.promise().query("SELECT * FROM `donation_center_list`");
        res.json(result[0]);
    } catch (error) {
        console.error('Error in addDonationCenter:', error);
        res.status(500).json({ message: "An internal server error occurred", error });
    }
}

module.exports = addDonationCenter;
