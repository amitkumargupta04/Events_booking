import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/home/Header';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">

      <Header />

      {/* FULL WIDTH — NO LEFT/RIGHT SPACE */}
      <main className="flex-1 w-full p-0 m-0">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="text-center w-full">© 2025 Graviti Infosystem</div>
      </footer>

    </div>
  );
}
