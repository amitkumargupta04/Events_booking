import React from "react";
import { motion } from "framer-motion";

export default function Conferences() {
  // Sample images, aap apni images replace kar sakte ho
  const images = [
    "https://thumbs.dreamstime.com/b/business-man-pointing-something-conference-men-meeting-room-31009473.jpg",
    "https://media.istockphoto.com/id/968943368/photo/the-goal-was-to-grow-and-we-did-it.jpg?s=612x612&w=0&k=20&c=ovpGfZbP-SUxvFPngfuyrNXYu2LmHZ5QDCrQiBqbITw=",
    "https://media.istockphoto.com/id/1783739913/photo/happy-black-public-speaker-during-business-conference-in-convention-center-looking-at-camera.jpg?s=612x612&w=0&k=20&c=aPj6rCdrTYWHnEmPizombwH6Q1LvF4IGfqAteM4HQ8c=",
  ];

  return (
    <div className="w-full bg-purple-600 text-white py-20 px-4 md:px-10">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-300">
          Resources from Past Conferences
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Explore our lineup of keynote speakers and industry leaders who will inspire and enlighten at the conference.
        </p>
      </div>

      {/* Images Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <img
              src={img}
              alt={`Conference ${index + 1}`}
              className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
