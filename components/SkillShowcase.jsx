import { useState } from 'react';
import styles from '../styles/SkillShowcase.module.css';

const SkillShowcase = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const mainStackSkillsInitial = [
    { name: 'Python', icon: '/icons/python-original.svg', isImage: true },
    { name: 'JavaScript', icon: '/icons/javascript-original.svg', isImage: true },
    { name: 'React', icon: '/icons/react-original.svg', isImage: true },
    { name: 'CSharp', icon: '/icons/csharp-original.svg', isImage: true },
    { name: 'C', icon: '/icons/c.svg', isImage: true },
    { name: 'Java', icon: '/icons/java-original.svg', isImage: true },
  ];

  const mainStackSkillsExpanded = [
    { name: 'Python', icon: '/icons/python-original.svg', isImage: true },
    { name: 'JavaScript', icon: '/icons/javascript-original.svg', isImage: true },
    { name: 'React', icon: '/icons/react-original.svg', isImage: true },
    { name: 'CSharp', icon: '/icons/csharp-original.svg', isImage: true },
    { name: 'C', icon: '/icons/c.svg', isImage: true },
    { name: 'Java', icon: '/icons/java-original.svg', isImage: true },
    { name: 'C++', icon: '/icons/cplusplus.svg', isImage: true },
    { name: 'Kotlin', icon: '/icons/kotlin-original.svg', isImage: true },
    { name: 'Git', icon: '/icons/git-original.svg', isImage: true },
    { name: 'CSS3', icon: '/icons/css3-original.svg', isImage: true },
    { name: 'HTML', icon: '/icons/html5-original.svg', isImage: true },
    { name: 'Jira', icon: '/icons/jira-original.svg', isImage: true },
    { name: 'Figma', icon: '/icons/figma-original.svg', isImage: true }
  ];

  const secondarySkills = [
    { name: 'Node.js', icon: '/icons/nodejs-original.svg', isImage: true },
    { name: '.NET', icon: '/icons/dot-net-original.svg', isImage: true },
    { name: 'Raspberry Pi', icon: '/icons/raspberrypi-original.svg', isImage: true },
    { name: 'MongoDB', icon: '/icons/mongodb-original.svg', isImage: true },
    { name: 'Docker', icon: '/icons/docker-original.svg', isImage: true },
    { name: 'Blender', icon: '/icons/blender-original.svg', isImage: true },
  ];

  const renderSkillSection = (skills, title) => (
    <div className={styles.sectionWrapper}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      
      <div className={styles.skillGrid}>
        {skills.map((skill, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={styles.iconContainer}
          >
            <div className={styles.iconInner}>
              {skill.isImage ? (
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  className={styles.iconImage}
                />
              ) : (
                <span className={styles.iconText}>
                  {skill.icon}
                </span>
              )}
            </div>

            {hoveredSkill && hoveredSkill.name === skill.name && (
              <div className={styles.tooltip}>
                {skill.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.skillsSection}>
      <div className={styles.container}>
        {renderSkillSection(
          isExpanded ? mainStackSkillsExpanded : mainStackSkillsInitial, 
          'main stack'
        )}
        
        {!isExpanded && (
          <div className={styles.buttonWrapper}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${styles.expandButton} ${styles.expand}`}
            >
              show more
            </button>
          </div>
        )}
        
        {isExpanded && renderSkillSection(secondarySkills, 'familiar with / experimenting with')}
        
        {isExpanded && (
          <div className={`${styles.buttonWrapper} ${styles.expanded}`}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${styles.expandButton} ${styles.collapse}`}
            >
              show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillShowcase;