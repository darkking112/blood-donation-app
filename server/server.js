const express = require('express')
const cors = require('cors')

const auth = require("./routs/auth.js")
const donor = require("./routs/donor.js")
const admin = require("./routs/admin.js")
const nurse = require("./routs/nurse.js")
const donationCenterAdmin = require("./routs/donationCenterAdmin.js")
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", auth);
app.use("/donor", donor);
app.use("/admin", admin); 
app.use("/donationcenteradmin", donationCenterAdmin);
app.use("/nurse", nurse);

const port = 5000
app.listen(port, () => {
    console.log("app is running");
})