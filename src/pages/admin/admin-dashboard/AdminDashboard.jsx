import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFolder, FaBlog, FaEnvelope, FaImages, FaEye } from 'react-icons/fa';
import { getAllProjects } from '../../../services/projectService';
import { getAllBlogPosts } from '../../../services/blogService';
import { getAllMessages } from '../../../services/contactService';
import { getAllGalleryImages } from '../../../services/galleryService';
import Card from '../../../components/common/card/Card';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    messages: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, blog, messages, gallery] = await Promise.all([
          getAllProjects(),
          getAllBlogPosts(1, 1000),
          getAllMessages(),
          getAllGalleryImages(),
        ]);

        setStats({
          projects: projects.length,
          blogPosts: blog.totalPosts || blog.posts?.length || 0,
          messages: messages.filter((m) => !m.read).length,
          gallery: gallery.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Projects',
      count: stats.projects,
      icon: FaFolder,
      link: '/admin/projects',
      color: '#3B82F6',
    },
    {
      title: 'Blog Posts',
      count: stats.blogPosts,
      icon: FaBlog,
      link: '/admin/blog',
      color: '#10B981',
    },
    {
      title: 'Unread Messages',
      count: stats.messages,
      icon: FaEnvelope,
      link: '/admin/messages',
      color: '#F59E0B',
    },
    {
      title: 'Gallery Images',
      count: stats.gallery,
      icon: FaImages,
      link: '/admin/gallery',
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your portfolio overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="dashboard-stats"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={fadeInUp}>
              <Link to={stat.link}>
                <Card className="stat-card">
                  <div
                    className="stat-icon"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={28} style={{ color: stat.color }} />
                  </div>
                  <div className="stat-content">
                    <p className="stat-title">{stat.title}</p>
                    <h2 className="stat-count">{loading ? '...' : stat.count}</h2>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="dashboard-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="actions-title">Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/projects" className="action-card">
            <FaFolder size={24} />
            <span>Manage Projects</span>
          </Link>
          <Link to="/admin/blog" className="action-card">
            <FaBlog size={24} />
            <span>Manage Blog</span>
          </Link>
          <Link to="/admin/gallery" className="action-card">
            <FaImages size={24} />
            <span>Manage Gallery</span>
          </Link>
          <Link to="/" className="action-card">
            <FaEye size={24} />
            <span>View Live Site</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;