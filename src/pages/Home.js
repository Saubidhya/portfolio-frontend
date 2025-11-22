import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero">
      <h1>Saubidhya Pandit</h1>
      <p>
        Full Stack Developer | React Enthusiast | Creative Thinker
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/projects">
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            See My Work
          </button>
        </Link>
        {/* FIXED THE LINK BELOW: /contacts instead of /contact */}
        <Link to="/contacts">
          <button style={{ 
            fontSize: '1.1rem', 
            padding: '15px 30px', 
            background: 'white', 
            color: '#333', 
            border: '2px solid #ddd' 
          }}>
            Get in Touch
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;