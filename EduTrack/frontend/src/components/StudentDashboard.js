import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Student Dashboard</h2>
      <p>View your enrolled courses and performance.</p>
      <button style={styles.button} onClick={() => navigate('/courses')}>My Courses</button>
    </div>
  );
};

const styles = {
  container: { padding: '30px', textAlign: 'center' },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
