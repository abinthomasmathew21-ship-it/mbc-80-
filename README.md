# MBC : 80 Official Portal — Starter

A professional public-facing MBC : 80 student portal starter with a Three.js ambient background, optional looping background video, public Execom/activity/session/calendar views, and a SQLite database/API.

## Run locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env` and set `ADMIN_PASSWORD`.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.

## Data model
`schema.sql` creates:
- `execom_members`
- `activities`
- `sessions`
- `updates`

## API
- `GET /api/portal`
- `POST /api/admin/login`
- `POST /api/members`
- `POST /api/activities`
- `POST /api/sessions`
- `POST /api/updates`
- `DELETE /api/{resource}/{id}`

## Production note
The included login is intentionally a minimal starter gate. For a real college deployment, use institutional Google/Microsoft SSO, secure sessions, CSRF protection, validation, rate limiting, HTTPS, backups, and a managed database such as PostgreSQL/Supabase.

The background video is configurable through `BACKGROUND_VIDEO_URL`; use a video you have permission to host.
