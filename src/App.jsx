import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/protected-route/ProtectedRoute';
import Layout from './components/layouts/layout/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import Blog from './pages/blog/Blog';
import BlogPostPage from './pages/blog-post/BlogPostPage';
import Contact from './pages/contact/Contact';
import AdminLayout from './components/admin/layout/AdminLayout';

// Admin Pages
import Login from './pages/admin/login/Login';
import AdminDashboard from './pages/admin/admin-dashboard/AdminDashboard';
import ManageProjects from './pages/admin/manage-projects/ManageProjects';
import ManageGallery from './pages/admin/manage-gallery/ManageGallery';
import ManagerBlog from './pages/admin/manage-blog/ManageBlog';
import ViewMessages from './pages/admin/view-messages/ViewMessages';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="blog" element={<ManagerBlog />} />
          <Route path="messages" element={<ViewMessages />} />

          {/* More admin pages will be added here */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
