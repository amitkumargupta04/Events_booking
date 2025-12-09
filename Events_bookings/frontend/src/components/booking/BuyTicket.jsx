import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";

export default function BuyTicket() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Events From API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events/all-events");
        const data = await res.json();
        setEvents(data.events);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-10">Buy Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Parallax speed={5} key={event.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-56 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-green-600 font-semibold mb-2">
                  Available Seats: {event.available_seats}
                </p>

                {/* VIEW DETAILS BUTTON */}
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
    </div>
  );
}
