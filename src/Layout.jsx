import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 min-h-screen bg-gray-50 p-4 lg:ml-64">
        {/* Menu Button for small/medium screens */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-indigo-600 font-bold"
          >
            ☰ Menu
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
