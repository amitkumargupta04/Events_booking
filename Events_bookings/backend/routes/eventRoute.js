import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getEventsByDate,
  getEventsByLocation,
  getEventsByLocationAndDate,
  updateEvent,
} from "../controllers/eventController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-events", getEvents);
router.get("/filter", getEventsByLocationAndDate);


router.post("/create", protectAdmin, createEvent);
router.put("/update/:id", protectAdmin, updateEvent);
router.delete("/delete/:id", protectAdmin, deleteEvent)
router.get("/:id", getEventById);

export default router;
