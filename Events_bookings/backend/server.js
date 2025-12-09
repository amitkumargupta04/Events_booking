import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

import authRoutes from "./routes/authRoute.js";
import eventRoutes from "./routes/eventRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

app.use("/", (req, res) =>{
    res.json("API is working");
})

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
