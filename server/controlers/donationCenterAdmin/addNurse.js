const db = require("../../dbinstance");

const insertUser = async (email, password) => {
    const query = `INSERT INTO users (Email, Password, User_Type) VALUES (?, ?, "nurse")`;
    try {
        const result = await db.promise().query(query, [email, password]);
        return result[0].insertId;
    } catch (error) {
        console.error('Failed to insert user:', error);
        throw new Error('Database error during user insertion.');
    }
}

const getDCID = async (id) => {
    const query = "SELECT DC_ID FROM `donation_center` WHERE DC_Admin_ID = ?";
    const result = await db.promise().query(query, [id]);
    return result[0][0];
}

const addNurse = async function (req, res) {
    const { id } = req.params;
    const { Nurse_Name, Nurse_Age, Nurse_Email, Nurse_Password, Gender, License_No } = req.body;
    const userID = await insertUser(Nurse_Email, Nurse_Password);
    const {DC_ID} = await getDCID(id);

    try {
        const query = "INSERT INTO `nurse` "
                + "(`Nurse_Name`, `Nurse_Age`, `Nurse_Email`, `Nurse_Password`, `Gender`, `License_No`, `DC_ID`, `User_ID`)"
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [Nurse_Name, Nurse_Age, Nurse_Email, Nurse_Password, Gender, License_No, DC_ID, userID];

        const result = await db.promise().query(query, values);
        const { insertId } = result[0];
        if (insertId) {
            const query = "SELECT Nurse_ID, Nurse_Name, Nurse_Email FROM `nurse` WHERE DC_ID = ?";
            const [data] = await db.promise().query(query, [DC_ID]);
            res.json(data);
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err });
    }
}

module.exports = addNurse;