import { db } from "../db.js";

export const getEvents = (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json({
        success: true,
        total: data.length,
        events: data,
    });
  });
};
export const createEvent = (req, res) => {
  const q = "INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.location,
    req.body.date,
    req.body.total_seats,
    req.body.available_seats,
    req.body.price,
    req.body.img
  ];

  db.query(q, [values], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    // Insert successful, ab total events count lete hain
    const countQuery = "SELECT COUNT(*) AS total FROM events";
    db.query(countQuery, (err, countResult) => {
      if (err) return res.status(500).json({ success: false, error: err });

      res.json({
        success: true,
        message: "Event created successfully!",
        totalEvents: countResult[0].total
      });
    });
  });
};

export const getEventById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM events WHERE id = ?", [id], (err, data) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (data.length === 0) return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, event: data[0] });
  });
};

export const updateEvent = (req, res) => {
  const id = req.params.id;
  const q = "UPDATE events SET ? WHERE id=?";

  db.query(q, [req.body, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({
        success: true,
        message: "Event updated successfully!"
    });
  });
};

export const deleteEvent = (req, res) => {
  db.query("DELETE FROM events WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({
        success: true,
        message: "Event deleted successfully!"
    });
  });
};

export const getEventsByLocation = (req, res) => {
  const { location } = req.params;
  console.log("PARAM LOCATION =", req.params.location);

  const query = "SELECT * FROM events WHERE LOWER(TRIM(location)) LIKE ?";
  const param = `%${location.toLowerCase().trim()}%`;

  db.query(query, [param], (err, data) => {
    if(err) return res.status(500).json({ success: false, error: err });

    res.json({
      success: true,
      totalEvents: data.length,
      events: data
    });
  });
};

export const getEventsByDate = (req, res) => {
  const { date } = req.params; // format: 'YYYY-MM-DD'
  const query = "SELECT * FROM events WHERE DATE(date) = ?";
  db.query(query, [date], (err, data) => {
    if(err) return res.status(500).json({ success: false, error: err });
    res.json({ success: true, events: data, totalEvents: data.length });
  });
};

export const getEventsByLocationAndDate = (req, res) => {
  const { location, date } = req.query;

  let query = "SELECT * FROM events WHERE 1=1";
  const params = [];

  // Location filter (optional)
  if(location) {
    query += " AND LOWER(location) LIKE ?";
    params.push(`%${location.toLowerCase()}%`);
  }

  // Date filter (optional)
  if(date) {
    query += " AND DATE(date) = ?";
    params.push(date);
  }

  db.query(query, params, (err, data) => {
    if(err) return res.status(500).json({ success: false, error: err });

    res.json({
      success: true,
      total: data.length,
      events: data
    });
  });
};




