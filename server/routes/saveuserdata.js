import express from "express"
import User from "../models/User.js";
import { fecthuer } from "../middleware/fecthuser.js";

const UserRouter = express.Router();

UserRouter.post("/savedata", (req, res) => {
  const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, nationality, Trustid } = req.body;

  const newuser = new User({
    fullname: fullName,
    smartID: Trustid,
    passportID: passportNumber,
    nationality: nationality,
    email: trustemail,
    ownphno: touristContact,
    famphno: familyContact,
    tripst: startDate,
    trioend: endDate
  });

  newuser.save()
    .then(() => {
      res.status(201).json({ status: true, message: "User data saved successfully" });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ status: false, error: "Failed to save user data" });
    });
});

// Update tourist live location
UserRouter.post("/updatelocation", fecthuer, async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const userid = req.user;

    await User.findByIdAndUpdate(userid, {
      location: {
        lat: lat,
        lng: lng,
        lastUpdated: new Date()
      }
    });

    return res.status(200).json({ status: true, message: "Location updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: "Failed to update location" });
  }
});

// Update tourist status (safe, warning, sos)
UserRouter.post("/updatestatus", fecthuer, async (req, res) => {
  try {
    const { status } = req.body;
    const userid = req.user;

    await User.findByIdAndUpdate(userid, { status });
    return res.status(200).json({ status: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: "Failed to update status" });
  }
});

// Get ALL tourists for police dashboard (no auth needed for police)
UserRouter.get("/allforpolice", async (req, res) => {
  try {
    const users = await User.find({}).select("-passportID -famphno");
    return res.status(200).json({ status: true, message: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: "Internal server error" });
  }
});

UserRouter.get("/fethalldata", fecthuer, async (req, res) => {
  try {
    const userid = req.user;
    const userdata = await User.findById(userid);
    return res.status(200).json({ "Status": true, "message": userdata });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ "Status": false, "error": "Internal server error" });
  }
});

UserRouter.post("/fethdatausename", fecthuer, async (req, res) => {
  try {
    const { fullName } = req.body;
    const userdata = await User.find({ fullname: fullName }).select("-famphno -ownphno -passportID -tripst -trioend -smartID");
    return res.status(200).json({ "status": true, "message": userdata });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ "Status": false, "message": "Internal server error", "error": error });
  }
});

export default UserRouter;