import express from "express";
import { bookEvent } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/booked", bookEvent);

export default router;