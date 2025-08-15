import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Faculty Dashboard</h2>
      <p>Manage your assigned courses and grading.</p>
      <button style={styles.button} onClick={() => navigate('/courses')}>My Courses</button>
      <button style={styles.button} onClick={() => navigate('/reports')}>Reports</button>
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
    backgroundColor: '#17a2b8',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FacultyDashboard;
