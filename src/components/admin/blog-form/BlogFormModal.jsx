import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { createBlogPost, updateBlogPost } from '../../../services/blogService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import { BLOG_CATEGORIES } from '../../../utils/constants';
import './BlogFormModal.css';

const BlogFormModal = ({ post, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: post || {
      title: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      category: 'Tech',
      tags: [],
      published: true,
    },
  });

  const featuredImage = watch('featuredImage');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const result = await uploadImage(file);
      setValue('featuredImage', result.url);
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const formattedData = {
        ...data,
        tags: data.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (post) {
        await updateBlogPost(post._id, formattedData);
      } else {
        await createBlogPost(formattedData);
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
          className="blog-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{post ? 'Edit Blog Post' : 'Create New Post'}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
            <Input
              label="Title"
              name="title"
              placeholder="Getting Started with React Hooks"
              register={register}
              error={errors.title}
              required
            />

            <Textarea
              label="Excerpt"
              name="excerpt"
              placeholder="Short summary of your post..."
              rows={2}
              register={register}
              error={errors.excerpt}
              required
            />

            <Textarea
              label="Content"
              name="content"
              placeholder="Write your blog post content here..."
              rows={8}
              register={register}
              error={errors.content}
              required
            />

            <div className="form-group">
              <label>Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              {uploadingImage && <p>Uploading...</p>}
              {featuredImage && (
                <img src={featuredImage} alt="Preview" className="image-preview" />
              )}
            </div>

            <Input
              label="Featured Image URL (or upload above)"
              name="featuredImage"
              placeholder="https://..."
              register={register}
              error={errors.featuredImage}
              required
            />

            <div className="form-group">
              <label>Category</label>
              <select {...register('category')} className="form-select">
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Tags (comma-separated)"
              name="tags"
              placeholder="React, JavaScript, Tutorial"
              register={register}
            />

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('published')} />
                <span>Publish immediately</span>
              </label>
            </div>

            {submitError && <p className="error-text">{submitError}</p>}

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : post ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogFormModal;