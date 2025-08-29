import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h2>
        <Link href="/">
          My My Nguyen
        </Link>
      </h2>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/references" className={styles.navLink}>
            References
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            href="https://drive.google.com/file/d/1IXGCybrKieyE_87XDYU2g6eMZ4bONmlV/view?usp=drive_link" 
            className={`${styles.navLink} ${styles.resumeLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;