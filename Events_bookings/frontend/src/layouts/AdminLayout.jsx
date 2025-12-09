import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
	const [open, setOpen] = useState(true);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const navigate = useNavigate();

	function handleLogout() {
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('role');
		} catch (e) {}
		toast.success('Logged Out Successfully', {
			position: 'top-right',
			autoClose: 2000
		});
		navigate('/admin/login');
	}

	const sidebarVariants = {
		open: { width: 256, transition: { type: 'spring', stiffness: 300, damping: 30 } },
		closed: { width: 64, transition: { type: 'spring', stiffness: 300, damping: 30 } }
	};

	const mobileDrawerVariants = {
		open: { x: 0, transition: { type: 'tween', duration: 0.3 } },
		closed: { x: '-100%', transition: { type: 'tween', duration: 0.3 } }
	};

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Desktop Sidebar */}
			<motion.aside
				className="hidden md:flex flex-col bg-white border-r"
				animate={open ? 'open' : 'closed'}
				variants={sidebarVariants}
			>
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<div className="flex items-center gap-3">
						<div className="bg-purple-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold">GI</div>
						{open && <span className="font-semibold">Graviti</span>}
					</div>
					<button onClick={() => setOpen(s => !s)} className="p-2 rounded hover:bg-gray-100">
						<FiMenu />
					</button>
				</div>

				<nav className="flex-1 px-2 py-4">
					<NavLink
						to="/admin/events"
						title="Events"
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-md mb-1 ${
								isActive ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
							}`
						}
					>
						<FaCalendarAlt />
						{open ? <span>Events</span> : <span className="sr-only">Events</span>}
					</NavLink>
				</nav>

				<div className="px-3 py-4 border-t">
					<button
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-purple-600 hover:text-white"
					>
						<FiLogOut />
						{open && <span>Logout</span>}
					</button>
				</div>
			</motion.aside>

			{/* Mobile Drawer */}
			<AnimatePresence>
				{isMobileOpen && (
					<>
						<motion.div
							className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMobileOpen(false)}
						/>

						<motion.aside
							className="fixed inset-y-0 left-0 z-50 bg-white w-72 shadow-lg flex flex-col"
							initial="closed"
							animate="open"
							exit="closed"
							variants={mobileDrawerVariants}
						>
							<div className="flex items-center justify-between px-4 py-3 border-b">
								<div className="flex items-center gap-3">
									<div className="bg-blue-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold">SF</div>
									<span className="font-semibold">Summitra</span>
								</div>
								<button onClick={() => setIsMobileOpen(false)} className="p-2 rounded hover:bg-gray-100">✕</button>
							</div>

							<nav className="px-2 py-4 flex-1 overflow-y-auto">
								<NavLink
									to="/admin/events"
									onClick={() => setIsMobileOpen(false)}
									className={({ isActive }) =>
										`flex items-center gap-3 px-3 py-2 rounded-md mb-1 ${
											isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
										}`
									}
								>
									<FaCalendarAlt />
									<span>Events</span>
								</NavLink>
							</nav>

							<div className="px-3 py-4 border-t">
								<button
									onClick={() => { setIsMobileOpen(false); handleLogout(); }}
									className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
								>
									<FiLogOut />
									<span>Logout</span>
								</button>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>

			{/* Main content */}
			<div className={`flex-1 flex flex-col ${isMobileOpen ? 'overflow-hidden' : ''}`}>
				<header className="bg-white border-b px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setIsMobileOpen(true)}
							className="p-2 rounded hover:bg-gray-100 md:hidden"
						>
							<FiMenu />
						</button>
						<h1 className="text-lg font-semibold">Admin Dashboard</h1>
					</div>
					<div className="flex items-center gap-4">
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white"
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
