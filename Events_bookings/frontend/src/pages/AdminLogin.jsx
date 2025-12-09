import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token, role } = res.data;
      if (!token) throw new Error('No token returned from server');

      if (role !== 'admin') {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setError('You are not authorized to access the admin dashboard');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      toast.success('Login Successful! Welcome back, Admin', { position: 'top-right', autoClose: 2000 });
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  // Animation variants
  const leftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left - imagery */}
      <motion.div
        className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8"
        initial="hidden"
        animate="visible"
        variants={leftVariant}
      >
        <div className="max-w-md">
          <img
            src="https://www.shutterstock.com/image-photo/portrait-woman-typing-office-laptop-260nw-2488685749.jpg"
            alt="event"
            className="rounded-lg shadow mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin</h2>
          <p className="text-gray-600">
            Manage events, view bookings and keep your platform running smoothly.
          </p>
        </div>
      </motion.div>

      {/* Right - login form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-8"
        initial="hidden"
        animate="visible"
        variants={rightVariant}
      >
        <motion.div
          className="w-full max-w-md bg-white rounded-lg shadow p-8"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Admin Login</h3>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </motion.div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Use your admin credentials to sign in</div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
