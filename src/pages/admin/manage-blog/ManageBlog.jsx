import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBlogPosts, deleteBlogPost } from '../../../services/blogService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import BlogFormModal from '../../../components/admin/blog-form/BlogFormModal';
import { formatDate } from '../../../utils/formatDate';
import './ManageBlog.css';

const ManageBlog = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => getAllBlogPosts(1, 1000));

  const posts = data?.posts || [];

  const handleCreate = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        refetch();
      } catch (error) {
        alert('Failed to delete blog post');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingPost(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-blog-page">
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Blog Posts</h1>
          <p className="manage-subtitle">Create, edit, and delete your blog posts</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} className="mr-2" />
          New Post
        </Button>
      </div>

      {posts.length > 0 ? (
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Published</th>
                <th>Views</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <motion.tr
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="post-thumbnail"
                    />
                  </td>
                  <td className="post-title-cell">{post.title}</td>
                  <td>
                    <span className="post-category">{post.category}</span>
                  </td>
                  <td>
                    {post.published ? (
                      <span className="badge-success">Yes</span>
                    ) : (
                      <span className="badge-default">No</span>
                    )}
                  </td>
                  <td>{post.views}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="action-btn view-btn"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="action-btn delete-btn"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No blog posts yet. Create your first post!</p>
          <Button variant="primary" onClick={handleCreate}>
            <FaPlus size={16} className="mr-2" />
            Create Post
          </Button>
        </div>
      )}

      {showModal && (
        <BlogFormModal post={editingPost} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default ManageBlog;