import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";

export default function BuyTicket() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  // Fetch with optional filters
  const fetchEvents = async (loc = "", dt = "") => {
    try {
      setLoading(true);

      let url = "http://localhost:5000/events/filter?";

      if (loc) url += `location=${loc}&`;
      if (dt) url += `date=${dt}&`;

      const res = await fetch(url);
      const data = await res.json();
      setEvents(data.events || []);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  // Initial load (all events)
  useEffect(() => {
    fetchEvents();
  }, []);

  // Whenever location OR date changes → fetch new events
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchEvents(location, date);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [location, date]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-10 mt-8">Buy Tickets</h2>

      {/* 🔍 Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-10 bg-white p-5 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Location Search */}
        <div>
          <label className="text-gray-700 font-semibold">Location</label>
          <input
            type="text"
            placeholder="Search location..."
            className="w-full p-3 border rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div>
          <label className="text-gray-700 font-semibold">Date</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setLocation("");
              setDate("");
              fetchEvents();
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </motion.div>

      {/* 🔄 Loading */}
      {loading && (
        <div className="text-center py-20 text-xl font-semibold">
          Loading events...
        </div>
      )}

      {/* 🎟 Events Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 && (
            <p className="text-center text-gray-600 col-span-3 text-xl">
              No events found!
            </p>
          )}

          {events.map((event) => (
            <Parallax speed={5} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

                  <p className="text-gray-600 mb-1">📍 {event.location}</p>
                  <p className="text-gray-600 mb-1">
                    🗓 {new Date(event.date).toDateString()}
                  </p>

                  <p className="text-green-600 font-semibold mb-3">
                    Available Seats: {event.available_seats}
                  </p>

                  <Link to={`/buy-ticket/${event.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </Parallax>
          ))}
        </div>
      )}
    </div>
  );
}
