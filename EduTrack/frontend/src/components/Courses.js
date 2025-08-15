import React, { useEffect, useState } from 'react';
import api from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('et_token');
    if (!token) {
      setCourses(getDummyCourses());
      return;
    }
    api.get('/courses', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCourses(res.data.length ? res.data : getDummyCourses()))
      .catch(() => setCourses(getDummyCourses()));
  }, []);

  useEffect(() => {
    let filtered = courses.filter(course =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    setFilteredCourses(filtered);
  }, [search, sortBy, courses]);

  const getDummyCourses = () => [
    { id: 1, name: 'Mathematics 101', instructor: 'Dr. Rao', duration: '3 Months', level: 'Beginner', description: 'Basic algebra, geometry, and calculus for beginners.' },
    { id: 2, name: 'Physics Basics', instructor: 'Prof. Sharma', duration: '4 Months', level: 'Beginner', description: 'Introduction to mechanics, motion, and energy principles.' },
    { id: 3, name: 'Intro to Programming', instructor: 'Ms. Priya', duration: '2 Months', level: 'Beginner', description: 'Learn the basics of programming using JavaScript.' },
    { id: 4, name: 'Data Structures & Algorithms', instructor: 'Mr. Kiran', duration: '5 Months', level: 'Intermediate', description: 'Master arrays, linked lists, trees, and algorithms for interviews.' },
    { id: 5, name: 'Web Development Bootcamp', instructor: 'Mrs. Rani', duration: '6 Months', level: 'Intermediate', description: 'Full-stack development using HTML, CSS, JavaScript, and React.' },
    { id: 6, name: 'Machine Learning Basics', instructor: 'Dr. Iqbal', duration: '4 Months', level: 'Advanced', description: 'Learn ML concepts, algorithms, and Python implementation.' }
  ];

  const themeStyles = {
    backgroundColor: darkMode ? '#121212' : '#f9f9f9',
    color: darkMode ? '#fff' : '#000',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  const dragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e, id) => {
    e.preventDefault();
    const draggedIndex = filteredCourses.findIndex(c => c.id === draggedId);
    const targetIndex = filteredCourses.findIndex(c => c.id === id);
    const updated = [...filteredCourses];
    const [draggedCourse] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedCourse);
    setFilteredCourses(updated);
    setDraggedId(null);
  };

  return (
    <div style={themeStyles}>
      <h2>Courses</h2>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="name">Sort by Name</option>
          <option value="instructor">Sort by Instructor</option>
        </select>
        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px' }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Course Cards */}
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {filteredCourses.map(course => (
          <div
            key={course.id}
            draggable
            onDragStart={(e) => dragStart(e, course.id)}
            onDragOver={dragOver}
            onDrop={(e) => drop(e, course.id)}
            style={{
              backgroundColor: darkMode ? '#1e1e1e' : '#fff',
              padding: '15px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              cursor: 'grab',
              transition: 'transform 0.2s ease',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3>{course.name}</h3>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <button
              onClick={() => setSelectedCourse(course)}
              style={{
                marginTop: '8px',
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedCourse && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%',
          height: '100%', backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
          onClick={() => setSelectedCourse(null)}
        >
          <div style={{
            backgroundColor: darkMode ? '#222' : '#fff',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}
            onClick={e => e.stopPropagation()}
          >
            <h2>{selectedCourse.name}</h2>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Level:</strong> {selectedCourse.level}</p>
            <p>{selectedCourse.description}</p>
            <button
              onClick={() => setSelectedCourse(null)}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
