import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-purple-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Left Side */}
        <h1 className="text-2xl font-bold tracking-wide">
          EventMaster
        </h1>

        {/* Right Side Button */}
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
          Buy Tickets
        </button>

      </div>
    </header>
  );
}
