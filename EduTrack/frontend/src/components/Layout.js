import React from 'react';
import Header from './Header';
import { motion } from 'framer-motion';

const Layout = ({ children, user, onToggleTheme, theme, onLogout }) => {
  return (
    <div className={`et-app ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <Header user={user} onToggleTheme={onToggleTheme} theme={theme} onLogout={onLogout} />
      <motion.main className="et-main" initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.45}}>
        <div className="et-container">
          {children}
        </div>
      </motion.main>
      <footer className="et-footer">© {new Date().getFullYear()} EduTrack — Built with ❤️</footer>
    </div>
  );
};

export default Layout;
