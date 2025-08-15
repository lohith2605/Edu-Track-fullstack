// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🎓 EduTrack</div>
      <div style={styles.links}>
        <Link to="/dashboard" style={isActive('/dashboard') ? styles.activeLink : styles.link}>Dashboard</Link>
        <Link to="/courses" style={isActive('/courses') ? styles.activeLink : styles.link}>Courses</Link>
        <Link to="/reports" style={isActive('/reports') ? styles.activeLink : styles.link}>Reports</Link>
        <span onClick={logout} style={{ ...styles.link, cursor: 'pointer' }}>Logout</span>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#007bff',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  activeLink: {
    color: '#ffd700',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default Navbar;
