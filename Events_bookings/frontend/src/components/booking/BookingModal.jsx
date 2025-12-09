import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function BookingModal({ eventId, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    quantity: 1
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false); // <-- NEW STATE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/bookings/booked", {
        event_id: eventId,
        ...form
      });

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      setLoading(false);
      setError(true); // <-- SHOW ERROR MESSAGE
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: -40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="bg-white p-7 rounded-xl w-full max-w-md shadow-2xl border border-purple-200"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-700 text-center">
            Book Tickets
          </h2>

          {/* SUCCESS MODAL */}
          {success ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-green-600 text-6xl font-bold"
              >
                ✓
              </motion.div>
              <p className="text-green-600 mt-3 text-lg font-semibold">
                Booking Successful!
              </p>
            </motion.div>
          ) : error ? (

            /* ERROR MODAL */
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-red-600 text-6xl font-bold"
              >
                ✕
              </motion.div>
              <p className="text-red-600 mt-3 text-lg font-semibold">
                Booking Failed!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setError(false)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Try Again
              </motion.button>
            </motion.div>

          ) : (
            <motion.form
              className="space-y-4"
              onSubmit={handleBooking}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {["name", "email", "mobile", "quantity"].map((field) => (
                <motion.input
                  key={field}
                  whileFocus={{ scale: 1.02, borderColor: "#8b5cf6" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  name={field}
                  type={field === "email" ? "email" : field === "quantity" ? "number" : "text"}
                  min={field === "quantity" ? 1 : undefined}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "mobile"
                      ? "Mobile Number"
                      : field === "quantity"
                      ? "Quantity"
                      : "Email"
                  }
                  className="w-full p-3 border rounded-lg outline-none transition-all"
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </motion.button>
            </motion.form>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-4 text-gray-600 hover:text-black w-full font-medium"
            onClick={onClose}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
