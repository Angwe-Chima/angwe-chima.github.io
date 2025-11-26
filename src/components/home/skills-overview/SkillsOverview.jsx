import React from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as vscIcons from "react-icons/vsc";
import * as diIcons from "react-icons/di";


import { skills } from '../../../data/skills';
import { containerVariants, fadeInUp } from '../../../utils/animations';

import './SkillsOverview.css';

const SkillsOverview = () => {
  return (
    <section className="skills-overview section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="skills-overview-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="skills-overview-title">Skills & Technologies</h2>
          <p className="skills-overview-subtitle">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill) => {
            const Icon = FaIcons[skill.icon] || SiIcons[skill.icon] || vscIcons[skill.icon] || diIcons[skill.icon];

            return (
              <motion.div
                key={skill.id}
                className="skill-item"
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {Icon && (
                  <Icon
                    className="skill-icon"
                    size={48}
                    style={{ color: skill.color }}
                  />
                )}
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsOverview;