const express = require("express")
// const login = require("../controlers/login")
const signup = require("../controlers/donor/signup")
const bookAnAppointment = require("../controlers/donor/bookAnAppointment")
const viewAvailablAppointments = require("../controlers/donor/viewAvailableAppointments")
const cancelAppointment = require("../controlers/donor/cancelAppointment")
const viewPreviousAppointments = require("../controlers/donor/viewPrviousAppointments")
const viewPersonaldata = require("../controlers/donor/viewPersonalData");
const editPersonalData = require("../controlers/donor/editPersonalData")
const viewBookedAppointment = require("../controlers/donor/viewBookedAppointment")
const viewDonationCentersList = require("../controlers/donor/viewDonationCentersList")
const getAvailebleTime = require("../controlers/donor/getAvailableTime")
const editAppointmentTime = require("../controlers/donor/editAppointmentTime")

const router = express.Router();

router.post("/signup", signup)
router.post("/book-an-appointment", bookAnAppointment)
router.post("/view-booked-appointment", viewBookedAppointment)
router.post("/view-available-appointments", viewAvailablAppointments)
router.post("/cancel-appointment/:id", cancelAppointment)
router.get("/view-previous-appointments/:id", viewPreviousAppointments)
router.get("/view-personal-data/:id", viewPersonaldata)
router.post("/edit-personal-data/:id", editPersonalData)
router.get("/view-donation-centers-list", viewDonationCentersList)
router.get("/get-available-time/:id", getAvailebleTime)
router.post("/edit-appointment-time/:id", editAppointmentTime)


module.exports = router;
