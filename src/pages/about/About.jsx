import React from 'react';
import { motion } from 'framer-motion';
import Bio from '../../components/about/bio/Bio';
import SkillsSection from '../../components/about/skills-section/SkillsSection';
import ServicesSection from '../../components/about/services-section/ServicesSection';
import GallerySection from '../../components/about/gallery-section/GallerySection';
import AwardsSection from '../../components/about/awards-section/AwardsSection';
import './About.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#gallery-section') {
      const element = document.getElementById('gallery-section');
      if (element) {
        const offsetTop = element.offsetTop - 100; // adjust offset if needed
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container-custom section-padding">
        {/* Page Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-title">The Thing About Chima</h1>
          <p className="about-subtitle">
            Get to know more about who I am, what I do, and what I'm passionate
            about
          </p>
        </motion.div>

        {/* Bio Section */}
        <Bio />

        {/* Skills Section */}
        <SkillsSection />

        {/* Services Section */}
        <ServicesSection />
        
        <div id="gallery-section"></div>

        {/* Gallery Section */}
        <GallerySection />

        {/* Awards Section */}
        <AwardsSection />
      </div>
    </motion.div>
  );
};

export default About;
