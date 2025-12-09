import React from "react";
import { motion } from "framer-motion";

export default function Conferences() {
  // Sample images, aap apni images replace kar sakte ho
  const images = [
    "https://media.istockphoto.com/id/465525185/photo/wedding-planner-checking-table-decorations-in-marquee.jpg?s=612x612&w=0&k=20&c=j29jrBS3xKpcmkj5pUK_pxVIJ2cdMOpEHhe0wAJaLgI=",
    "https://img.freepik.com/free-photo/new-year-spend-with-friends-celebrating_23-2149196991.jpg?semt=ais_se_enriched&w=740&q=80",
    "https://img.freepik.com/free-photo/cheerful-man-having-fun-party_329181-4889.jpg",
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
