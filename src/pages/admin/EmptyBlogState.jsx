import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/common/button/Button';

const EmptyBlogState = ({ onCreate }) => {
  return (
    <div className="empty-state">
      <p>No blog posts yet. Create your first post!</p>
      <Button variant="primary" onClick={onCreate}>
        <FaPlus size={16} className="mr-2" />
        Create Post
      </Button>
    </div>
  );
};

export default EmptyBlogState;