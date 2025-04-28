import React, { useState } from 'react';
import '../styles/safetyFeedback.css';

const SafetyFeedback = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [issueType, setIssueType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const feedbackData = {
      isAnonymous,
      location,
      rating,
      timeOfDay,
      issueType,
      message,
    };
  
    fetch('http://localhost:5000/api/feedback/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Feedback submitted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting feedback');
      });
  };
  

  return (
    <div className="safety-feedback">
      <h1>Safety Feedback System</h1>
      <p>Help improve safety by sharing your experience. You can submit anonymously if preferred.</p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="toggle-anonymous">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            Submit Anonymously
          </label>
        </div>

        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter area or street name"
            required
          />
        </label>

        <label>
          Type of Issue:
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
            <option value="">Select</option>
            <option value="unsafe-at-night">Feeling Unsafe at Night</option>
            <option value="harassment">Street Harassment</option>
            <option value="high-theft">High Theft/Crime Area</option>
            <option value="low-police">Lack of Police Presence</option>
          </select>
        </label>

        <label>
          Safety Rating (1 = Unsafe, 5 = Very Safe):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>

        <label>
          Time of Day:
          <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} required>
            <option value="">Select Time Slot</option>
            <option value="morning">Morning (6:00 AM – 12:00 PM)</option>
            <option value="afternoon">Afternoon (12:00 PM – 5:00 PM)</option>
            <option value="evening">Evening (5:00 PM – 9:00 PM)</option>
            <option value="night">Night (9:00 PM – 12:00 AM)</option>
            <option value="late-night">Late Night (12:00 AM – 6:00 AM)</option>
          </select>
        </label>


        <label>
          Additional Comments:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what happened..."
          />
        </label>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default SafetyFeedback;
