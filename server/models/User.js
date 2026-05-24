import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    smartID: {
        type: String,
        require: true,
        unique: true
    },
    passportID: {
        type: String,
        require: true,
    },
    nationality: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    ownphno: {
        type: String,
        require: true
    },
    famphno: {
        type: String,
        require: true
    },
    tripst: {
        type: String,
        require: true,
    },
    trioend: {
        type: String,
        require: true,
    },
    location: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
        lastUpdated: { type: Date, default: null }
    },
    status: {
        type: String,
        enum: ["safe", "warning", "sos", "inactive"],
        default: "safe"
    },
    safetyScore: {
        type: Number,
        default: 100
    }
})

const User = mongoose.model("User", userSchema);
export default User;