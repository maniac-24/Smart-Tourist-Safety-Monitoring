import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    tlsAllowInvalidCertificates: true
  }).then(() => console.log("Db connected"))
}