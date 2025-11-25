import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import {
  getAllProjects,
  deleteProject,
} from '../../../services/projectService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import ProjectFormModal from '../../../components/admin/project-form/ProjectFormModal';
import { formatDate } from '../../../utils/formatDate';
import './ManageProjects.css';

const ManageProjects = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { data: projects, loading, error, refetch } = useFetch(getAllProjects);

  const handleCreate = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        refetch();
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProject(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-projects-page">
      {/* Header */}
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Projects</h1>
          <p className="manage-subtitle">
            Create, edit, and delete your portfolio projects
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Table */}
      {projects && projects.length > 0 ? (
        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tech Stack</th>
                <th>Featured</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <motion.tr
                  key={project._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="project-thumbnail"
                    />
                  </td>
                  <td className="project-title-cell">{project.title}</td>
                  <td>
                    <span className="project-category">{project.category}</span>
                  </td>
                  <td>
                    <div className="tech-stack-cell">
                      {project.techStack.slice(0, 2).map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 2 && (
                        <span className="tech-badge">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {project.featured ? (
                      <span className="badge-success">Yes</span>
                    ) : (
                      <span className="badge-default">No</span>
                    )}
                  </td>
                  <td>{formatDate(project.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => window.open(`/projects`, '_blank')}
                        className="action-btn view-btn"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
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
          <p>No projects yet. Create your first project!</p>
          <Button variant="primary" onClick={handleCreate}>
            <FaPlus size={16} className="mr-2" />
            Create Project
          </Button>
        </div>
      )}

      {/* Project Form Modal */}
      {showModal && (
        <ProjectFormModal project={editingProject} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default ManageProjects;
