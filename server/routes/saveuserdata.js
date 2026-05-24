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

// Calculate and update safety score
UserRouter.post("/updatesafetyscore", fecthuer, async (req, res) => {
  try {
    const userid = req.user;
    const user = await User.findById(userid);
    
    let score = 100;

    // Deduct if no location for more than 10 minutes
    if (user.location?.lastUpdated) {
      const minutesSinceUpdate = (Date.now() - new Date(user.location.lastUpdated)) / 60000;
      if (minutesSinceUpdate > 10) score -= 20;
      if (minutesSinceUpdate > 30) score -= 30;
    } else {
      score -= 10;
    }

    // High risk zones (check proximity)
    const HIGH_RISK = [
      { lat: 26.1445, lng: 91.7362 },
      { lat: 25.3176, lng: 82.9739 },
    ];

    if (user.location?.lat && user.location?.lng) {
      for (const zone of HIGH_RISK) {
        const dist = Math.sqrt(
          Math.pow(user.location.lat - zone.lat, 2) +
          Math.pow(user.location.lng - zone.lng, 2)
        );
        if (dist < 0.5) { score -= 30; break; }
      }
    }

    score = Math.max(0, score);
    const status = score >= 70 ? "safe" : score >= 40 ? "warning" : "sos";

    await User.findByIdAndUpdate(userid, { safetyScore: score, status });
    return res.status(200).json({ status: true, safetyScore: score, touristStatus: status });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: "Failed to update safety score" });
  }
});

export default UserRouter;