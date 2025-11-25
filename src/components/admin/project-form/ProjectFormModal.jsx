import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { createProject, updateProject } from '../../../services/projectService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import { PROJECT_CATEGORIES } from '../../../utils/constants';
import './ProjectFormModal.css';

const ProjectFormModal = ({ project, onClose }) => {
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
    defaultValues: project || {
      title: '',
      description: '',
      fullDescription: '',
      thumbnail: '',
      techStack: [],
      category: 'Web App',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
  });

  const thumbnailUrl = watch('thumbnail');

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
      setValue('thumbnail', result.url);
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

      // Convert tech stack from comma-separated string to array
      const formattedData = {
        ...data,
        techStack: data.techStack
          .split(',')
          .map((tech) => tech.trim())
          .filter((tech) => tech),
      };

      if (project) {
        await updateProject(project._id, formattedData);
      } else {
        await createProject(formattedData);
      }

      onClose();
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="project-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{project ? 'Edit Project' : 'Create New Project'}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="project-form">
            <Input
              label="Title"
              name="title"
              placeholder="E-Commerce Platform"
              register={register}
              error={errors.title}
              required
            />

            <Input
              label="Short Description"
              name="description"
              placeholder="Full-stack online shopping platform"
              register={register}
              error={errors.description}
              required
            />

            <Textarea
              label="Full Description"
              name="fullDescription"
              placeholder="Detailed description of your project..."
              rows={4}
              register={register}
              error={errors.fullDescription}
              required
            />

            <div className="form-group">
              <label>Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              {uploadingImage && <p>Uploading...</p>}
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Preview" className="image-preview" />
              )}
            </div>

            <Input
              label="Thumbnail URL (or upload above)"
              name="thumbnail"
              placeholder="https://..."
              register={register}
              error={errors.thumbnail}
              required
            />

            <Input
              label="Tech Stack (comma-separated)"
              name="techStack"
              placeholder="React, Node.js, MongoDB, Stripe"
              register={register}
              error={errors.techStack}
              required
            />

            <div className="form-group">
              <label>Category</label>
              <select {...register('category')} className="form-select">
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Live URL"
              name="liveUrl"
              placeholder="https://..."
              register={register}
            />

            <Input
              label="GitHub URL"
              name="githubUrl"
              placeholder="https://github.com/..."
              register={register}
            />

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register('featured')} />
                <span>Featured Project</span>
              </label>
            </div>

            {submitError && <p className="error-text">{submitError}</p>}

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : project ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectFormModal;