import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600">Summitra Flowz</Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">© 2025 Summitra Flowz</div>
      </footer>
    </div>
  );
}
