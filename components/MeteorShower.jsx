import { useEffect, useState } from 'react';
import styles from '../styles/MeteorShower.module.css';

const MeteorShower = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          symbol: ['★', '✦', '✧', '⭐'][Math.floor(Math.random() * 4)]
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className={styles.meteorShower}>
      {/* Meteors */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className={styles.meteor}></div>
      ))}
      
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        >
          {star.symbol}
        </div>
      ))}
    </div>
  );
};

export default MeteorShower;