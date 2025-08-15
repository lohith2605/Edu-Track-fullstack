import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onToggleTheme, theme, onLogout }) => {
  return (
    <header className="et-header">
      <div className="et-header-inner">
        <Link to="/" className="et-logo">EduTrack</Link>
        <nav className="et-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/reports">Reports</Link>
        </nav>
        <div className="et-actions">
          <button className="btn ghost" onClick={onToggleTheme} title="Toggle theme">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          {user ? (
            <div className="et-user">
              <div className="et-avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                <div className="et-username">{user.name || user.email}</div>
                <div style={{fontSize:12, marginTop:4}}>
                  <button className="btn ghost" onClick={onLogout}>Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="et-login-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
