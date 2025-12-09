import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCalendarDay, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const API_URL = 'http://localhost:5000';

function Modal({ open, onClose, onSubmit, loading, editingEvent = null }) {
  const initialFormData = {
    title: '',
    date: '',
    location: '',
    description: '',
    total_seats: '',
    available_seats: '',
    price: '',
    img: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  // Helper function to format ISO date to datetime-local format
  function formatDateForInput(isoDate) {
    if (!isoDate) return '';
    // Convert ISO format (2026-01-05T04:30:00.000Z) to datetime-local format (2026-01-05T04:30)
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Prefill form when editing an event
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        date: formatDateForInput(editingEvent.date),
        location: editingEvent.location,
        description: editingEvent.description || '',
        total_seats: editingEvent.total_seats.toString(),
        available_seats: editingEvent.available_seats.toString(),
        price: editingEvent.price.toString(),
        img: editingEvent.img || ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingEvent]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location || !formData.total_seats || !formData.available_seats || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const data = {
      title: formData.title,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      total_seats: parseInt(formData.total_seats),
      available_seats: parseInt(formData.available_seats),
      price: parseFloat(formData.price),
      img: formData.img || null
    };

    onSubmit(data);
    setFormData(initialFormData);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-none md:rounded-lg shadow-xl z-50 w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 px-4 sm:px-6 py-4 border-b bg-white flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{editingEvent ? 'Edit Event' : ' Add New Event'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-light leading-none">×</button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Date Field - Full Width on Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Event Date *</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Location Field - Full Width on Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              rows={3}
            />
          </div>

          {/* Total Seats - Full Width on Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Total Seats *</label>
            <input
              type="number"
              name="total_seats"
              value={formData.total_seats}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              min="0"
              required
            />
          </div>

          {/* Available Seats - Full Width on Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Available Seats *</label>
            <input
              type="number"
              name="available_seats"
              value={formData.available_seats}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              min="0"
              required
            />
          </div>

          {/* Price - Full Width on Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Price (₹) *</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              min="0"
              required
            />
          </div>

          {/* Image URL - Full Width */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Image URL</label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            {formData.img && (
              <div className="mt-2 flex items-center justify-center">
                <img src={formData.img} alt="preview" className="h-24 w-24 object-cover rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          {/* Buttons - Full Width on Mobile */}
          <div className="flex flex-col gap-3 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {loading ? (editingEvent ? '⏳ Updating...' : '⏳ Creating...') : (editingEvent ? '✓ Update Event' : '✓ Create Event')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setError('');
      const res = await axios.get(`${API_URL}/events/all-events`);
      const data = res.data?.events || [];
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    }
  }

  async function handleAdd(eventData) {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (editingEvent) {
        // Update existing event
        await axios.put(`${API_URL}/events/update/${editingEvent.id}`, eventData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        Swal.fire({
          title: 'Updated!',
          text: 'Event has been updated successfully.',
          icon: 'success',
          timer: 2000
        });
      } else {
        // Create new event
        await axios.post(`${API_URL}/events/create`, eventData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      // Refetch events after successful creation/update
      await fetchEvents();
      setIsOpen(false);
      setEditingEvent(null);
    } catch (err) {
      alert('Failed to save event: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(event) {
    setEditingEvent(event);
    setIsOpen(true);
  }

  async function handleDelete(id, title) {
    const result = await Swal.fire({
      title: 'Delete Event?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/events/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEvents(prev => prev.filter(e => e.id !== id));
      Swal.fire({
        title: 'Deleted!',
        text: `"${title}" has been deleted.`,
        icon: 'success',
        timer: 2000
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err?.response?.data?.error || 'Failed to delete event',
        icon: 'error'
      });
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <FaCalendarDay className="text-blue-600" />
          <h2 className="text-2xl font-semibold">Events</h2>
        </div>

        <div className="w-full sm:w-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            <FaPlus />
            <span className="ml-1 hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">{error}</div>}

      {/* /* Desktop / Tablet Table */ }
      <div className="hidden sm:block bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Available</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {events.map((ev, index) => (
              <tr key={ev.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 border-r border-gray-200">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {ev.img ? (
                    <img src={ev.img} alt={ev.title} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium border-r border-gray-200">{ev.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate border-r border-gray-200">{ev.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">{ev.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">₹{parseFloat(ev.price).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">{ev.total_seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-r border-gray-200">{ev.available_seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(ev)} className="p-2 rounded hover:bg-blue-50 text-blue-600"><FaEdit /></button>
                    <button onClick={() => handleDelete(ev.id, ev.title)} className="p-2 rounded hover:bg-red-50 text-red-600"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">No events yet — add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* /* Mobile - stacked cards with vertical scroll */ }
      <div className="sm:hidden mt-4">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {events.length === 0 && (
            <div className="p-4 bg-white rounded shadow text-center text-gray-500">No events yet — add one.</div>
          )}
          {events.map((ev, index) => (
            <div key={ev.id} className="bg-white rounded shadow p-4">
              <div className="flex items-start gap-3">
                {ev.img ? (
                  <img src={ev.img} alt={ev.title} className="h-16 w-16 object-cover rounded" />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No img</div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{index + 1}. {ev.title}</h4>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(ev)} className="p-2 rounded hover:bg-blue-50 text-blue-600"><FaEdit /></button>
                      <button onClick={() => handleDelete(ev.id, ev.title)} className="p-2 rounded hover:bg-red-50 text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 truncate">{ev.description}</p>
                  <div className="mt-2 text-sm text-gray-700 flex flex-col gap-1">
                    <span><strong>Date:</strong> {new Date(ev.date).toLocaleDateString()}</span>
                    <span><strong>Location:</strong> {ev.location}</span>
                    <span><strong>Price:</strong> ₹{parseFloat(ev.price).toFixed(2)}</span>
                    <span><strong>Seats:</strong> {ev.available_seats}/{ev.total_seats}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={isOpen} onClose={() => { setIsOpen(false); setEditingEvent(null); }} onSubmit={handleAdd} loading={loading} editingEvent={editingEvent} />
    </div>
  );
}
