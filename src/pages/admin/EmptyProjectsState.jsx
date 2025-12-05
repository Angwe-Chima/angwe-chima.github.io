import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/common/button/Button';

const EmptyProjectsState = ({ onCreate }) => {
  return (
    <div className="empty-state">
      <p>No projects yet. Create your first project!</p>
      <Button variant="primary" onClick={onCreate}>
        <FaPlus size={16} className="mr-2" />
        Create Project
      </Button>
    </div>
  );
};

export default EmptyProjectsState;