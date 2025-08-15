import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });

      // Extract from backend
      const { token, role, user } = res.data;

      // ✅ Store in localStorage for Reports.js & Courses.js
      localStorage.setItem('et_token', token);
      localStorage.setItem(
        'et_user',
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: role
        })
      );

      // Optional: if you still want to pass to parent component
      if (onLogin) onLogin({ token, user });

      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed — check credentials.');
      toast.error('Login failed: ' + (err?.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="et-card" style={{ maxWidth: 420, margin: '20px auto' }}>
      <h2>Welcome back</h2>
      <p className="muted">Sign in to access your EduTrack dashboard</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@college.edu"
            required
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <button className="btn" type="submit">Sign in</button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              setEmail('demo@edu.com');
              setPassword('demo123');
              toast.info('Demo credentials filled');
            }}
          >
            Use demo
          </button>
        </div>
        {error && <div style={{ marginTop: 12, color: '#ffbaba' }}>{error}</div>}
      </form>

      <p className="muted" style={{ marginTop: '12px' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
