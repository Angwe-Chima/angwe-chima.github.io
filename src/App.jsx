import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/protected-route/ProtectedRoute';
import Layout from './components/layouts/layout/Layout';
import Loader from './components/common/loader/Loader';

// Lazy load all pages - only loads when needed
const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPostPage = lazy(() => import('./pages/blog-post/BlogPostPage'));
const Contact = lazy(() => import('./pages/contact/Contact'));

// Admin Pages - lazy loaded
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));
const Login = lazy(() => import('./pages/admin/login/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/admin-dashboard/AdminDashboard'));
const ManageProjects = lazy(() => import('./pages/admin/manage-projects/ManageProjects'));
const ManageGallery = lazy(() => import('./pages/admin/manage-gallery/ManageGallery'));
const ManagerBlog = lazy(() => import('./pages/admin/manage-blog/ManageBlog'));
const ViewMessages = lazy(() => import('./pages/admin/view-messages/ViewMessages'));

// Fallback component while loading
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Loader size="large" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
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
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;