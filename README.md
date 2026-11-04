# Student Directory App

A full-stack student management application with Express.js backend and React + Vite frontend.

## Features

- **Backend**: Express.js REST API with student CRUD operations and mock authentication
- **Frontend**: React 19 + Vite with React Router, protected routes, and token persistence
- **UI**: Clean, modern design with form validation and error handling

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Express.js 5, CORS |
| Frontend | React 19, Vite 8, React Router DOM 7 |
| Styling | CSS Custom Properties (no framework) |
| Linting | Oxlint |

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Start

### 1. Clone and Install

```bash
# Backend
cd express-student-api
npm install

# Frontend
cd student-directory-frontend
npm install
```

### 2. Run Development Servers

**Terminal 1 - Backend (port 3000):**
```bash
cd express-student-api
npm run dev
```

**Terminal 2 - Frontend (port 5173):**
```bash
cd student-directory-frontend
npm run dev
```

### 3. Open Application

Navigate to **http://localhost:5173/**

## Demo Credentials

| Email | Password | Name |
|-------|----------|------|
| alice@student.edu | alice123 | Alice Chen |
| bob@student.edu | bob123 | Bob Smith |

## Project Structure

```
express-student-api/
├── server.js              # Express backend
├── package.json
└── student-directory-frontend/
    ├── src/
    │   ├── components/    # ProtectedRoute, NavBar
    │   ├── context/       # AuthContext (token management)
    │   ├── hooks/         # useAuth hook
    │   ├── pages/         # Login, Register, Students
    │   ├── App.jsx        # Routes configuration
    │   ├── main.jsx       # Entry point
    │   ├── index.css      # Global styles & design tokens
    │   └── App.css        # Component styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/login | User login | No |
| GET | /api/students | List all students | Yes (Bearer) |
| GET | /api/students/:id | Get single student | Yes (Bearer) |
| POST | /api/students | Create student | Yes (Bearer) |
| DELETE | /api/students/:id | Delete student | Yes (Bearer) |

### Authorization

Include token in request header:
```
Authorization: Bearer <token>
```

## Environment Variables

Currently **no environment variables required** - uses mock data in-memory.

For production, you would add:
```bash
# Backend (.env)
PORT=3000
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend (.env)
VITE_API_URL=http://localhost:3000
```

## Available Scripts

### Backend
```bash
npm run dev      # Start dev server (nodemon not needed, uses node)
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run Oxlint
```

## How It Works

### Authentication Flow

1. User submits credentials on `/login`
2. Backend validates against mock user database
3. On success, returns JWT-style token + user data
4. Frontend stores token in `localStorage` and React state
5. Protected routes check `isAuthenticated` before rendering
6. API requests include `Authorization: Bearer <token>` header

### Protected Routes

- `/students` - Requires authentication
- `/login` - Public (redirects to `/students` if authenticated)
- `/register` - Public (redirects to `/students` if authenticated)

### Token Persistence

Token survives page refresh via `localStorage`:
- On app mount, `AuthContext` reads from `localStorage`
- On login, token saved to `localStorage`
- On logout, token removed from `localStorage`

## Development Notes

- **CORS**: Configured for `localhost:5173` and `localhost:5174`
- **Mock Data**: Students and users stored in-memory (reset on server restart)
- **No Database**: Designed for demo/educational purposes

## License

ISC