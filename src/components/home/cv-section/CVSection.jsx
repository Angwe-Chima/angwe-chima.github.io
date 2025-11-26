import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaLightbulb,
  FaUsers,
  FaRocket,
  FaLaugh,
  FaArrowRight,
} from 'react-icons/fa';
import Button from '../../common/button/Button';
import ResumePreviewModal from '../../common/resume-preview-modal/ResumePreviewModal';
import FloatingCardsGrid from '../../common/floating-cards-grid/FloatingCardsGrid';
import './CVSection.css';
import { useNavigate } from 'react-router-dom';

const CVSection = () => {
  const navigate = useNavigate();

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const highlights = [
    {
      icon: FaUsers,
      title: 'Collaboration Master',
      description: "Team player who doesn't hog the good coffee",
    },
    {
      icon: FaLightbulb,
      title: 'Problem Solver',
      description: 'Turning "how?" into "why didn\'t I think of that?"',
    },
    {
      icon: FaRocket,
      title: 'Quick Learner',
      description:
        'New tech? I\'ll figure it out faster than you can say "documentation"',
    },
    {
      icon: FaLaugh,
      title: 'Communication Skills',
      description: 'Can explain complex stuff without putting you to sleep',
    },
  ];

  // Gallery images for the floating grid
  const galleryImages = [
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764069892/portfolio/images/k0wmhzeamtmjxd7e25ty.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764071528/portfolio/images/uqgg3yysrmyvyw9dvzee.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764071520/portfolio/images/bwtbbtxhkf7mtoeyp9px.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764071588/portfolio/images/uvtjc2mfh2z0bzq5ivjq.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764127007/IMG-20250906-WA0057_ogji01.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764127018/Gemini_Generated_Image_fbc05cfbc05cfbc0_gnlb1b.png',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764127110/WhatsApp_Image_2025-07-11_at_8.51.18_AM_dd85uz.jpg',
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1764127109/WhatsApp_Image_2025-06-26_at_6.51.48_PM_oxequi.jpg',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="cv-section">
      <div className="container-custom">
        <motion.div
          className="cv-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left Side - Main Content */}
          <div className="cv-content">
            <h2 className="cv-title">More About Me</h2>
            <p className="cv-subtitle">
              Download my CV to see the full story, but here's what I'm really
              about: genuine collaboration, creative problem-solving, and
              actually making things work (and look good while doing it).
            </p>

            {/* Highlights Grid */}
            <motion.div
              className="cv-highlights"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="highlight-item"
                    variants={itemVariants}
                  >
                    <div className="highlight-icon">
                      <Icon size={20} />
                    </div>
                    <div className="highlight-text">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="cv-button-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="primary"
                className="cv-button"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FaDownload size={16} />
                Checkout My CV
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Floating Cards Grid */}
          <div className="cv-visual">
            <FloatingCardsGrid images={galleryImages} />
          </div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};

export default CVSection;
