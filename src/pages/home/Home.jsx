import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/home/hero/Hero';
import './Home.css';

// Lazy load heavy components - only load when scrolled to
const FeaturedProjects = lazy(() => import('../../components/home/featured-projects/FeaturedProjects'));
const SkillsOverview = lazy(() => import('../../components/home/skills-overview/SkillsOverview'));
const CVSection = lazy(() => import('../../components/home/cv-section/CVSection'));
const RecentArticles = lazy(() => import('../../components/home/Recent-articles/RecentArticles'));
const CallToAction = lazy(() => import('../../components/home/call-to-action/CallToAction'));

// Light skeleton/placeholder while loading
const ComponentLoader = () => (
  <div style={{ height: '400px', background: '#f0f0f0', animation: 'pulse 2s infinite' }} />
);

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      {/* Hero loads immediately - critical for first paint */}
      <Hero />

      {/* Everything else lazy loads on demand */}
      <Suspense fallback={<ComponentLoader />}>
        <FeaturedProjects />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <SkillsOverview />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <CVSection />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <RecentArticles />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <CallToAction />
      </Suspense>
    </motion.div>
  );
};

export default Home;