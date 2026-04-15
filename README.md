# Flourish

A full-stack gardening community platform for tracking plants, planning gardens, and sharing tips with other growers.

**Live:** [flourish-sepia.vercel.app](https://flourish-sepia.vercel.app/)

## Features

- Personal garden dashboard with plant tracking and a growing calendar
- Community feed: create posts, comment, and browse advice from other gardeners
- AI-assisted plant care suggestions via the OpenAI API
- Image uploads backed by AWS S3
- Session-based auth with Passport

## Tech Stack

**Frontend** — React 18, Vite, Tailwind CSS, MUI, React Router, Axios
**Backend** — Node.js, Express, MongoDB (Mongoose), Passport.js
**Infra** — Vercel (frontend), Railway (backend), AWS S3 (uploads), OpenAI API

## Project Structure

```
flourish/
├── frontend/   # Vite + React app
└── server/     # Express API
```

## Local Development

You'll need Node 18+, a MongoDB connection string, and (optionally) AWS S3 + OpenAI credentials.

### Backend

```bash
cd server
npm install
npm start              # http://localhost:8000
```

Create `server/.env`:

```
DB_URL=mongodb+srv://...
PORT=8000
SESSION_SECRET=your-secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
OPENAI_API_KEY=sk-...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=...
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:8000
```

### Other commands

```bash
npm run build          # production build (frontend)
npm run preview        # preview built bundle
npm run lint           # ESLint
```

## API Routes

| Route             | Description                          |
| ----------------- | ------------------------------------ |
| `/user/*`         | Register, login, logout, status, plants |
| `/post/*`         | Post CRUD                            |
| `/comment/*`      | Comment CRUD                         |
| `/crop/*`         | Crop management                      |

## Deployment

- **Frontend** auto-deploys from `main` to Vercel
- **Backend** auto-deploys from `main` to Railway
- Make sure `FRONTEND_URL` on Railway matches the deployed Vercel origin (CORS depends on it)
