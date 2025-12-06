import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import MeteorShower from '../components/MeteorShower';
import Navbar from '../components/navbar';
import TypingAnimation from '../components/TypingAnimation';
import SkillShowcase from '../components/SkillShowcase';
import Footer from '../components/footer';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('aboutme');

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

  const sections = {
    aboutme: {
      title: "About Me",
      content: (
        <div className={styles.spaceY4}>
          <p className={`${styles.textGray200} ${styles.leadingRelaxed}`}>
            I'm from St. Paul, MN and I graduated from the University of Minnesota, TC in May 2025 with a B.A. in Computer Science. 
            The last two years of my undergraduate was very mentally draining as I navigated through some very difficult home obstacles alone while balancing schoolwork. 
            I decided to work a ton right after graduating and take a break after September 2025. During my break, I went to Paris for the first time, and focused on personal growth and finding my balance.
            Now that I'm back, my goal is to find a job that will help foster my career growth and allow me to create helpful tools for user experiences. 
          </p>
          <div className={`${styles.spaceY4} ${styles.mt4}`}>
            <div className={`${styles.cardGradient} ${styles.gradientPurpleBlue}`} style={{ padding: '1.25rem' }}>
              <h4 className={`${styles.textXl} ${styles.fontSemibold} ${styles.textWhite} ${styles.mb3}`}>Fun facts</h4>
              <ul className={`${styles.spaceY2} ${styles.textGray300}`}>
                <li className={`${styles.flex} ${styles.itemsStart} ${styles.gap2}`}>
                  <span className={`${styles.textPurple400}`} style={{ marginTop: '0.25rem' }}></span>
                  <span>• Born in Vietnam, moved to U.S. at 5 years old</span>
                </li>
                <li className={`${styles.flex} ${styles.itemsStart} ${styles.gap2}`}>
                  <span className={`${styles.textPurple400}`} style={{ marginTop: '0.25rem' }}></span>
                  <span>• Exposed to coding from my brother and video games at 12 years old.</span>
                </li>
                <li className={`${styles.flex} ${styles.itemsStart} ${styles.gap2}`}>
                  <span className={`${styles.textPurple400}`} style={{ marginTop: '0.25rem' }}></span>
                  <span>• I love contributing to community projects by building tools to integrate a modernized system for event registrations at my local Vietnamese Catholic Church. </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    journey: {
      title: "Education",
      content: (
        <div className={styles.spaceY4}>
          <p className={`${styles.textGray200} ${styles.leadingRelaxed}`}>
            <b>Coursework:</b> Algorithms & Data Structures, Program Design and Development, Artificial Intelligence, Machine Architecture, Operating Systems, and UI/UX Design. 
          </p>
          <div className={`${styles.mt6} ${styles.grid} ${styles.gridCols2} ${styles.gap4}`}>
            <div className={styles.card}>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textPurple300} ${styles.mb2}`}>Education </h4>
              <p className={`${styles.textGray300} ${styles.textSm} ${styles.fontSemibold}`}>B.A. Computer Science</p>
              <p className={`${styles.textGray300} ${styles.textXs} ${styles.fontSemibold}`}>University of Minnesota, Twin Cities</p>
              <p className={`${styles.textGray300} ${styles.textXs} ${styles.fontSemibold}`}>Graduated May 2025</p>
            </div>
            <div className={styles.card}>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textPurple300} ${styles.mb2}`}>Focus Areas</h4>
              <p className={`${styles.textGray300} ${styles.textSm} ${styles.fontSemibold}`}>- Full-Stack Development</p>
              <p className={`${styles.textGray300} ${styles.textSm} ${styles.fontSemibold}`}>- AI Integration</p>
              <p className={`${styles.textGray300} ${styles.textSm} ${styles.fontSemibold}`}>- UX/UI Design</p>
            </div>
          </div>
        </div>
      )
    },
    experience: {
      title: "Work Experience",
      content: (
        <div className={styles.spaceY4}>
          <p className={`${styles.textGray200} ${styles.leadingRelaxed}`}>
            I worked as a Software Engineering Intern at <b>KEB America, Inc</b> from Summer 2024 to Summer 2025. 
          </p>
          <p className={`${styles.textGray200} ${styles.leadingRelaxed}`}>
            Some of my contributions include:
          </p>
          <div className={`${styles.spaceY3} ${styles.mt4}`}>
            {[
              { icon: <img src="/star.png" alt="icon" style={{ width: '1.4rem', height: '1.4rem', objectFit: 'contain' }} />, title: "Wrote Unit Tests", desc: "Worked with the automated test systems team to develop a suite of brake control tests using C#." },
              { icon: <img src="/star.png" alt="icon" style={{ width: '1.4rem', height: '1.4rem', objectFit: 'contain' }} />, title: "Built Internal Web Apps", desc: "An app that helped employees manage active test bench statuses using Blazor and CSS to avoid overriding conflicts." },
              { icon: <img src="/star.png" alt="icon" style={{ width: '1.4rem', height: '1.4rem', objectFit: 'contain' }} />, title: "Refactored Codebase", desc: "Refactored repetitive code into functions for easier future modifications within the automated test system." },
              { icon: <img src="/star.png" alt="icon" style={{ width: '1.4rem', height: '1.4rem', objectFit: 'contain' }} />, title: "Production Level Firmware", desc: "Collaborated with senior engineers to write firmware code for new features and parameters based off specifications." },
             ].map((value, index) => (
               <div key={index} className={styles.valueCard}>
                 <div className={styles.valueCardContent}>
                   <div className={styles.valueIcon}>{value.icon}</div>
                   <div>
                     <h4 className={styles.valueTitle}>{value.title}</h4>
                     <p className={styles.valueDesc}>{value.desc}</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )
    },
    interests: {
      title: "Interests & Hobbies",
      content: (
        <div className={styles.spaceY4}>
          <p className={`${styles.textGray200} ${styles.leadingRelaxed}`}>
            Beyond coding, I'm passionate about exploring the intersection of technology and creativity. 
            Here's what keeps me inspired:
          </p>
          <div className={`${styles.grid} ${styles.gridCols1} ${styles.mdGridCols2} ${styles.gap4} ${styles.mt4}`}>
            <div className={`${styles.cardGradient} ${styles.gradientPurplePink}`}>
              <div className={styles.text3xl} style={{ marginBottom: '0.5rem'}}>
                <img src="/keyboard.png" alt="Keyboard" style={{ height: '2rem', objectFit: 'contain' }} />
              </div>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textWhite} ${styles.mb2}`}>Custom Keyboards</h4>
              <p className={`${styles.textWhite} ${styles.textSm}`}>
                A pandemic hobby that has stuck with me is custom keyboard builds, switches, modifications, sound signatures, and the perfect typing experience. I've built 4 custom boards for myself and others, and I'm always looking for an excuse to build more or nerd out.
              </p>
            </div>
            <div className={`${styles.cardGradient} ${styles.gradientBlueCyan}`}>
              <div className={styles.text3xl}>
                <img src="/travel.png" alt="Travel" style={{ width: '2.6rem', height: '2.6rem', objectFit: 'contain' }} />
              </div>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textWhite} ${styles.mb2}`}>Travel</h4>
              <p className={`${styles.textWhite} ${styles.textSm}`}>
                I love exploring new places and cultures whether thats solo or with company! This october I went to Paris for the first time and it was amazing getting to finally see the famous landmarks and experience French culture.
              </p>
            </div>
            <div className={`${styles.cardGradient} ${styles.gradientGreenEmerald}`}>
              <div className={styles.text3xl}>
                <img src="/fishing.png" alt="Fishing" style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
              </div>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textWhite} ${styles.mb2}`}>Fishing</h4>
              <p className={`${styles.textWhite} ${styles.textSm}`}>
                Fishing is one of my favorite ways to relax and connect with nature! I usually go up to the boundary waters every summer to fish and camp.
              </p>
            </div>
            <div className={`${styles.cardGradient} ${styles.gradientOrangeRed}`}>
              <div className={styles.text3xl}>
                <img src="/computer.png" alt="Computer" style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
              </div>
              <h4 className={`${styles.textLg} ${styles.fontSemibold} ${styles.textWhite} ${styles.mb2}`}>Gaming & Tech</h4>
              <p className={`${styles.textWhite} ${styles.textSm}`}>
                I've been playing PC games since I was 12 y/o, I mainly play FPS games like Valorant and Counter Strike. Besides gaming, I love learning about the latest tech innovations and hoping one day I can be a part of a cool project.
              </p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My My Nguyen - Portfolio</title>
        <meta name="description" content="Computer Science student at UMN, passionate about React, GenAI, and creative web development" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <MeteorShower />

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
              <h3>Hi! I'm My My 👋</h3>
              <p>Welcome to my personal portfolio!</p>
            </div>
          </div>

          {/* About Me Section Navigation */}
          <div className={styles.aboutMeSection}>
            <div className={styles.sectionNav}>
              <div className={styles.sectionButtons}>
                {Object.keys(sections).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`${styles.sectionButton} ${activeSection === key ? styles.active : ''}`}
                  >
                    {sections[key].title}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.contentSection}>
              <div className={styles.contentCard}>
                <h3 className={styles.contentTitle}>
                  {sections[activeSection].title}
                </h3>
                {sections[activeSection].content}
              </div>
            </div>

            <SkillShowcase />
            {/* Fun Facts */}
            {/* <div className={styles.funFacts}>
              <div className={styles.funFactsCard}>
                <h3 className={styles.funFactsTitle}>⚡ Fun Facts</h3>
                <div className={styles.funFactsGrid}>
                  <div className={styles.funFact}>
                    <span className={styles.funFactIcon}>☕</span>
                    <span>Coffee enthusiast - code runs on caffeine!</span>
                  </div>
                  <div className={styles.funFact}>
                    <span className={styles.funFactIcon}>🎵</span>
                    <span>Love coding with music in the background</span>
                  </div>
                  <div className={styles.funFact}>
                    <span className={styles.funFactIcon}>🌙</span>
                    <span>Night owl - best code happens after midnight</span>
                  </div>
                  <div className={styles.funFact}>
                    <span className={styles.funFactIcon}>📚</span>
                    <span>Always reading tech blogs and documentation</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <Footer />
      </main>

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
        
        html {
          scroll-behavior: smooth;
        }
        
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