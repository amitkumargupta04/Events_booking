import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const speakers = [
  {
    name: "Amit Kumar",
    position: "Full Stack Developer",
    img: "https://img.freepik.com/free-photo/handsome-male-entrepreneur-using-laptop_176420-17902.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Sneha Sharma",
    position: "UI/UX Designer",
    img: "https://img.freepik.com/free-photo/portrait-smiling-handsome-man-eyeglasses_171337-4853.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Rohit Singh",
    position: "Frontend Developer",
    img: "https://media.istockphoto.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=612x612&w=0&k=20&c=ujyGdu8jKI2UB5515XZA33Tt4DBhDU19dKSTUTMZvrg=",
  },
  {
    name: "Priya Verma",
    position: "Backend Developer",
    img: "https://www.workitdaily.com/media-library/woman-working-in-the-tech-industry.jpg?id=25838098&width=1200&height=800&quality=50&coordinates=0%2C0%2C0%2C0",
  },
  {
    name: "Vikram Patel",
    position: "DevOps Engineer",
    img: "https://plus.unsplash.com/premium_photo-1682096343183-33dc522090ca?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhpbmtpbmclMjBtYW58ZW58MHx8MHx8fDA%3D",
  },
];

export default function MeetAllItMan() {
  return (
    <div className="w-full bg-purple-600 py-20 px-4 md:px-10">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-300 mt-5">
          Meet All the Top IT Minds
        </h2>
        <p className="text-lg md:text-xl">
          Explore our lineup of keynote speakers and industry leaders.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* FIRST ROW (3 cards) */}
        {speakers.slice(0, 3).map((speaker, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.25 }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden"
          >
            <img
              src={speaker.img}
              alt={speaker.name}
              className="w-full h-72 sm:h-80 md:h-96 object-cover"
            />
            <div className="p-5  bg-purple-600">
              <h3 className="text-white font-bold text-xl">{speaker.name}</h3>
              <p className="text-white/90">{speaker.position}</p>
            </div>
          </motion.div>
        ))}

        {/* SECOND ROW (2 cards) */}
        {speakers.slice(3, 5).map((speaker, index) => (
          <motion.div
            key={index + 3}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.25 }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden"
          >
            <img
              src={speaker.img}
              alt={speaker.name}
              className="w-full h-72 sm:h-80 md:h-96 object-cover"
            />
            <div className="p-5 bg-purple-600">
              <h3 className="text-white font-bold text-xl">{speaker.name}</h3>
              <p className="text-white/90">{speaker.position}</p>
            </div>
          </motion.div>
        ))}

        {/* BUY TICKET BLOCK (same size, same style, animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="overflow-hidden rounded-2xl shadow-lg bg-purple-500 flex items-center justify-center"
        >
          <Link
            to="/buy-ticket"
            className="text-white font-bold text-3xl py-10 w-full text-center"
          >
            Buy Ticket
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
