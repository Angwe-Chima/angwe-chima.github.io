import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBlogPosts } from '../../../services/blogService';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import './RecentArticles.css';

const RecentArticlesSection = () => {
  const navigate = useNavigate();

  // Fetch only the 3 most recent posts
  const { data, loading, error, refetch } = useFetch(
    () => getAllBlogPosts(1, 3),
    []
  );

  const recentPosts = data?.posts || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleViewAllClick = () => {
    navigate('/blog');
  };

  const handleArticleClick = (postSlug) => {
    navigate(`/blog/${postSlug}`);
  };

  if (loading) {
    return (
      <section className="recent-articles-section">
        <div className="container-custom">
          <Loader size="large" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="recent-articles-section">
        <div className="container-custom">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  if (recentPosts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="recent-articles-section">
      <div className="container-custom">
        <motion.div
          className="recent-articles-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="recent-articles-title">Recent Articles</h2>
            <p className="recent-articles-subtitle">
              Insights, tutorials, and thoughts on web development
            </p>
          </div>
          <motion.button
            className="view-all-btn"
            onClick={handleViewAllClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <FaArrowRight />
          </motion.button>
        </motion.div>

        <motion.div
          className="articles-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {recentPosts.map((post) => (
            <motion.article
              key={post._id || post.id}
              className="article-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => handleArticleClick(post.slug)}
            >
              <div className="article-image-wrapper">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="article-image"
                />
                <div className="article-category">{post.category}</div>
              </div>

              <div className="article-content">
                <h3 className="article-title">{post.title}</h3>
                <p className="article-excerpt">{post.excerpt}</p>

                <div className="article-meta">
                  <div className="article-date">{post.date}</div>
                  <div className="article-read-time">
                    <FaClock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentArticlesSection;