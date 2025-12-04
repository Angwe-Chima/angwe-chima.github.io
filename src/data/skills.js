// Skills data
export const skills = [
  // Frontend
  {
    id: 1,
    name: 'React',
    category: 'Frontend',
    icon: 'FaReact',
    color: '#61DAFB',
  },
  {
    id: 2,
    name: 'JavaScript',
    category: 'Frontend',
    icon: 'SiJavascript',
    color: '#F7DF1E',
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: 'SiTailwindcss',
    color: '#06B6D4',
  },
  {
    id: 4,
    name: 'HTML/CSS',
    category: 'Frontend',
    icon: 'FaHtml5',
    color: '#E34F26',
  },

  // Backend
  {
    id: 5,
    name: 'Node.js',
    category: 'Backend',
    icon: 'FaNodeJs',
    color: '#339933',
  },
  {
    id: 6,
    name: 'Express.js',
    category: 'Backend',
    icon: 'SiExpress', // Using a generic server icon
    color: '#FFF',
  },
  {
    id: 7,
    name: 'REST APIs',
    category: 'Backend',
    icon: 'FaServer',
    color: '#0078D4',
  },

  // Database
  {
    id: 8,
    name: 'MongoDB',
    category: 'Database',
    icon: 'SiMongodb',
    color: '#47A248',
  },
  {
    id: 9,
    name: 'MySQL',
    category: 'Database',
    icon: 'SiMysql',
    color: '#4479A1',
  },
  {
    id: 11,
    name: 'Microsoft SQL Server',
    category: 'Database',
    icon: 'DiMsqlServer',
    color: '#CC2927',
  },

  // Tools & Others
  {
    id: 12,
    name: 'Git',
    category: 'Tools',
    icon: 'FaGitAlt',
    color: '#F05032',
  },
  {
    id: 13,
    name: 'GitHub',
    category: 'Tools',
    icon: 'FaGithub',
    color: '#FFF',
  },
  {
    id: 14,
    name: 'VS Code',
    category: 'Tools',
    icon: 'VscVscode',
    color: '#007ACC',
  },
  {
    id: 15,
    name: 'Postman',
    category: 'Tools',
    icon: 'SiPostman',
    color: '#FF6C37',
  },
  {
    id: 16,
    name: 'Figma',
    category: 'Tools',
    icon: 'FaFigma',
    color: '#F24E1E',
  },

  // Additional Skills
  {
    id: 17,
    name: 'Java',
    category: 'Backend',
    icon: 'FaJava',
    color: '#FFF',
  },
  {
    id: 18,
    name: 'Firebase',
    category: 'Backend',
    icon: 'SiFirebase',
    color: '#FFCA28',
  },
  {
    id: 19,
    name: 'Python',
    category: 'Backend',
    icon: 'FaPython',
    color: '#3776AB',
  },
  {
    id: 12,
    name: 'Flutter',
    category: 'Mobile Framework',
    icon: 'SiFlutter',
    color: '#02569B',
  },
  {
    id: 13,
    name: 'Dart',
    category: 'Programming Language',
    icon: 'SiDart',
    color: '#0175C2',
  },
];

// Skill categories
export const skillCategories = ['Frontend', 'Backend', 'Database', 'Tools'];

// Helper function to get skills by category
export const getSkillsByCategory = (category) => {
  return skills.filter((skill) => skill.category === category);
};

// Helper function to get all categories with their skills
export const getSkillsGroupedByCategory = () => {
  return skillCategories.map((category) => ({
    category,
    skills: getSkillsByCategory(category),
  }));
};
