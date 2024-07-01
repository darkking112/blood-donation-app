const db = require('../../dbinstance');

const validateEmail = async (email) => {
    const query = "SELECT Email FROM users WHERE Email = ?";
    try {
        const result = await db.promise().query(query, [email]);
        return result[0].length === 0;
    } catch (error) {
        console.error('Failed to validate email:', error);
        throw new Error('Database error during email validation.');
    }
}

const insertUser = async (email, password) => {
    const query = `INSERT INTO users (Email, Password, User_Type) VALUES (?, ?, "donor")`;
    try {
        const result = await db.promise().query(query, [email, password]);
        return result[0].insertId;
    } catch (error) {
        console.error('Failed to insert user:', error);
        throw new Error('Database error during user insertion.');
    }
}

const signup = async (req, res) => {
    let { name, email, password, phoneNo, age, gender, nationality, ic } = req.body;
    try {
        const isValid = await validateEmail(email);
        if (isValid) {
            const userId = await insertUser(email, password);
            const query = "INSERT INTO donor (Donor_Name, Donor_Age, Donor_Email, Donor_Password, Phone_Number, Gender, Nationality, IC_Number, User_ID)"
                        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
            const values = [name, age, email, password, phoneNo, gender, nationality, ic, userId];
            const result = await db.promise().query(query, values);
            if (result[0].insertId)
                return res.json("Account Created Successfully");
            else
                return res.json("An Error Occurred");
        } else {
            return res.json("Account Already Exists");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("An internal server error occurred");
    }
}

module.exports = signup;
