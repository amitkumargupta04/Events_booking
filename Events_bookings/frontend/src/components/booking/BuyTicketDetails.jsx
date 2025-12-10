import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import BookingModal from "./BookingModal";

export default function BuyTicketDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Fetch Event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${id}`);
        const data = await res.json();
        setEvent(data.event);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20 text-red-500 text-xl font-semibold">
        Event not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 relative mt-10">
      
      {/* HEADER TITLE WITH PARALLAX */}
      <Parallax speed={-5}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-18"
        >
          {event.title}
        </motion.h1>
      </Parallax>

      {/* MAIN GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Event Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={event.img}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl shadow-xl"
        />

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>

          <p className="text-gray-700 mb-4">{event.description}</p>

          <p className="text-lg mb-2">
            📍 <span className="font-semibold">{event.location}</span>
          </p>

          <p className="text-lg mb-2">
            🗓 {new Date(event.date).toDateString()}
          </p>

          <p className="text-lg mb-2">
            🎟 Total Seats: <span className="font-semibold">{event.total_seats}</span>
          </p>

          <p className="text-lg mb-2 text-green-600">
            Available Seats: {event.available_seats}
          </p>

          <p className="text-2xl font-bold text-purple-600 mt-4 mb-6">
            ₹ {event.price}
          </p>

          {/* BOOK NOW BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
            onClick={() => setOpenModal(true)}
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>

      {/* MODAL */}
      {openModal && (
        <BookingModal
          eventId={id}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
