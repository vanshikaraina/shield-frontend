// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import '../styles/navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <NavLink to="/">SHIELD</NavLink>
//       </div>
//       <ul className="nav-links">
//         <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
//         <li><NavLink to="/report-issue" activeClassName="active">Issue Reporting</NavLink></li>
//         <li><NavLink to="/safety-feedback" activeClassName="active">Feedback</NavLink></li>
//         <li><NavLink to="/emergency-resources" activeClassName="active">Emergency Resources</NavLink></li>
//         <li><NavLink to="/sensitive-issues" activeClassName="active">Report Sensitive Issue</NavLink></li>
//         <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
//         <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left logo">
        <NavLink to="/">SHIELD</NavLink>
      </div>

      <ul className="nav-center">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/report-issue" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Issue Reporting
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/safety-feedback" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Feedback
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/emergency-resources" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Emergency Resources
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/sensitive-issues" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Report Sensitive Issue
          </NavLink>
        </li>
      </ul>

      <ul className="nav-right">
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/signup" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
