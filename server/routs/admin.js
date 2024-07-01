const express = require("express");

const donationCenterList = require("../controlers/admin/donationCenterList");
const removeDonationCenter = require("../controlers/admin/removeDonationCenter")
const addDonationCenter = require("../controlers/admin/addDonationCenter")
const changeDonationCenterAdmin = require("../controlers/admin/changeDonationCenterAdmin")
const router = express.Router();

router.get("/donationcenterlist", donationCenterList);
router.delete("/removedonationcenter/:id", removeDonationCenter);
router.post("/adddonationcenter", addDonationCenter);
router.post("/changedonationcenteradmin/:id", changeDonationCenterAdmin);

module.exports = router;