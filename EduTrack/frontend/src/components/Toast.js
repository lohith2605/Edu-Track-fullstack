import React from 'react';

export const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;
  return (
    <div className={`et-toast et-toast-${type}`} onClick={onClose}>
      {message}
    </div>
  );
};
export default Toast;