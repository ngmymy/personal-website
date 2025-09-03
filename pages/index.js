import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import MeteorShower from '../components/MeteorShower';
import Navbar from '../components/navbar';
import TypingAnimation from '../components/TypingAnimation';
import SkillShowcase from '../components/SkillShowcase';
import AIChatWidget from '../components/AIChatWidget';
import Footer from '../components/footer';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My My Nguyen - Portfolio</title>
        <meta name="description" content="Computer Science student at UMN, passionate about React, GenAI, and creative web development" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      {/* Meteor Shower Background */}
      <MeteorShower />

      {/* Floating Elements */}
      <div className={styles.floatingElement} style={parallaxStyle}>💻</div>
      <div className={styles.floatingElement} style={parallaxStyle}>🚀</div>
      <div className={styles.floatingElement} style={parallaxStyle}>⭐</div>

      <main className={styles.main}>
        <Navbar />
        
        <div className={styles.content}>
          <div className={styles.heroSection}>
            <div className={styles.typer}>
              <TypingAnimation />
            </div>
          </div>

          <div className={styles.about}>
            <img 
              src='main.jpg' 
              alt="My My Nguyen" 
              style={parallaxStyle}
            />
            <div className={styles.text}>
              <h3>Hi There! 👋</h3>
              <p>Welcome to my interactive portfolio!</p>
              <p>
                I'm a Computer Science student at UMN with a passion for creating 
                engaging web experiences using React, and useful apps for daily life style.
              </p>
              <p>
                This portfolio showcases my journey in full-stack development, 
                featuring everything from interactive animations to AI-powered chat widgets!
              </p>
              <p>I still have a few projects to add so stay tuned!</p>
            </div>
          </div>

          <SkillShowcase />

          {/* <div className={styles.dev}>
            
          </div> */}
        </div>
        <Footer />
      </main>

      <AIChatWidget />

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
