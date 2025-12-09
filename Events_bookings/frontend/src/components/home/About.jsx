import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
  return (
    <div className="w-full bg-black text-white py-16 px-4 md:px-12 mt-6">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        About
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl text-lg md:text-xl leading-relaxed mb-12 space-y-2"
      >
        Summitra 2025 is an immersive IT Conference held over the course of 
        three days, <span className="text-purple-600">August 13–15.</span> Our mission is to explore challenges and 
        push the limits of innovation. A person's success is measured by how 
        they approach challenges and overcome them.
      </motion.p>

      {/* TIMER + BUTTON */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        {/* TIMER BOXES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-4 gap-4 w-full md:w-auto"
        >
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-gray-900 text-white font-bold text-center rounded-xl py-4 px-6 shadow-lg"
            >
              <p className="text-3xl">00</p>
              <span className="text-sm font-semibold">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* BUY NOW BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-white  text-black transition px-10 py-4 rounded-xl font-bold shadow-lg w-full md:w-auto justify-center"
          onClick={()=> navigate("/buy-ticket")}
        >
          Buy Now <FaArrowRight size={18}  className="bg-purple-600 text-white p-[5px] rounded-full"/>
        </motion.button>
      </div>
    </div>
  );
}
