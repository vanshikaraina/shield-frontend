import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import '../styles/form.css';  // Using the same CSS file as Login

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isAnonymous) {
      // If anonymous, redirect without sending signup data
      navigate('/safety-feedback');
    } else {
      // Validate that the passwords match
      if (password === confirmPassword && username && email) {
        // Perform signup logic here (front-end validation for simplicity)
        navigate('/safety-feedback');
      } else {
        alert('Please fill in all fields and ensure the passwords match.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isAnonymous && (
          <>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group1">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            Stay Anonymous
          </label>
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
