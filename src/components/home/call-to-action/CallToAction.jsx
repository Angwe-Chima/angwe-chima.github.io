import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../common/button/Button';
import ResumePreviewModal from '../../common/resume-preview-modal/ResumePreviewModal';
import { FaDownload } from 'react-icons/fa';
import './CallToAction.css';

const CallToAction = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section className="cta section-padding">
      <div className="container-custom">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Let's Work Together</h2>
          <p className="cta-description">
            Have a project in mind? I'm open to discussing new opportunities,
            creative ideas, or partnerships.
          </p>
          <div className="cta-buttons">
            <Link to="/contact">
              <Button variant="primary">Get In Touch</Button>
            </Link>

            <Button variant="secondary" onClick={() => setIsResumeOpen(true)}>
              <FaDownload size={16} className="mr-2" />
              View Resume
            </Button>
          </div>
        </motion.div>
      </div>

      <ResumePreviewModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
};

export default CallToAction;
