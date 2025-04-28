import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import '../styles/form.css';  // Using the same CSS file as Signup

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isAnonymous) {
      // If anonymous, redirect without sending login data
      navigate('/safety-feedback');
    } else {
      // Perform login logic here (front-end validation for simplicity)
      if (email && password) {
        // Redirect to the safety feedback page after successful login
        navigate('/safety-feedback');
      } else {
        alert('Please fill in both fields.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isAnonymous && (
          <>
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
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
