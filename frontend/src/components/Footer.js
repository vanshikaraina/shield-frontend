import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo/Brand Name */}
        <div className="footer-logo">
          <h2>SHIELD</h2>
        </div>

        {/* Middle Section - About & Contact Us */}
        <div className="footer-links">
          <div className="footer-about">
            <h4>About Us</h4>
            <p>
              At <span className="highlight">SHIELD</span>, we are dedicated to creating a safer and more secure environment for individuals and communities. Our mission is to empower citizens by providing a platform to report issues, share safety feedback, and access emergency resources with ease. Together, we are building a connected community that stands strong in the face of adversity.
            </p>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@shield.com</p>
            <p>Phone: +91 123 456 7890</p>
          </div>
        </div>

        {/* Right Section - Emergency Helplines */}
        <div className="footer-helplines">
          <h4>Helplines</h4>
          <ul>
            <li>Women's Helpline: 1091</li>
            <li>Children's Helpline: 1098</li>
            <li>Emergency Services: 112</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 SHIELD. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
