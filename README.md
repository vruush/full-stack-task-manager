<<<<<<< HEAD
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
=======
# task-manager-fullstack



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/project3563029/task-manager-fullstack.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/project3563029/task-manager-fullstack/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [Automatically close issues from merge requests](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
>>>>>>> 232cae3a65db6d91f7842317c05a0f14fd7f3bbe
