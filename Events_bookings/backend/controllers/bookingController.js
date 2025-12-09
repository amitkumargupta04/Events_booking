import { db } from "../db.js";


export const bookEvent = (req, res) => {
  const { event_id, name, email, mobile, quantity } = req.body;

  // Step 1: Get event seats
  db.query("SELECT * FROM events WHERE id=?", [event_id], (err, events) => {
    if (err || events.length === 0) return res.status(404).json("Event not found");

    const event = events[0];

    if (event.available_seats < quantity) {
      return res.status(400).json("Not enough seats");
    }

    const total_amount = event.price * quantity;

    // Step 2: Insert booking
    const q = "INSERT INTO bookings (event_id, name, email, mobile, quantity, total_amount, status) VALUES (?)";
    const values = [event_id, name, email, mobile, quantity, total_amount, "confirmed"];

    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);

      // Step 3: Update seats
      const newSeats = event.available_seats - quantity;
      db.query("UPDATE events SET available_seats=? WHERE id=?", [newSeats, event_id]);

      res.json({
        success: true,
        message: "Booking confirmed!",
      });
    });
  });
};
