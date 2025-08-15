import React from 'react';
import { motion } from 'framer-motion';

const Card = ({title, value, subtitle})=> (
  <motion.div className="et-card" whileHover={{ y:-6, scale:1.02 }} transition={{type:'spring', stiffness:200}}>
    <h3>{title}</h3>
    <p className="muted">{subtitle}</p>
    <div style={{marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <strong style={{fontSize:24}}>{value}</strong>
      <div style={{color:'#94a3b8', fontSize:13}}>Overview</div>
    </div>
  </motion.div>
);

const Dashboard = ({ metrics }) => {
  const students = metrics?.students || 1024;
  const mentors = metrics?.mentors || 26;
  const reports = metrics?.reports || 7;

  return (
    <div className="fade-in">
      <div className="grid-3">
        <Card title="Students" value={students} subtitle="Total enrolled students" />
        <Card title="Mentors" value={mentors} subtitle="Active mentors" />
        <Card title="Reports" value={reports} subtitle="New this week" />
      </div>

      <div style={{marginTop:18}} className="et-card">
        <h3>Recent Activity</h3>
        <p className="muted">A quick glance of what students & mentors did recently.</p>
        <ul>
          <li>Student A submitted assignment</li>
          <li>Mentor B uploaded feedback</li>
          <li>Course C updated</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
