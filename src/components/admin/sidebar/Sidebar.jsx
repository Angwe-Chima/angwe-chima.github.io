import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaFolder,
  FaBlog,
  FaEnvelope,
  FaImages,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/projects', icon: FaFolder, label: 'Projects' },
    { path: '/admin/blog', icon: FaBlog, label: 'Blog Posts' },
    { path: '/admin/gallery', icon: FaImages, label: 'Gallery' },
    { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;