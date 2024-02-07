import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Valentine's Day Website",
      description: "A fun little creation for my friends <3",
      imageUrl: "/valentine/cupid.avif",
      href: "/valentines-website"
    },
    // {
    //   id: 2,
    //   title: "Project 2",
    //   description: "This is a brief description of Project 2.",
    //   imageUrl: "/path/to/your/image2.png",
    //   href: ''
    // },
    // Add more projects as needed
  ];
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
            {/* <button className={styles.btn}>Dark Mode</button> */}
        </div>
        <ul className={styles.projectList}>
            {projects.map(project => (
                <a href={project.href} className={styles.projectItem}>
                    <li key={project.id}>
                    <div className={styles.projectContent}>
                        <img src={project.imageUrl} className={styles.projectImage} alt={project.title} />
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectDescription}>{project.description}</p>
                    </div>
                    </li>
                </a>
            ))}
        </ul>
      </main>
      <footer>
        <a href="https://github.com/ngmymy" target="_blank" rel="noopener noreferrer">
          last updated on 2/5/2024
        </a>
      </footer>
      <style jsx>{`
        * {
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
