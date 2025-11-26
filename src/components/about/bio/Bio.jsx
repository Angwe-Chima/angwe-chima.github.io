import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import Button from '../../common/button/Button';
import ResumePreviewModal from '../../common/resume-preview-modal/ResumePreviewModal';
import './Bio.css';

const Bio = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section className="bio-section overflow-visible" >
      <div className="bio-content">
        <motion.div
          className="bio-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bio-image-container">
            <img
              src="https://res.cloudinary.com/dpcgk2sev/image/upload/v1763986486/me_reading_master_your_emotions_zpg98e.jpg"
              alt="Chima Angwe"
              className="bio-image"
            />
            <div className="bio-image-border" />
          </div>
        </motion.div>

        <motion.div
          className="bio-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="bio-title">About Me</h2>

          <div className="bio-paragraphs">
            <p>
              Hi! I'm <span className="text-gradient">Chima Angwe</span>, a
              passionate Full Stack Developer based in Lagos, Nigeria.
            </p>

            <p>I build digital experiences using the MERN stack.</p>

            <p>
              I enjoy learning new technologies and contributing to open source.
            </p>

            <p>I'm open to freelance and full-time opportunities.</p>
          </div>

          <div className="mt-6 flex justify-start">
            <Button variant="primary" onClick={() => setIsResumeOpen(true)}>
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

export default Bio;
