// export default IssueReporting;
import React, { useState } from 'react';
import '../styles/issueReporting.css';

const IssueReporting = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/issues', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ title: '', description: '', location: '', image: null });
      } else {
        alert('Failed to submit issue: ' + result.message);
      }
    } catch (err) {
      alert('Error submitting issue: ' + err.message);
    }
  };

  return (
    <div className="issue-reporting-page">
      <div className="issue-reporting-form-container">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit} className="issue-form" encType="multipart/form-data">
          <label>Issue Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="E.g. Street Light Not Working"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Provide detailed description of the issue"
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="E.g. Main Street, Sector 21"
          />

          <label>Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default IssueReporting;