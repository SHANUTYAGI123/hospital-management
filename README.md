# Hospital Management System

A full-stack web application for managing hospital operations, built with React, Node.js, Express, and MongoDB.

## Features
- **Patients, Doctors, Tests, Test Logs, Doctor-Patient Assignments**: Full CRUD (Create, Read, Update, Delete) operations for all entities.
- **User Interface**: Modern UI with React and Bootstrap.
- **Toast Notifications**: Instant feedback for all actions using react-toastify.
- **RESTful API**: Express + Mongoose backend with MongoDB.

## Project Structure
```
DBMS/
├── backend/           # Node.js + Express + MongoDB API
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routes
│   ├── app.js         # Main backend entry
│   ├── package.json   # Backend dependencies
│   └── ...
├── frontend/          # React app
│   ├── src/
│   ├── public/
│   ├── package.json   # Frontend dependencies
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MongoDB connection string
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

## Usage
- Navigate to `http://localhost:3000` to use the application.
- Perform CRUD operations for all hospital entities.

## Deployment
You can deploy the frontend (React) and backend (Node.js/Express) separately to platforms like Vercel, Netlify, Heroku, or Render.

## License
This project is for educational/demo purposes.

---

**Made by SHANUTYAGI123**
