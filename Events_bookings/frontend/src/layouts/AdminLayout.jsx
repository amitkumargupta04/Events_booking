
import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AdminLayout() {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	function handleLogout() {
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('role');
		} catch (e) {}
		// Show logout toast
		toast.success('Logged Out Successfully', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
		navigate('/admin/login');
	}

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className={`bg-white border-r flex flex-col transition-all duration-200 ${open ? 'w-64' : 'w-16'}`}>
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<div className="flex items-center gap-3">
						<div className="bg-blue-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold">SF</div>
						{open && <span className="font-semibold">Summitra</span>}
					</div>
					<button onClick={() => setOpen(s => !s)} className="p-2 rounded hover:bg-gray-100">
						<FiMenu />
					</button>
				</div>

				<nav className="flex-1 px-2 py-4">
					<NavLink
						to="/admin/events"
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-md mb-1 ${
								isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
							}`
						}
					>
						<FaCalendarAlt />
						{open && <span>Events</span>}
					</NavLink>
				</nav>

				<div className="px-3 py-4 border-t">
					<button
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
					>
						<FiLogOut />
						{open && <span>Logout</span>}
					</button>
				</div>
			</aside>

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Top navbar */}
				<header className="bg-white border-b px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button onClick={() => setOpen(s => !s)} className="p-2 rounded hover:bg-gray-100 md:hidden">
							<FiMenu />
						</button>
						<h1 className="text-lg font-semibold">Admin Dashboard</h1>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100"
						>
							<FiLogOut />
							<span className="hidden sm:inline">Logout</span>
						</button>
					</div>
				</header>

				<main className="p-6 overflow-auto"><Outlet /></main>
			</div>
		</div>
	);
}

