import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default student
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request
      const res = await api.post('/auth/register', { name, email, password, role });

      // ✅ Since your current backend register doesn't log the user in or return token/user,
      // you should either update backend to also log in after register OR do it here manually.
      // For now, let's assume backend returns token & user (modify backend if needed):
      const { token, role: userRole, user } = res.data;

      // Store in localStorage for Reports & Courses
      localStorage.setItem('et_token', token);
      localStorage.setItem(
        'et_user',
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: userRole
        })
      );

      if (onRegister) onRegister({ token, user });

      toast.success('Registered successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed.');
      toast.error('Registration failed: ' + (err?.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="et-card" style={{ maxWidth: 420, margin: '20px auto' }}>
      <h2>Create an account</h2>
      <p className="muted">Register to start using EduTrack</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="you@college.edu"
            required
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Choose a secure password"
            required
          />
        </div>
        <div className="form-row">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="student">Student</option>
  <option value="faculty">Faculty</option> {/* change Faculty to faculty */}
  <option value="admin">Admin</option>
</select>


        </div>
        <div style={{ display:'flex', gap:10, marginTop:6 }}>
          <button className="btn" type="submit">Register</button>
        </div>
        {error && <div style={{ marginTop:12, color:'#ffbaba' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Register;
