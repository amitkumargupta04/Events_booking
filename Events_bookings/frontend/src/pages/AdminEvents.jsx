import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCalendarDay, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000';

// Modal Component
export function Modal({ open, onClose, onSubmit, loading, editingEvent = null }) {
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

  function formatDateForInput(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const requiredFields = ['title', 'date', 'location', 'total_seats', 'available_seats', 'price'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert('Please fill in all required fields');
        return;
      }
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
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay with blur */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-light leading-none">×</button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Event Title *" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location *" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />

                <div className="grid grid-cols-2 gap-4">
                  <input type="number" name="total_seats" value={formData.total_seats} onChange={handleChange} placeholder="Total Seats *" className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" min="0" required />
                  <input type="number" name="available_seats" value={formData.available_seats} onChange={handleChange} placeholder="Available Seats *" className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" min="0" required />
                </div>

                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹) *" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" min="0" step="0.01" required />
                <input type="url" name="img" value={formData.img} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                {formData.img && <div className="flex justify-center mt-2"><img src={formData.img} alt="preview" className="h-24 w-24 object-cover rounded border" /></div>}

                <div className="flex flex-col gap-3 mt-4">
                  <button type="submit" disabled={loading} className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 ">
                    {loading ? (editingEvent ? '⏳ Updating...' : '⏳ Creating...') : (editingEvent ? '✓ Update Event' : '✓ Create Event')}
                  </button>
                  <button type="button" onClick={onClose} className="w-full py-3 border rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main AdminEvents Component
export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    try {
      setError('');
      const res = await axios.get(`${API_URL}/events/all-events`);
      setEvents(res.data?.events || []);
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
        await axios.put(`${API_URL}/events/update/${editingEvent.id}`, eventData, { headers: { Authorization: `Bearer ${token}` } });
        Swal.fire({ title: 'Updated!', text: 'Event updated.', icon: 'success', timer: 2000 });
      } else {
        await axios.post(`${API_URL}/events/create`, eventData, { headers: { Authorization: `Bearer ${token}` } });
        Swal.fire({ title: 'Created!', text: 'Event created.', icon: 'success', timer: 2000 });
      }
      await fetchEvents();
      setIsOpen(false);
      setEditingEvent(null);
    } catch (err) {
      alert('Failed to save event: ' + (err?.response?.data?.error || err.message));
    } finally { setLoading(false); }
  }

  function handleEdit(event) { setEditingEvent(event); setIsOpen(true); }

  async function handleDelete(id, title) {
    const result = await Swal.fire({
      title: 'Delete Event?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/events/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setEvents(prev => prev.filter(e => e.id !== id));
      Swal.fire({ title: 'Deleted!', text: `"${title}" deleted.`, icon: 'success', timer: 2000 });
    } catch (err) {
      Swal.fire({ title: 'Error!', text: err?.response?.data?.error || 'Failed to delete event', icon: 'error' });
    }
  }

  return (
    <div className="relative min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3"><FaCalendarDay className="text-blue-600" /><h2 className="text-2xl font-semibold">Our Events</h2></div>
        <button onClick={() => setIsOpen(true)} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700">
          <FaPlus /><span className="ml-1 hidden sm:inline">Add Event</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">{error}</div>}

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y border-collapse">
          <thead className="bg-gray-50">
            <tr>{['S.No','Image','Title','Description','Location','Date','Price','Total','Available','Actions'].map((h, i) => <th key={i} className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {events.length === 0 && <tr><td colSpan={10} className="px-6 py-8 text-center text-gray-500">No events yet — add one.</td></tr>}
            {events.map((ev, idx) => (
              <tr key={ev.id}>
                <td className="px-6 py-4 border-r">{idx+1}</td>
                <td className="px-6 py-4 border-r">{ev.img ? <img src={ev.img} alt="" className="h-12 w-12 object-cover rounded"/> : <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">No img</div>}</td>
                <td className="px-6 py-4 border-r">{ev.title}</td>
                <td className="px-6 py-4 border-r text-sm text-gray-600 max-w-xs truncate">{ev.description}</td>
                <td className="px-6 py-4 border-r">{ev.location}</td>
                <td className="px-6 py-4 border-r">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 border-r">₹{parseFloat(ev.price).toFixed(2)}</td>
                <td className="px-6 py-4 border-r">{ev.total_seats}</td>
                <td className="px-6 py-4 border-r">{ev.available_seats}</td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button onClick={() => handleEdit(ev)} className="p-2 rounded hover:text-purple-600"><FaEdit/></button>
                  <button onClick={() => handleDelete(ev.id, ev.title)} className="p-2 rounded hover:text-red-600"><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden mt-4 space-y-3">
        {events.length === 0 && <div className="p-4 bg-white rounded shadow text-center text-gray-500">No events yet — add one.</div>}
        <div className="overflow-y-auto max-h-[80vh] space-y-3">
          {events.map((ev, idx) => (
            <div key={ev.id} className="bg-white rounded shadow p-4">
              <div className="flex items-start gap-3">
                {ev.img ? <img src={ev.img} alt="" className="h-16 w-16 object-cover rounded"/> : <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-xs">No img</div>}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{idx+1}. {ev.title}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(ev)} className="p-2 rounded hover:bg-blue-50"><FaEdit/></button>
                      <button onClick={() => handleDelete(ev.id, ev.title)} className="p-2 rounded hover:bg-red-50 text-red-600"><FaTrash/></button>
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

      {/* Modal */}
      <Modal
        open={isOpen}
        onClose={() => { setIsOpen(false); setEditingEvent(null); }}
        onSubmit={handleAdd}
        loading={loading}
        editingEvent={editingEvent}
      />
    </div>
  );
}
