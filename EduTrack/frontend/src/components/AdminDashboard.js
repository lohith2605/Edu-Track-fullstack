import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <p>Manage system-wide resources and users.</p>
      <button style={styles.button} onClick={() => navigate('/courses')}>Manage Courses</button>
      <button style={styles.button} onClick={() => navigate('/reports')}>View Reports</button>
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
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
