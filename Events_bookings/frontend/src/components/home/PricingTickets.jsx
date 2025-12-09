import React from "react";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function PricingTickets() {
  const plans = [
    {
      title: "Basic",
      price: "$99",
      features: [
        "Full event access",
        "Access to keynote & breakout sessions",
        "Networking opportunities",
        "Access to post-event session recordings",
        "Conference materials and swag bag",
      ],
    },
    {
      title: "Premium",
      price: "$199",
      features: [
        "All Basic features",
        "VIP seating",
        "Meet & greet with speakers",
        "Exclusive workshop access",
        "Premium conference materials",
      ],
    },
  ];
  
  const naviagte = useNavigate();
  return (
    <div className="w-full bg-purple-600 py-20 px-4 md:px-10 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-300">Pricing for Tickets</h2>
        <p className="text-lg md:text-xl text-white/90">
          Explore our lineup of keynote speakers and industry leaders who will inspire and enlighten at the conference.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className="bg-purple-500 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <p className="mb-4 text-white/80">Get a seat</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy Ticket Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto bg-white text-black py-3 px-6 rounded-xl flex items-center justify-between font-semibold gap-2 shadow-md"
              onClick={()=> naviagte("/buy-ticket")}
            >
              <span className="mx-auto">Buy Ticket</span>
              <TbArrowRight size={24} className="bg-purple-600 p-1 rounded-full text-white" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
