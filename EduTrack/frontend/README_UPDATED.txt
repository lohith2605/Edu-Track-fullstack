Updated EduTrack Frontend
------------------------
What's included:
- framer-motion animations
- react-toastify toast notifications
- theme (dark/light) toggle saved to localStorage
- API base constant in src/theme.js (defaults to http://localhost:5000/api)

How to run:
1. unzip the frontend folder
2. cd frontend
3. npm install
4. npm start

Note: The frontend will attempt to fetch metrics from `${API_BASE}/metrics`. If your backend runs on a different port, set REACT_APP_API_BASE in your environment or in a .env file before starting.
