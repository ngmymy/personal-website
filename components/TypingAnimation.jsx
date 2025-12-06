import { useState, useEffect } from 'react';

const TypingAnimation = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  const texts = [
    'New Grad Software Engineer',
    'Tech Enthusiast',
    'Problem Solver',
    'Keyboard Nerd'
  ];

  useEffect(() => {
    const handleType = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTypeSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typeSpeed]);

  return (
    <div style={{
      fontSize: '1.5rem',
      fontWeight: '400',
      color: '#dededeff',
      textAlign: 'center',
      minHeight: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Open Sans, sans-serif'
    }}>
      {currentText}
      <span style={{
        borderRight: '2px solid #667eea',
        animation: 'blink 1s infinite',
        marginLeft: '2px'
      }}>
        |
      </span>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypingAnimation;