import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IssueReporting from './pages/IssueReporting';
import SafetyFeedback from './pages/SafetyFeedback';
import EmergencyResources from './pages/EmergencyResources';
import SensitiveIssues from './pages/SensitiveIssues';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Helpline from './pages/Helpline';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report-issue" element={<IssueReporting />} />
        <Route path="/safety-feedback" element={<SafetyFeedback />} />
        <Route path="/emergency-resources" element={<EmergencyResources />} />
        <Route path="/sensitive-issues" element={<SensitiveIssues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Helpline />
      <Footer /> 
    </Router>
  );
};

export default App;
