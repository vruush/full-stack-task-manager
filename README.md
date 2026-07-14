# Task Management System (Full Stack)

React.js (Vite) + Node.js/Express.js + SQLite + JWT Authentication

> Backend bilkul same hai (koi change nahi). Sirf frontend Create React App se
> **Vite** par migrate kiya gaya hai aur UI ko naye design ke saath rewrite
> kiya gaya hai (Tailwind CSS v4, "ledger/journal" themed look). Saara backend
> contract (API routes, request/response shape, auth flow) same hai.

## 📁 Folder Structure

```
task-manager/
├── backend/                     # UNCHANGED
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── database.sqlite         # auto-created when server runs
│
└── frontend/                    # REBUILT with Vite + Tailwind v4
    ├── index.html
    ├── vite.config.js
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── api/
    │   │   └── axios.js         # axios instance + JWT interceptor (same logic)
    │   ├── components/
    │   │   ├── Logo.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskItem.jsx
    │   │   ├── FilterDropdown.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css            # Tailwind v4 theme tokens + component classes
    └── package.json
```

## 🚀 How to Run (Step by Step)

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

- Server chalega `http://localhost:5000` par.
- `database.sqlite` file automatically ban jayegi with `users` and `tasks` tables.
- `.env` file me `JWT_SECRET` change kar lena production ke liye.

**Dev mode (auto-restart on changes):**
```bash
npm install -g nodemon
npm run dev
```

### 2. Frontend Setup (naya terminal me)

```bash
cd frontend
npm install
npm run dev
```

- Vite dev server khulega `http://localhost:5173` par.
- Automatically backend (`http://localhost:5000/api`) ko call karega — koi
  frontend `.env` ki zaroorat nahi, `src/api/axios.js` me baseURL already set hai.

**Production build:**
```bash
npm run build      # dist/ folder me static output
npm run preview    # build ko locally preview karne ke liye
```

### 3. Use the App

1. `http://localhost:5173/signup` par account banao.
2. Login karo.
3. Dashboard par tasks add/edit/delete karo.
4. Status filter (To Do / In Progress / Completed) use karo.

## 🔑 API Endpoints (unchanged)

| Method | Endpoint              | Auth Required | Description              |
|--------|-----------------------|----------------|---------------------------|
| POST   | /api/auth/register    | No             | Register new user         |
| POST   | /api/auth/login       | No             | Login, returns JWT        |
| GET    | /api/tasks            | Yes            | Get all tasks (optional `?status=` filter) |
| POST   | /api/tasks            | Yes            | Create new task            |
| PUT    | /api/tasks/:id        | Yes            | Update task                |
| DELETE | /api/tasks/:id        | Yes            | Delete task                 |

Protected routes need header: `Authorization: Bearer <token>`

## 🎨 What changed in the UI

- **Create React App → Vite**: faster dev server + builds, native ESM, `npm run dev`/`build`/`preview` scripts.
- **Tailwind v3 → v4**: config ab CSS-first hai — `src/index.css` ke `@theme`
  block me saare design tokens (colors, fonts) defined hain, alag
  `tailwind.config.js`/`postcss.config.js` ki zaroorat nahi.
- **New visual identity** — "ledger" theme: a bound-notebook mark, a serif
  display face (Fraunces) paired with Inter + a monospace accent for dates,
  a warm paper background, pine-green/amber palette, status-colored spine on
  each task card, and a small progress ring showing how many tasks are done.
- **Same behaviour**: same routes (`/login`, `/signup`, `/dashboard`), same
  auth context, same axios interceptor, same API calls, same props between
  components. Only presentation changed — components were renamed `.js` →
  `.jsx` (Vite convention) but logic is untouched.

## 🗄️ Database Schema (unchanged)

**users**
| Column   | Type    |
|----------|---------|
| id       | INTEGER PRIMARY KEY |
| username | TEXT UNIQUE |
| password | TEXT (hashed) |

**tasks**
| Column      | Type    |
|-------------|---------|
| id          | INTEGER PRIMARY KEY |
| user_id     | INTEGER (FK -> users.id) |
| title       | TEXT |
| description | TEXT |
| status      | TEXT ('To Do' / 'In Progress' / 'Completed') |

## 📝 Notes

- Passwords bcrypt se hash hote hain — plain text kabhi store nahi hota.
- JWT token `localStorage` me store hota hai frontend me, aur har request ke
  saath automatically bhejta hai (axios interceptor) — same as before.
- Agar token expire/invalid ho, user automatically `/login` par redirect ho
  jata hai.
- Backend me literally kuch bhi nahi badla — same files, same logic.
