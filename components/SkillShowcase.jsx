import { useState } from 'react';
import styles from '../styles/Home.module.css';

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
    { name: 'Raspberry Pi', icon: '/icons/raspberrypi-original.svg',isImage: true },
    { name: 'MongoDB', icon: '/icons/mongodb-original.svg', isImage: true },
    { name: 'Docker', icon: '/icons/docker-original.svg', isImage: true },
    { name: 'Blender', icon: '/icons/blender-original.svg', isImage: true },
  ];

  // skill showcase labels
  const renderSkillSection = (skills, title) => (
    <div style={{ marginBottom: '1rem' }}>
      <h4 style={{
        fontSize: '15px',
        marginBottom: '1rem',
        color: '#e1e5ebff',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: '0.5px',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
      }}>
        {title}
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
        gap: '1rem',
        justifyItems: 'center',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        {skills.map((skill, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hoveredSkill === skill 
                ? 'translateY(-12px) scale(1.15)' 
                : 'translateY(0) scale(1)',
              zIndex: hoveredSkill === skill ? 100 : 1,
              filter: hoveredSkill === skill 
                ? 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))' 
                : 'none'
            }}
          >
            <div style={{ 
              fontSize: '1.2rem', 
              height: '2.5rem', 
              width: '2.5rem',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {skill.isImage ? (
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  style={{ 
                    height: '3rem', 
                    width: 'auto',
                    filter: hoveredSkill === skill 
                      ? 'brightness(1.2) saturate(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' 
                      : 'brightness(0.95) saturate(1)',
                    transition: 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              ) : (
                <span style={{ 
                  fontSize: '2.2rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: hoveredSkill === skill 
                    ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' 
                    : 'none'
                }}>
                  {skill.icon}
                </span>
              )}
            </div>

            {hoveredSkill && hoveredSkill.name === skill.name && (
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(56, 56, 56, 0.73)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                animation: 'fadeInUp 0.2s ease-out',
                pointerEvents: 'none',
                minWidth: 'max-content',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
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
      <div style={{
        background: 'rgba(195, 195, 195, 0.3)',
        backdropFilter: 'blur(15px)',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        margin: '0 auto',
        width: '100%',
        maxWidth: '800px',
      }}>
      
        {/* Main stack section */}
        {renderSkillSection(
          isExpanded ? mainStackSkillsExpanded : mainStackSkillsInitial, 
          'main stack'
        )}
        
        {/* Expand/collapse button */}
        <div style={{ textAlign: 'center', marginBottom: isExpanded ? '2rem' : '0' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: isExpanded ? '#e392a8ff' : '#8dd196ff' ,
              border: `1px solid ${isExpanded ? '#df4349ff': '#2aa62eff'}`,
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              color: '#e5e4e4ff',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isExpanded ? 'show less' : 'show more'}
          </button>
        </div>
        
        {/* Secondary skills section - only shown when expanded */}
        {isExpanded && renderSkillSection(secondarySkills, 'familiar with / experimenting with')}

        <style jsx>{`
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateX(-50%) translateY(10px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(-50%) translateY(0); 
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default SkillShowcase;