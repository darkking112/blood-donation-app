const express = require("express")

const nurseList = require("../controlers/donationCenterAdmin/nurseList")
const addNurse = require("../controlers/donationCenterAdmin/addNurse")
const removeNurse = require("../controlers/donationCenterAdmin/removeNurse")

const router = express.Router();

router.get("/nurse-list/:id", nurseList);
router.post("/add-nurse/:id", addNurse);
router.delete("/remove-nurse/:id", removeNurse);

module.exports = router;