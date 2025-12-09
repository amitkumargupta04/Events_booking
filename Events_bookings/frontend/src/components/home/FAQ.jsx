import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbPlus, TbX } from "react-icons/tb";

const faqs = [
  {
    question: "What is EventMaster?",
    answer: "EventMaster helps you book events worldwide.",
  },
  {
    question: "Can I get a refund?",
    answer: "Refunds available before 24 hours.",
  },
  {
    question: "Are group discounts available?",
    answer: "Yes, for 5+ members.",
  },
  {
    question: "Is my ticket transferable?",
    answer: "Only if event rules allow.",
  },
  {
    question: "How will I receive my tickets?",
    answer: "Tickets are sent via email immediately after successful booking.",
  },
  {
    question: "Can I book multiple events at once?",
    answer: "Yes, each booking must be processed separately.",
  },
  {
    question: "Are there any age restrictions?",
    answer: "Some events may have age restrictions. Check before booking.",
  },
  {
    question: "Who do I contact for support?",
    answer: "Reach out to support@eventmaster.com or call +91-9876543210.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="w-full bg-black text-white py-20 px-4 md:px-10">
      <h2 className="text-5xl font-bold text-center mb-16">
        Frequently Asked Questions
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggle(index)}
            className="relative bg-gray-900 rounded-xl shadow-lg p-6 cursor-pointer"
          >
            {/* Question Row */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span className="text-2xl">
                {open === index ? <TbX /> : <TbPlus />}
              </span>
            </div>

            {/* ANSWER AS ABSOLUTE DROPDOWN */}
            <AnimatePresence>
              {open === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-white/80">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
