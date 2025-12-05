import React from 'react';
import { FaPlus, FaImages } from 'react-icons/fa';
import Button from '../../components/common/button/Button';

const EmptyGalleryState = ({ onCreate }) => {
  return (
    <div className="empty-state">
      <FaImages size={48} className="empty-icon" />
      <p>No gallery posts yet. Create your first post!</p>
      <Button variant="primary" onClick={onCreate}>
        <FaPlus size={16} />
        Create Post
      </Button>
    </div>
  );
};

export default EmptyGalleryState;