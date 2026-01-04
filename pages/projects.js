import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/navbar';
import Snowfall from 'react-snowfall';
import styles from '../styles/Projects.module.css';
import Footer from '../components/footer';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "AI 2048 Autoplayer",
      description: "An intelligent agent that masters the 2048 game using advanced AI algorithms including MiniMax, Alpha-Beta pruning, and Monte Carlo Tree Search",
      imageUrl: "/2048-autoplayer.png",
      href: "/",
      tags: ['Python', 'AI', 'Game Theory'],
      techStack: ['Python', 'Pygame', 'MCTS Algorithm'],
      features: ['Different AI Algorithms', 'Automated Gameplay', 'Performance Metrics']
    },
    {
      id: 2,
      title: "Gopher Delivery Service",
      description: "An extensible drone simulation system built with design patterns and agile development. Features battery management, weather systems, and frozen food delivery with comprehensive testing and Docker deployment",
      imageUrl: "/gopherdelivery.jpg",
      href: "/gopher-delivery",
      tags: ['C++', 'Software Engineering', 'Agile'],
      techStack: ['C++', 'Docker', 'Doxygen'],
      features: ['Design Patterns', 'Battery & Weather Systems', 'Unit & Integration Testing']
    },
    {
      id: 3,
      title: "Pickleball Matchmaker",
      description: "An app that connects pickleball enthusiasts based on skill level, location, and availability. Designed and tested through user research and prototyping.",
      imageUrl: "/pickleball-app.png",
      href: "/gopher-delivery",
      tags: ['UX/UI', 'Collaborative', 'Research Methods', 'Mobile App'],
      techStack: ['Figma', 'Docker', 'Doxygen'],
      features: ['Court Availability', 'Skill-based and Local Matchmaking', 'Match Scheduling & Notifications']
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Projects - My My Nguyen</title>
        <meta name="description" content="Explore My My's creative projects featuring React, GenAI, and interactive web experiences" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <Snowfall />

      <Navbar />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Projects</h1>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${project.isComingSoon ? styles.comingSoon : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {project.isComingSoon && (
                <div className={styles.comingSoonBadge}>Coming Soon</div>
              )}
              
              <div className={styles.projectImageContainer}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className={styles.projectImage}
                />
                {/* {hoveredProject === project.id && !project.isComingSoon && (
                  <div className={styles.projectOverlay}>
                    <Link href={project.href} className={styles.viewProject}>
                      View Project →
                    </Link>
                  </div>
                )} */}
              </div>
              
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.techStack}>
                  <h4>Tech Stack:</h4>
                  <div className={styles.techTags}>
                    {project.techStack.map(tech => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.features}>
                  <h4>Key Features:</h4>
                  <ul className={styles.featureList}>
                    {project.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <h4 className={styles.labels}>Skill set:</h4>
                <div className={styles.projectTags}>
                  
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden;
        }
        
        body {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }
      `}</style>
    </div>
  );
}
