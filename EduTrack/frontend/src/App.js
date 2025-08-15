import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Reports from './components/Reports';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';
import Layout from './components/Layout';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './api';
import './App.css';

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('et_token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('et_theme') || 'dark');
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('et_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  });
  const [metrics, setMetrics] = useState(null);

  // Apply stored theme class on first load
  useEffect(() => {
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, []); 

  useEffect(() => {
    api.get('/metrics')
      .then(({ data }) => setMetrics(data))
      .catch(() => {});
  }, []);

  const onToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('et_theme', next);

    // Remove old class & add new one to body
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(next === 'dark' ? 'theme-dark' : 'theme-light');

    toast.info('Theme set to ' + next);
  };

  const handleLogin = ({ token, user }) => {
    localStorage.setItem('et_token', token);
    localStorage.setItem('et_user', JSON.stringify(user));
    setUser(user);
    toast.success('Logged in as ' + (user.name || user.email));
  };

  const handleLogout = () => {
    localStorage.removeItem('et_token');
    localStorage.removeItem('et_user');
    setUser(null);
    toast.info('Logged out');
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Router>
        <Layout user={user} onToggleTheme={onToggleTheme} theme={theme} onLogout={handleLogout}>
          <Routes>
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard metrics={metrics} /></PrivateRoute>} />
            <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />

            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/faculty" element={<PrivateRoute><FacultyDashboard /></PrivateRoute>} />
            <Route path="/student" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />

            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </Layout>
        <ToastContainer position="bottom-right" newestOnTop />
      </Router>
    </ThemeProvider>
  );
}

export default App;
