import styles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        © 2025 My My Nguyen •
        <a className={styles.footerLink}
        href="https://github.com/ngmymy" 
        target="_blank" 
        rel="noopener noreferrer"
        >
        Github
        </a>
        | 
        <a className={styles.footerLink}
        href="https://www.linkedin.com/in/mymyn/" 
        target="_blank" 
        rel="noopener noreferrer"
        >
        LinkedIn
        </a>
        | 
        <a className={styles.footerLink}
        href="mailto:mymy49447@gmail.com"
        target="_blank" 
        rel="noopener noreferrer"
        >
        Email
        </a>
    </footer>
  );
};

export default Footer;