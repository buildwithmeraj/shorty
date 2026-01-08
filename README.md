## Shorty

A minimal URL shortener built with:

**Frontend:** React + Vite
**Backend:** Express + MongoDB
**Auth:** Firebase Authentication (Admin SDK)

---

## Live Site

- Frontend - [Live Link](https://shorty-m.pages.dev/)
- Backend - [Live Link](https://shorty-api-beta.vercel.app/)

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Design Decisions](#design-decisions)
- [Known Limitations](#known-limitations)
- [Quick Start](#quick-start)

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js **>= 16**
- npm
- MongoDB (local or remote)
- Firebase project with a **service account**

---

### 1. Clone the Repository

```bash
git clone <repo-url>
cd /home/ms/codes/react/shorty
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Environment Variables

Create or configure your environment variables:

```env
MONGODB_URI=mongodb://localhost:27017
PORT=3000
FB_SERVICE_KEY=<BASE64_ENCODED_FIREBASE_SERVICE_ACCOUNT_JSON>
```

##### Encoding Firebase Service Account

```bash
cat serviceAccount.json | base64 --wrap=0
```

> The backend decodes this value internally and initializes Firebase Admin.

#### Start Backend Server

```bash
node index.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

A sample `.env` file is already provided in `frontend/.env.example`.

Ensure the following values are set:

```env
VITE_API_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:5173

# Firebase client config
VITE_FB_API_KEY=...
VITE_FB_AUTH_DOMAIN=...
VITE_FB_PROJECT_ID=...
VITE_FB_APP_ID=...
```

#### Start Development Server

```bash
npm run dev
```

---

### Notes

- Backend expects `FB_SERVICE_KEY` to be **Base64-encoded**
- Default CORS origin is restricted to:

  ```
  http://localhost:5173
  ```

  (Adjust in `backend/index.js` if needed)

---

## Project Structure

```text
shorty/
├── backend/
│   └── index.js            # Express server and API endpoints
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── home/        # Hero, HowItWorks, Example, CTA
│   │   │   │   └── dashboard/  # Dashboard, Shorten
│   │   ├── layouts/
│   │   │   └── Root.jsx
│   │   ├── routers/
│   │   │   └── routes.jsx
│   │   └── index.css
│   ├── public/
│   │   └── bg.svg
│   └── .env                # Vite environment variables (example)
└── README.md
```

---

## API Documentation

**Base URL**

```text
http://localhost:3000
```

### Authentication

Most endpoints require a Firebase ID token:

```http
Authorization: Bearer <ID_TOKEN>
```

---

### 1. Health Check

**GET /**

- **Purpose:** Server health check
- **Response:** `200 OK`

```text
Smart server is running
```

---

### 2. Create Short Link

**POST /shorten**

- **Auth:** Required

#### Request

```json
{
  "targetURL": "https://very.long.example/...",
  "shortenTag": "abc123"
}
```

#### Success Response (`201 Created`)

```json
{
  "targetURL": "...",
  "shortenTag": "abc123",
  "createdAt": "2026-01-08T...",
  "hits": 0,
  "createdBy": "user@example.com"
}
```

#### Errors

- `400` – Missing fields
- `401` – Unauthorized
- `409` – `shortenTag` already exists

#### Curl Example

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Authorization: Bearer <ID_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"targetURL":"https://example.com/long","shortenTag":"abc123"}'
```

---

### 3. List User Links

**GET /links**

- **Auth:** Required

#### Response

```json
[{ "shortenTag": "abc123", "targetURL": "...", "hits": 3 }]
```

---

### 4. Get Total Link Count

**GET /links/total**

- **Auth:** Required

```json
{
  "totalLinks": 5
}
```

---

### 5. Resolve Short Link

**GET /links/:id**

- **Auth:** Not required

#### Response

```json
{
  "targetURL": "https://example.com/..."
}
```

- `404` if not found

> The backend returns JSON.
> The frontend route loader performs the client-side redirect.

---

### 6. Delete Link

**DELETE /links/:id**

- **Auth:** Required
- **Owner only**

#### Responses

- `200 OK`

  ```json
  { "message": "Link deleted successfully" }
  ```

- `403` – Not owner
- `404` – Not found

---

## Design Decisions

- **Authentication:** Firebase Auth with Admin SDK for secure ID token verification
- **Database:** MongoDB with a simple `links` collection
- **Collision Handling:** Server checks `shortenTag` uniqueness and returns `409`
- **Redirect Flow:** Backend returns JSON; frontend performs redirect after hit count update
- **Frontend Stack:** Vite + React, Tailwind + DaisyUI for styling
- **Environment Config:** Vite environment variables for URLs and Firebase config

---

## Known Limitations

- No rate limiting or abuse protection
- No URL validation beyond presence check
- Possible race conditions under high concurrency
- Redirect is client-side (not HTTP 302)
- CORS locked to `localhost:5173`
- No advanced analytics (geo, device, referrer)
- MongoDB connection has no retry/backoff logic

---

## Quick Start

```bash
# Backend
cd backend
node index.js

# Frontend
cd frontend
npm run dev
```
