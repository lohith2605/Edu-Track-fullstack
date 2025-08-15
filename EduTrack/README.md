📄 README.md
markdown
Copy code
# 🎓 EduTrack – Student Management System

EduTrack is a full-stack web application built for managing academic information, including users, courses, grades, enrollments, and reporting.

---

## 🧠 Tech Stack

| Layer     | Stack                        |
|-----------|------------------------------|
| Frontend  | React + Axios + React Router |
| Backend   | Node.js + Express            |
| Database  | MySQL                        |
| Auth      | JWT (JSON Web Tokens)        |
| API Docs  | Swagger (OpenAPI)            |

---

## 📁 Folder Structure

EduTrack/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ ├── utils/
│ ├── .env
│ ├── server.js
│ └── swagger.js
├── frontend/
│ └── src/
│ ├── App.js
│ └── components/
├── sql/
│ └── schema.sql
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 📌 Prerequisites

- Node.js & npm installed
- MySQL installed and running
- Code editor (VS Code recommended)

---

### 🛠️ 1. Clone or Download

If you haven’t already:
```bash
git clone https://github.com/yourusername/EduTrack.git
cd EduTrack
📂 2. Set Up the Backend
bash
Copy code
cd backend
npm install
✅ Create a .env file:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=edutrack
JWT_SECRET=your_super_secret_key
💾 3. Set Up the Database
Open MySQL Workbench or terminal

Run the schema:

sql
Copy code
SOURCE path/to/sql/schema.sql;
Or paste and execute the full contents of schema.sql.

▶️ 4. Start Backend
bash
Copy code
node server.js
Server will run at: http://localhost:5000

Swagger Docs: http://localhost:5000/api-docs

🌐 5. Set Up the Frontend
bash
Copy code
cd ../frontend
npm install
npm start
Opens at: http://localhost:3000

🔐 User Roles
Role	Access Level
admin	Full access: users, courses, reports
faculty	Manage courses & view reports
student	View & enroll in courses

You can create users using the /api/auth/register endpoint (e.g. via Postman).

📊 Reports Available
Enrollment Report

Grade Report

Attendance Report

Export as .csv or .json.

🧪 Sample API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user (JWT)
GET	/api/users/profile	Fetch current user
GET	/api/courses	List all courses
POST	/api/courses/:id/enroll	Enroll student
GET	/api/reports/enrollment	Enrollment report

💬 Credits
Built collaboratively using:

ChatGPT (Backend)

Gemini (Frontend)

✅ Project Status
🟢 Complete
📦 Ready for deployment or presentation
📚 Easy to extend with features like attendance marking, analytics, and notifications

yaml
Copy code

---

Once you paste this into your root `README.md`, you’re done ✅

Would you like a reminder on how to zip everything for final submission?
