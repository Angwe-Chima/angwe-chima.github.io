import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';
import Bio from '../../components/about/bio/Bio';
import './About.css';

// Lazy load heavy sections
const SkillsSection = lazy(() => import('../../components/about/skills-section/SkillsSection'));
const ServicesSection = lazy(() => import('../../components/about/services-section/ServicesSection'));
const GallerySection = lazy(() => import('../../components/about/gallery-section/GallerySection'));
const AwardsSection = lazy(() => import('../../components/about/awards-section/AwardsSection'));

const SectionLoader = () => (
  <div style={{ height: '300px', background: '#f0f0f0', animation: 'pulse 2s infinite' }} />
);

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#gallery-section') {
      const element = document.getElementById('gallery-section');
      if (element) {
        const offsetTop = element.offsetTop - 100;
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
        {/* Page Header - loads immediately */}
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

        {/* Bio - loads immediately (lightweight) */}
        <Bio />

        {/* Skills - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        {/* Services - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>

        <div id="gallery-section"></div>

        {/* Gallery - lazy loaded (usually heavy with images) */}
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>

        {/* Awards - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <AwardsSection />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default About;