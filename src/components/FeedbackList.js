import React from 'react';
import axios from 'axios';

function FeedbackList({ feedbacks, fetchFeedbacks, setEditFeedback }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/feedbacks/${id}`);
    fetchFeedbacks();
  };

  return (
    <div style={styles.container}>
      <h3>Submitted Feedback</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.left}>Name</th>
            <th style={styles.left}>Department</th>
            <th style={styles.left}>Course</th>
            <th style={styles.left}>Faculty</th>
            <th style={styles.left}>Feedback</th>
            <th style={styles.left}>Submitted By</th>
            <th style={styles.center}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f.id} style={styles.row}>
              <td style={styles.left}>{f.name}</td>
              <td style={styles.left}>{f.department}</td>
              <td style={styles.left}>{f.course}</td>
              <td style={styles.left}>{f.faculty}</td>
              <td style={styles.left}>{f.feedback}</td>
              <td style={styles.left}>{f.userEmail}</td>
              <td style={styles.center}>
                {f.userId === user.id && (
                  <>
                    <button style={styles.editButton} onClick={() => setEditFeedback(f)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(f.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '30px',
    fontFamily: 'Arial, sans-serif'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  row: {
    transition: 'background 0.3s ease',
    cursor: 'default'
  },
  left: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'top'
  },
  center: {
    textAlign: 'center',
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  editButton: {
    padding: '6px 10px',
    marginRight: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default FeedbackList;
