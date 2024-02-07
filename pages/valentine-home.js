import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function ValentinesHome() {
    const [emote, setEmote] = useState({ show: false, type: '' });

    // function to hide the emote image after a delay
    const hideEmote = () => {
      setTimeout(() => {
        setEmote({ show: false, type: '' });
      }, 2000); // hides emote after 2 seconds, adjust the timing as needed
    };
    
    // function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // You can add any logic here before redirecting
        window.location.href = "/valentine-yes"; // Redirect to the desired URL
    };
    
    useEffect(() => {
      window.jumpy = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const newX = Math.random() * (viewportWidth - 100);
        const newY = Math.random() * (viewportHeight - 100);
  
        const element = document.getElementById('noButt');
        if (element) {
          element.style.position = 'absolute';
          element.style.left = `${newX}px`;
          element.style.top = `${newY}px`;
        }
  
        // show the "no.JPG" emote image
        setEmote({ show: true, type: 'no' });
        hideEmote();
      };
  
      // function to show the "peepokiss.webp" emote
      window.showYesEmote = () => {
        setEmote({ show: true, type: 'yes' });
        hideEmote();
      };
    }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>mtnguyen.dev</title>
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <main>
        <div className={styles.bg}>
        </div>
        <div className={styles.buttonOverlay}>
            <div className={styles.navbar}>
                <h2><Link className={styles.link} href="/">My My Nguyen</Link></h2>
                <ul>
                    <li><Link className={styles.link} href="/projects">Projects</Link></li>
                    <li><Link className={styles.link} href="/references">References</Link></li>
                    <li><Link className={styles.link} href="https://drive.google.com/file/d/1Fpui9B5esdEsdEt8bVm1u2akkAkMM9_9/view?usp=drive_link">Resume</Link></li>
                </ul>
            </div>
            <img src="/valentine/pookie.jpg" alt="pookie snookie" className="home-img" width={680} height={480}/>
            <form onSubmit={handleSubmit}>
                <div>
                    <button id="yesButt" type="submit" onMouseOver={() => window.showYesEmote()} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                        <img src="/valentine/yes.gif" alt="yes" style={{width: 80, height: 80}} />
                    </button>
                    <a href="/no" id="noButt" onMouseOver={() => window.jumpy()} style={{cursor: 'pointer'}}>
                        <img src="/valentine/no.gif" alt="no" style={{width: 80, height: 80}} />
                    </a>
                </div>
            </form>
            {emote.show && (
                <img src={emote.type === 'no' ? "/valentine/no.JPG" : "/valentine/peepokiss.webp"} alt={emote.type} style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    width: '66px', // size
                    height: 'auto',
                    zIndex: 1000,
                    display: emote.show ? 'block' : 'none',
                }} />
            )}
        </div>
      </main>
      {/* <footer>
        <a href="https://github.com/ngmymy" target="_blank" rel="noopener noreferrer">
          last updated on 2/5/2024
        </a>
      </footer> */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@700&family=Open+Sans:wght@300&display=swap');
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: auto;
        }
        footer {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: rgb(185, 185, 185);
          font-size: small;
        }
      `}</style>
    </div>
  );
}