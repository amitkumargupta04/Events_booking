import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

      // only allow admin role to proceed to admin dashboard
      if (role !== 'admin') {
        // store token briefly then remove so other parts don't treat user as admin
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setError('You are not authorized to access the admin dashboard');
        // clear stored credentials for safety
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      // Show success toast
      toast.success('Login Successful! Welcome back, Admin', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      // redirect to admin dashboard (App routes `/admin` -> `/admin/events`)
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - imagery */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="max-w-md">
          <img src="https://images.unsplash.com/photo-1503424886302-3c73dbac6d6b?q=80&w=1200&auto=format&fit=crop" alt="event" className="rounded-lg shadow mb-6" />
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin</h2>
          <p className="text-gray-600">Manage events, view bookings and keep your platform running smoothly.</p>
        </div>
      </div>

      {/* Right - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-semibold mb-6">Admin Login</h3>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border rounded px-3 py-2"
                />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Use your admin credentials to sign in</div>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
