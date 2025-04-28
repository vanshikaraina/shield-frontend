import React from 'react';
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-content">
        <h1>SafeStreet</h1>
        <p>Report problems. Share feedback. Access safety resources. Make your streets safer.</p>
        <div className="header-buttons">
          <button onClick={() => navigate('/report-issue')}>Report an Issue</button>
          <button onClick={() => navigate('/safety-feedback')}>Give Feedback</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
