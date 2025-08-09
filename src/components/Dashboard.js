import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editFeedback, setEditFeedback] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    } else {
      fetchFeedbacks();
    }
  }, [navigate]);

  const fetchFeedbacks = async () => {
    const res = await axios.get('http://localhost:3001/feedbacks');
    setFeedbacks(res.data);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Student Feedback Dashboard</h2>
      <FeedbackForm fetchFeedbacks={fetchFeedbacks} editFeedback={editFeedback} setEditFeedback={setEditFeedback} />
      <FeedbackList feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} setEditFeedback={setEditFeedback} />
    </div>
  );
}

export default Dashboard;
