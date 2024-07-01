
const mysql = require('mysql2')

const urlDB = `mysql://root:FvsbhzINapvigkRmEMgKNVHEMuPoVKGv@monorail.proxy.rlwy.net:15982/railway`;

const db = mysql.createConnection(urlDB, {timezone: 'Z'})
db.connect((err) => {
    if (err)
        return console.log(err);
    console.log("connected");
})

module.exports = db;
