import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>mtnguyen.dev</title>
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <main>
        <div className={styles.navbar}>
          <h2><Link className={styles.link} href="/">My My Nguyen</Link></h2>
          <ul>
            <li><Link className={styles.link} href="/projects">Projects</Link></li>
            <li><Link className={styles.link} href="/references">References</Link></li>
            <li><Link className={styles.link} href="https://drive.google.com/file/d/1Fpui9B5esdEsdEt8bVm1u2akkAkMM9_9/view?usp=drive_link">Resume</Link></li>
          </ul>
        </div>
        <a href="https://git.io/typing-svg" className={styles.typer}>
          <img src="https://readme-typing-svg.demolab.com?font=Open-sans&weight=300&pause=1000&color=2470F7&center=true&random=false&width=450&lines=%F0%9F%92%BB+Computer+Science+%40+UMN+%F0%9F%92%BB;%F0%9F%8E%93+Expected+Graduation+'25+%F0%9F%8E%93" alt="Typing SVG" /></a>
        <div className={styles.about}>
          <img src='image.png'></img>
          <div className={styles.text}>
            <h3>Hi There! 👋 </h3>
            <p>Welcome to my page!</p> <br></br>
            <p>This is a fun little place where I can showcase my projects and interests!</p>
          </div>
        </div>
        {/* <div className={styles.about}>
          <p>A little about me!</p>
        </div> */}
      <p className={styles.dev}>Projects and References page still under development. Stay Tuned!</p>
      </main>
      <footer>
        <a href="https://github.com/ngmymy" target="_blank" rel="noopener noreferrer">
          last updated on 11/24/2023
        </a>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: auto;
        }
        footer {
          width: 100%;
          height: 100px;
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
