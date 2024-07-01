const db = require('../dbinstance');

const getUserInfo = async (id, type) => {
    const query = `SELECT * FROM ${type} WHERE User_ID = ?`;
    try {
        const result = await db.promise().query(query, [id]);
        return result[0][0];
    } catch (err) { 
        return err;
    }

}

const getUserType = async (email) => {
    const query = "SElECT User_Type, User_ID FROM users WHERE Email = ?";
    try {
        const result = await db.promise().query(query, [email]);
        if (result[0]) {
            const user = await getUserInfo(result[0][0].User_ID, result[0][0].User_Type);
            return ["Logged in Successfully", result[0][0].User_Type, user];
        }
    } catch (error) {
        console.error(error);
        return "An internal server error occurred";
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    const query = "SELECT Email, Password FROM users WHERE Email = ?;";

    try {
        const result = await db.promise().query(query, [email]);
        if (result[0].length > 0) {
            const { Email, Password } = result[0][0];

            if (Email === email && Password === password) {
                let user = await getUserType(email);
                return res.json(user);
            } else {
                return res.json("Email or Password is Wrong");
            }
        } else {
            return res.json("User Not Found");
        }
    } catch (error) {
        return res.status(500).json("An internal server error occurred");
    }
};

module.exports = login;
