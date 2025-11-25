import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { createGalleryImage, updateGalleryImage, addImageToPost, removeImageFromPost } from '../../../services/galleryService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import './GalleryFormModal.css';

const GalleryFormModal = ({ image, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [removingImageIndex, setRemovingImageIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: image || {
      title: '',
      description: '',
      category: 'Other',
      order: 0,
      featured: false,
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (image) {
      setImageUrls(image.imageUrls || []);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [image]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const result = await uploadImage(file);
      setImageUrls([...imageUrls, result.url]);
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async (index) => {
    if (image && window.confirm('Remove this image?')) {
      try {
        setRemovingImageIndex(index);
        await removeImageFromPost(image._id, index);
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
      } catch (error) {
        alert('Failed to remove image');
      } finally {
        setRemovingImageIndex(null);
      }
    } else if (!image) {
      // For new posts, just remove from local state
      const newUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newUrls);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      if (imageUrls.length === 0) {
        setSubmitError('Please upload at least one image');
        return;
      }

      const postData = {
        ...data,
        imageUrls,
      };

      if (image) {
        await updateGalleryImage(image._id, postData);
      } else {
        await createGalleryImage(postData);
      }

      onClose();
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="gallery-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{image ? 'Edit Gallery Post' : 'Create New Gallery Post'}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="gallery-form">
            <Input
              label="Title"
              name="title"
              placeholder="Working on Project"
              register={register}
              error={errors.title}
              required
            />

            <Textarea
              label="Description (optional)"
              name="description"
              placeholder="Tell the story behind these images..."
              rows={3}
              register={register}
            />

            <div className="form-group">
              <label>Category</label>
              <select {...register('category')} className="form-select">
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Events">Events</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input
              label="Order"
              name="order"
              type="number"
              placeholder="0"
              register={register}
            />

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('featured')} />
                <span>Featured Post</span>
              </label>
            </div>

            {/* Image Upload Section */}
            <div className="images-section">
              <label>Gallery Images ({imageUrls.length})</label>
              <div className="upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    // Handle multiple file uploads
                    Array.from(e.target.files || []).forEach((file) => {
                      handleImageUpload({ target: { files: [file] } });
                    });
                  }}
                  disabled={uploadingImage}
                  className="file-input"
                />
                <div className="upload-placeholder">
                  <p>Drag and drop images here or click to select</p>
                  {uploadingImage && <p className="uploading">Uploading...</p>}
                </div>
              </div>

              {/* Display uploaded images */}
              {imageUrls.length > 0 && (
                <div className="images-grid">
                  {imageUrls.map((url, index) => (
                    <motion.div
                      key={index}
                      className="image-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <img src={url} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        disabled={removingImageIndex === index}
                        className="remove-image-btn"
                      >
                        <FaTrash size={14} />
                      </button>
                      <span className="image-number">{index + 1}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {submitError && <p className="error-text">{submitError}</p>}

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : image ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GalleryFormModal;