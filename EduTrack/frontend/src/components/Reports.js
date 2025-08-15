import React, { useEffect, useState } from 'react';
import api from '../api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [expandedReport, setExpandedReport] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Detect dark mode from localStorage or document
    const mode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(mode);

    const token = localStorage.getItem('et_token');
    let storedUser = {};
    try {
      storedUser = JSON.parse(localStorage.getItem('et_user')) || {};
    } catch {
      storedUser = {};
    }

    if (!token) {
      setError('You must be logged in to view reports.');
      return;
    }

    if (storedUser.role && !['admin', 'faculty'].includes(storedUser.role.toLowerCase())) {
      setError('You do not have permission to view reports.');
      return;
    }

    api
      .get('/reports', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setReports(res.data);
        } else {
          setReports(getDummyReports());
        }
      })
      .catch(() => {
        setReports(getDummyReports());
      });
  }, []);

  const getDummyReports = () => [
    { id: 1, title: 'Attendance Summary', details: 'Average attendance for this semester is 95%...' },
    { id: 2, title: 'Exam Results', details: 'Overall pass rate: 88%. Highest: 98% in Mathematics.' },
    { id: 3, title: 'Assignment Submissions', details: '92% of students submitted assignments on time.' },
    { id: 4, title: 'Project Progress', details: '80% of final-year projects are on schedule.' },
    { id: 5, title: 'Library Usage', details: 'Library visits increased by 25% this semester.' },
  ];

  const toggleDetails = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <div
      className="et-card"
      style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: darkMode ? '#1e1e2f' : '#fff',
        color: darkMode ? '#f8f9fa' : '#000',
        boxShadow: darkMode
          ? '0 4px 12px rgba(0,0,0,0.7)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <h2 style={{ color: darkMode ? '#00d4ff' : '#333' }}>Reports</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reports.map((r) => (
          <li
            key={r.id}
            style={{
              marginBottom: '10px',
              padding: '12px',
              border: darkMode ? '1px solid #333' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: darkMode ? '#2a2a3d' : '#f9f9f9',
              color: darkMode ? '#fff' : '#000',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
            onClick={() => toggleDetails(r.id)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <strong style={{ color: darkMode ? '#00d4ff' : '#000' }}>{r.title}</strong>
            {expandedReport === r.id && (
              <p style={{ marginTop: '8px', color: darkMode ? '#d1d1d1' : '#555' }}>
                {r.details}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
