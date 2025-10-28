import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import MeteorShower from '../components/MeteorShower';
import styles from '../styles/Projects.module.css';
import Footer from '../components/footer';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filterTag, setFilterTag] = useState('all');

  const projects = [
    {
      id: 1,
      title: "AI-Powered Portfolio",
      description: "This very portfolio! Features meteor shower animations, AI chat widget, typing effects, and advanced React patterns",
      imageUrl: "/portfolio-preview.png",
      href: "/",
      tags: ['React', 'GenAI', 'Animation'],
      techStack: ['Next.js', 'React Hooks', 'CSS Modules'],
      features: ['AI Chat Bot', 'Meteor Animation', 'Parallax Effects']
    },
    {
      id: 2,
      title: "Coming Soon: ML Project",
      description: "An exciting machine learning project in development using Python and TensorFlow",
      imageUrl: "/ml-preview.png",
      href: "#",
      tags: ['Python', 'ML', 'Data Science'],
      techStack: ['Python', 'TensorFlow', 'Pandas'],
      features: ['Data Analysis', 'Model Training', 'Visualization'],
      isComingSoon: true
    }
  ];

  const allTags = ['all', ...new Set(projects.flatMap(project => project.tags))];

  const filteredProjects = filterTag === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filterTag));

  return (
    <div className={styles.container}>
      <Head>
        <title>Projects - My My Nguyen</title>
        <meta name="description" content="Explore My My's creative projects featuring React, GenAI, and interactive web experiences" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <MeteorShower />

      <Navbar />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Projects</h1>
          <p className={styles.subtitle}>
            Explore my journey through code, creativity, and innovation
          </p>
        </div>

        {/* Filter Tags */}
        <div className={styles.filterContainer}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`${styles.filterTag} ${filterTag === tag ? styles.activeTag : ''}`}
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
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
                {hoveredProject === project.id && !project.isComingSoon && (
                  <div className={styles.projectOverlay}>
                    <Link href={project.href} className={styles.viewProject}>
                      View Project →
                    </Link>
                  </div>
                )}
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

                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.callToAction}>
          <h3>Interested in collaborating?</h3>
          <p>I'm always excited to work on new projects and explore innovative technologies!</p>
          <Link 
            href="https://drive.google.com/file/d/1IXGCybrKieyE_87XDYU2g6eMZ4bONmlV/view?usp=drive_link"
            className={styles.ctaButton}
            target="_blank"
          >
            Let's Connect! 🚀
          </Link>
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
