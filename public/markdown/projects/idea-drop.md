

# IdeaDrop 🧠💡

*A full-stack ideas platform with secure authentication and modern React architecture*

IdeaDrop is a full-stack application that allows users to register, authenticate, and manage ideas through a clean, responsive UI and a secure Node.js/Express API. The project implements **JWT-based authentication with refresh tokens**, protected routes, and full CRUD functionality.

This section documents **both the frontend UI and the backend API**, including setup, authentication flow, and available routes.

---

## ✨ Features

### UI Features

* User registration and login
* JWT-based authentication with automatic token refresh
* Create, read, update, and delete (CRUD) ideas
* Protected routes for creating and editing ideas
* Responsive and clean UI

### API Features

* Secure authentication with access and refresh tokens
* Full CRUD API for ideas
* Route-level authorization (owner-only updates & deletes)
* HTTP-only cookies for refresh tokens
* MongoDB-backed persistence

---

## 🛠 Tech Stack

### Frontend

* **React** (via Vite)
* **TanStack Router** – routing & protected routes
* **TanStack Query** – server-state management
* **Axios** – API communication
* Context API – authentication state

### Backend

* **Node.js**
* **Express**
* **MongoDB** (via Mongoose)
* **JWT** for authentication
* **Cookie-based refresh tokens**

---

## 📦 Frontend Setup (UI)

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

### 🔐 Environment Variables (Frontend)

Rename `example.env` to `.env` and configure:

```env
VITE_API_URL=http://localhost:5000/api
```

> Update the URL if your backend runs on a different host or port.

---

## 🔄 Frontend Authentication Flow

1. User logs in or registers.
2. API returns:

   * `accessToken` (short-lived)
   * `refreshToken` stored in a **secure, HTTP-only cookie**
3. `accessToken` is:

   * Stored in React context
   * Sent in the `Authorization` header as a Bearer token
4. When:

   * The access token expires **or**
   * A hard refresh occurs

   The app automatically requests a new access token using the refresh token.

> Translation: seamless auth, zero manual re-login, maximum UX delight.

---

## 📦 Backend Setup (API)

### Installation

```bash
npm install
```

### Environment Variables (Backend)

Rename `example.env` to `.env` and configure:

```env
MONGO_URI="YOUR MONGODB ATLAS URL"
JWT_SECRET="ADD A SECRET"
```

---

### Run Server

```bash
npm run dev
```

---

## 🔐 How Backend Authentication Works

1. User hits `/register` or `/login`
2. Server responds with:

   * User data
   * **Short-lived access token** (default: 1 minute)
3. A **long-lived refresh token** (30 days) is stored in an **HTTP-only cookie**
4. Access token is used to:

   * Call protected routes (e.g. `POST /api/ideas`)
5. When the access token expires:

   * Client calls `/api/auth/refresh`
   * Server validates refresh token from cookie
   * Issues a new access token

> Security-first, scalable, and production-ready.

---

## 🛣 API Routes

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint    | Description                              | Auth Required  |
| -----: | ----------- | ---------------------------------------- | -------------- |
|   POST | `/register` | Register a new user                      | ❌ No           |
|   POST | `/login`    | Log in an existing user                  | ❌ No           |
|   POST | `/logout`   | Log out and clear refresh token          | ✅ Yes (cookie) |
|   POST | `/refresh`  | Get new access token using refresh token | ✅ Yes (cookie) |

**Notes:**

* Refresh tokens are stored in **HTTP-only cookies**
* Access tokens must be sent as:

  ```
  Authorization: Bearer <accessToken>
  ```

---

### 💡 Idea Routes (`/api/ideas`)

| Method | Endpoint | Description                 | Auth Required |
| -----: | -------- | --------------------------- | ------------- |
|    GET | `/`      | Get all public ideas        | ❌ No          |
|    GET | `/:id`   | Get a single idea by ID     | ❌ No          |
|   POST | `/`      | Create a new idea           | ✅ Yes         |
|    PUT | `/:id`   | Update an idea (owner only) | ✅ Yes         |
| DELETE | `/:id`   | Delete an idea (owner only) | ✅ Yes         |

---

## 🚀 Project Status
* ✅ Authentication fully implemented
* ✅ Secure token refresh flow
* ✅ Protected routes enforced
* 🔄 Pending UI design renovation
* 🔄 Ready for deployment and scaling

---

## 📌 Final Notes

This project demonstrates:
* Real-world authentication patterns
* Clean separation of frontend & backend concerns
* Modern React architecture
* Security-aware API design
