# Travelator Detailed Quick Guide Report

## 1. Purpose
This guide explains how the current Travelator project works after recent updates, and how to run it correctly.

It covers:
- Authentication and user creation in database
- User-specific data reset/isolation
- Profile save and sync behavior
- Booking flow and recent bookings logic
- Flight destination image behavior
- Quick troubleshooting

---

## 2. Quick Start (Run the Project)
1. Install dependencies:
   - `npm install`
2. Ensure MongoDB is running locally or your MongoDB connection string is configured.
3. Start backend server:
   - `npm start`
   - or `npm run dev`
4. Open the app in browser:
   - `http://localhost:5000/index.html` (or your configured host)

---

## 3. What We Used for Building
The following stack and tools were used to build and update this project:

- Frontend:
   - HTML5, CSS3, JavaScript (Vanilla JS)
   - LocalStorage for client-side session and scoped UI state

- Backend:
   - Node.js + Express.js
   - REST APIs for auth, profile, bookings, and utility actions

- Database:
   - MongoDB
   - Mongoose (schema modeling and DB operations)

- Authentication/Security:
   - JWT token-based auth
   - Password hashing with bcrypt

- Real-time/Sync and Integrations:
   - WebSocket (`ws`) for seat-lock flow in flights
   - Azure service integration pattern via secure backend proxy routes

- Developer Tooling:
   - npm / nodemon
   - Git + GitHub workflow files

---

## 4. Authentication Flow (Database-backed)
- New users are created using backend API.
- Login also validates using backend API.
- If backend is down, signup/login now shows server-unreachable error (no local demo account creation).

Used endpoints:
- `POST /register`
- `POST /login`
- `GET /api/users/me`
- `PUT /api/users/me`

---

## 5. User-specific Website Reset/Isolation
When a different user logs in or signs up:
- App data is isolated per user context.
- Data from previous users is not shown.

Scoped items include:
- `hotelBookings`
- `flightBookings`
- `globalStats`
- Profile data (`travelator_profile_info`, prefs, phone)
- Zone config and selected language

Result:
- Each user sees their own profile, booking history, and preferences.
- New user starts with clean personal state.

---

## 6. Profile Behavior
Profile page now:
- Loads profile from backend (`/api/users/me`) when authenticated.
- Saves profile to backend (`PUT /api/users/me`) on submit.
- Keeps local save as fallback if server write fails.

UI/UX enhancements include:
- Better section grouping and spacing
- Completion progress bar
- Unsaved changes warning
- Inline field validations

---

## 7. Recent Bookings Logic (Dashboard)
Recent Bookings section now:
- Reads from both `hotelBookings` and `flightBookings`
- Merges and sorts by latest booking timestamp
- Displays maximum 3 latest entries
- Auto-refreshes on load and storage changes

---

## 8. Flight Destination Images
Flight booking destination cards use destination image mapping.
Recent changes:
- Replaced problematic image links
- Updated Jaipur, Varanasi, and Goa image URLs
- Updated fallback destination image to avoid airplane-wing style image

If an image still does not load:
- Replace that specific destination URL with another direct image URL.

---

## 9. Common Troubleshooting
### A. Signup/Login fails
- Confirm backend server is running.
- Confirm MongoDB connection is healthy.
- Check browser console and backend terminal logs.

### B. Profile not updating in DB
- Ensure auth token exists in localStorage (`travelator_auth_token`).
- Verify API route `PUT /api/users/me` is reachable.

### C. Recent Bookings not updating
- Confirm booking entries are added to `hotelBookings` or `flightBookings`.
- Refresh dashboard page.

### D. Some destination images blank
- Replace the destination URL with a stable direct image URL.

---

## 10. Suggested Next Improvements
1. Move booking data from localStorage to database collections per user.
2. Add token refresh/session extension flow.
3. Add image CDN/local asset fallback set for all destinations.
4. Add a small admin diagnostic page for API health and MongoDB status.

---

## 11. Summary
The project now supports real user registration/login in DB, user-isolated app state, backend-synced profile updates, dynamic recent bookings (top 3), and improved destination image handling.
