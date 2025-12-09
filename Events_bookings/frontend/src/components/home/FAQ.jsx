import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbPlus, TbX } from "react-icons/tb";

const faqs = [
  {
    question: "What is EventMaster?",
    answer: "EventMaster is a platform to discover, book, and manage tickets for events worldwide."
  },
  {
    question: "Can I get a refund?",
    answer: "Refunds are available up to 24 hours before the event. Please contact support for assistance."
  },
  {
    question: "Are group discounts available?",
    answer: "Yes! Group discounts are available for 5 or more attendees. Contact us for details."
  },
  {
    question: "Is my ticket transferable?",
    answer: "Tickets are non-transferable unless explicitly mentioned in the event details."
  },
  {
    question: "How will I receive my tickets?",
    answer: "Tickets are sent via email immediately after successful booking."
  },
  {
    question: "Can I book multiple events at once?",
    answer: "Yes, you can book multiple events individually, but each booking must be processed separately."
  },
  {
    question: "Are there any age restrictions?",
    answer: "Some events may have age restrictions. Check the event details before booking."
  },
  {
    question: "Who do I contact for support?",
    answer: "For support, please reach out to support@eventmaster.com or call +91-9876543210."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-black text-white py-20 px-4 md:px-10">
      {/* Header */}
      <h2 className="text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>

      {/* FAQ Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl shadow-lg p-6 cursor-pointer overflow-hidden"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span className="text-2xl">
                {openIndex === index ? <TbX /> : <TbPlus />}
              </span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-white/80"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
