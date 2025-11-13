import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user.user.username);

  const nav = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Matches", to: "/dashboard/matches" },
    { name: "Create Match", to: "/match/create" },
    { name: "Profile", to: "/profile" },
  ];

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-semibold">ESports</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>
              {n.name}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t">
          <button className="w-full text-left text-sm text-red-600">Logout</button>
        </div>
      </aside>

      {/* Mobile sidebar (overlay) */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${open ? "block" : "hidden"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black opacity-30" onClick={() => setOpen(false)} />
        <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-md">
          <div className="h-16 flex items-center px-6 border-b">
            <span className="text-lg font-semibold">ESports</span>
          </div>
          <nav className="px-2 py-4 space-y-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {n.name}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Open sidebar"
              onClick={() => setOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Welcome</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Signed in as <span className="font-medium">{user}</span></div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
