import React from 'react';

const Error404 = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      color: '#041F96',
    },
    heading: {
      fontSize: '10vw',
      margin: '0',
    },
    message: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#041F96',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <button style={styles.button}>
        <a href="/" style={styles.link}>Go Back Home</a>
      </button>
    </div>
  );
};

export default Error404;
