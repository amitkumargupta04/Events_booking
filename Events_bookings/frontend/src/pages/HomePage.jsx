import React from "react";
import { FaRocket, FaUsers, FaGlobe, FaPhone } from "react-icons/fa";

const features = [
  { icon: <FaRocket size={30} />, title: "Fast & Reliable", desc: "Experience lightning fast performance for all your needs." },
  { icon: <FaUsers size={30} />, title: "User Friendly", desc: "Intuitive interface and easy navigation for everyone." },
  { icon: <FaGlobe size={30} />, title: "Global Reach", desc: "Connect with audiences all over the world seamlessly." },
];

export default function HomePage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Summitra Flowz</h1>
        <p className="text-lg md:text-2xl mb-6">We deliver amazing digital experiences for your business</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                <div className="text-blue-600 mb-4 flex justify-center">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="md:flex md:items-center md:gap-10">
          <img src="https://via.placeholder.com/500x350" alt="About Us" className="rounded-lg shadow mb-6 md:mb-0" />
          <div>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
              Summitra Flowz is committed to delivering top-notch digital solutions to help businesses grow and succeed online. Our expert team designs user-friendly websites, applications, and strategies.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Learn More</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to elevate your business?</h2>
        <p className="mb-6">Get in touch with our team today and start your journey!</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">Contact Us</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Summitra Flowz. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <FaPhone />
            <FaGlobe />
            <FaUsers />
          </div>
        </div>
      </footer>
    </div>
  );
}
