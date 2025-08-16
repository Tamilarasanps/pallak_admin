import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTools, FaEdit, FaPlus } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
    const { pathname } = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-sm sm:text-base md:text-lg ${pathname === path
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-50 p-6 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:fixed`}
        >

            {/* Close button for mobile */}
            <button
                className="lg:hidden mb-4 text-gray-600 font-bold text-base"
                onClick={onClose}
            >
                ✕ Close
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-indigo-600">
                Admin Panel
            </h2>

            <nav className="space-y-3">
                <Link to="/" className={linkClass("/")} onClick={onClose}>
                    <FaTools /> Admin Page
                </Link>
                <Link to="/edit" className={linkClass("/edit")} onClick={onClose}>
                    <FaEdit /> Edit Vehicles
                </Link>
                <Link to="/create" className={linkClass("/create")} onClick={onClose}>
                    <FaPlus /> Create Vehicle
                </Link>
            </nav>
        </div>
    );
}
