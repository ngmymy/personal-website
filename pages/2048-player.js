import { useEffect } from 'react';
import Head from 'next/head';

export default function TwentyFortyEightPlayer() {
  useEffect(() => {
    // Redirect to GitHub repository
    window.location.href = 'https://github.com/lulubugqu/2048-player';
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: '#283245ff',
      color: 'white'
    }}>
      <Head>
        <title>Redirecting to 2048 Player Repo...</title>
        <meta httpEquiv="refresh" content="0;url=https://github.com/lulubugqu/2048-player" />
      </Head>
      
      <h1>Redirecting to 2048 Player Repository...</h1>
      <p>If you are not redirected automatically, <a 
        href="https://github.com/lulubugqu/2048-player"
        style={{ color: 'white', textDecoration: 'underline' }}
      >
        click here
      </a>.</p>
    </div>
  );
}