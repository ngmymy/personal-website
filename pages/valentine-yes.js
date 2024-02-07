import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function ValentinesWebsite() {
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
            <p className={styles.valentineFont}> yayyyyy!! :3 </p>
            <img src="/valentine/catrose.jpg" alt="ily pookie <3" className={styles.catrose}/>
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