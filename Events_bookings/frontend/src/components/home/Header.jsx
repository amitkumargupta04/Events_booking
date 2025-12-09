import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb"; // Right arrow icon

export default function Header() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-purple-600 text-white py-4 shadow-md fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Left Side Logo */}
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          Gravit Infosystem
        </motion.h1>

        {/* Right Side Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => navigate("/buy-ticket")}
        >
          <span>Buy Tickets</span>
          <motion.span
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TbArrowRight size={24}  className="bg-purple-500 text-white p-1 rounded-full" />
          </motion.span>
        </motion.button>

      </div>
    </motion.header>
  );
}
