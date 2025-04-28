import React from 'react';
// import SensitiveIssues from './SensitiveIssues';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Main Hero Section */}
      <div className="hero">
        <h1>Welcome to S.H.I.E.L.D</h1>
        <h4>Secure Help & Information for Every Local District</h4>
        <p>Report issues and ensure the safety of your community.</p>
        <div className="home-buttons">
          <button>
            <a href="/report-issue">Report an Issue</a>
          </button>
          <button>
            <a href="/safety-feedback">Give Safety Feedback</a>
          </button>
        </div>
      </div>

      <div className="sensitiveIssues">
        <h2>For Sensitive Issues</h2>
        <p>Some issues may require extra privacy and confidentiality. You can report them here safely and securely.</p>
        <Link to="/sensitive-issues"><button>Submit Sensitive Issue</button></Link>
      </div>

    {/* <SensitiveIssues /> */}

    </div>
  );
};

export default Home;
