import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaImages } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllGalleryImages, deleteGalleryImage } from '../../../services/galleryService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import GalleryFormModal from '../../../components/admin/gallery-form/GalleryFormModal';
import './ManageGallery.css';

const ManageGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { data: posts, loading, error, refetch } = useFetch(getAllGalleryImages);

  const handleCreate = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery post?')) {
      try {
        await deleteGalleryImage(id);
        refetch();
      } catch (error) {
        alert('Failed to delete post');
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
    <div className="manage-gallery-page">
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Gallery</h1>
          <p className="manage-subtitle">Upload and manage your gallery posts with multiple images</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} />
          New Post
        </Button>
      </div>

      {posts && posts.length > 0 ? (
        <div className="gallery-grid-admin">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              className="gallery-post-admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -4 }}
            >
              <div className="post-thumbnail">
                <img src={post.imageUrls[0]} alt={post.title} />
                <div className="image-count">
                  <FaImages size={12} />
                  <span>{post.imageUrls.length}</span>
                </div>
              </div>
              
              <div className="post-info">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-category">{post.category}</p>
                {post.featured && <span className="featured-badge">Featured</span>}
              </div>

              <div className="post-overlay">
                <div className="post-actions">
                  <button
                    onClick={() => handleEdit(post)}
                    className="action-btn edit-btn"
                    title="Edit post"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="action-btn delete-btn"
                    title="Delete post"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaImages size={48} className="empty-icon" />
          <p>No gallery posts yet. Create your first post!</p>
          <Button variant="primary" onClick={handleCreate}>
            <FaPlus size={16} />
            Create Post
          </Button>
        </div>
      )}

      {showModal && (
        <GalleryFormModal image={editingPost} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default ManageGallery;