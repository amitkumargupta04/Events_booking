import React, { useState } from 'react';
import { FaCalendarDay, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

function Modal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !date) return;
    onSubmit({ id: Date.now(), title, date, location, description });
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-50 w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Event</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={3} />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Launch Meetup', date: '2025-12-15', location: 'New Delhi', description: 'Product launch and networking' },
    { id: 2, title: 'Design Workshop', date: '2026-01-10', location: 'Mumbai', description: 'Hands-on design sprint' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  function handleAdd(event) {
    setEvents(prev => [event, ...prev]);
    setIsOpen(false);
  }

  function handleDelete(id) {
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaCalendarDay className="text-blue-600" />
          <h2 className="text-2xl font-semibold">Events</h2>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            <FaPlus /> Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {events.map(ev => (
              <tr key={ev.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ev.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ev.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ev.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ev.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded hover:bg-gray-100 text-gray-600"><FaEdit /></button>
                    <button onClick={() => handleDelete(ev.id)} className="p-2 rounded hover:bg-red-50 text-red-600"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No events yet — add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
