import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackForm({ fetchFeedbacks, editFeedback, setEditFeedback }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [faculty, setFaculty] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (editFeedback) {
      setName(editFeedback.name);
      setDepartment(editFeedback.department);
      setCourse(editFeedback.course);
      setFaculty(editFeedback.faculty);
      setFeedback(editFeedback.feedback);
    }
  }, [editFeedback]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!name.trim() || !department.trim() || !course.trim() || !faculty.trim() || !feedback.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      name: name.trim(),
      department: department.trim(),
      course: course.trim(),
      faculty: faculty.trim(),
      feedback: feedback.trim(),
      userId: user.id,
      userEmail: user.email
    };

    if (editFeedback) {
      await axios.put(`http://localhost:3001/feedbacks/${editFeedback.id}`, payload);
      setEditFeedback(null);
    } else {
      await axios.post('http://localhost:3001/feedbacks', payload);
    }

    setName('');
    setDepartment('');
    setCourse('');
    setFaculty('');
    setFeedback('');
    fetchFeedbacks();
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <input placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} style={inputStyle} />
      <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} style={inputStyle} />
      <input placeholder="Faculty Name" value={faculty} onChange={e => setFaculty(e.target.value)} style={inputStyle} />
      <textarea placeholder="Feedback" value={feedback} onChange={e => setFeedback(e.target.value)} style={inputStyle} />
      <button onClick={handleSubmit} style={buttonStyle}>{editFeedback ? 'Update Feedback' : 'Submit Feedback'}</button>
      {editFeedback && (
        <button onClick={() => {
          setEditFeedback(null);
          setName('');
          setDepartment('');
          setCourse('');
          setFaculty('');
          setFeedback('');
        }} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Cancel Edit</button>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px'
};

export default FeedbackForm;
