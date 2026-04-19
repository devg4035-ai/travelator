# Travelator Backend Deployment Guide

## Goal
Make the backend reachable from any network so users can sign up and log in from the website on mobile, desktop, or another Wi-Fi network.

## What You Need
- A public backend host such as Render, Railway, Fly.io, Azure App Service, or a VPS
- A MongoDB database URL
- A GitHub Pages or public frontend URL

## Environment Variables
Set these on your backend host:
- `PORT`
- `MONGODB_URI`
- `NODE_ENV=production`
- `JWT_SECRET`
- `JWT_EXPIRE=7d`
- `CORS_ORIGIN` with your frontend URL(s), comma-separated
- `AZURE_TRANSLATOR_KEY` if you use translation
- `AZURE_TRANSLATOR_REGION`
- `AZURE_TRANSLATOR_ENDPOINT`

## Backend Changes Already Added
- CORS now allows only the configured frontend origins
- Server trusts proxy headers for public hosting platforms
- Backend binds to the platform-provided port

## Frontend Setup
The static frontend must know the public backend URL.

Use this GitHub secret:
- `TRAVELATOR_API_BASE_URL`

Set it to your deployed backend URL, for example:
- `https://travelator-api.onrender.com`

## Deployment Steps
1. Push your code to GitHub.
2. Deploy the backend to your chosen host.
3. Set all environment variables.
4. Confirm the backend responds at `/`.
5. Add your frontend URL to `CORS_ORIGIN`.
6. Set GitHub secret `TRAVELATOR_API_BASE_URL`.
7. Redeploy the GitHub Pages site.
8. Test signup/login from a different network.

## Verification
- Open the backend root endpoint and confirm JSON is returned.
- Try creating a new account from phone data or a different Wi-Fi network.
- Confirm the user is stored in MongoDB.
- Confirm login returns a token and redirects to dashboard.

## Common Mistakes
- Using `http://localhost:5000` as the frontend API URL when the frontend is on GitHub Pages
- Forgetting to set `CORS_ORIGIN`
- Using an `http://` backend URL while the frontend is loaded over `https://`
- Not deploying the backend publicly

## Recommended Setup
- Frontend: GitHub Pages
- Backend: Render or Railway with HTTPS
- Database: MongoDB Atlas

## Render Deployment Steps
1. Go to Render and create a new Web Service.
2. Connect your GitHub repository.
3. Set the build command to `npm install`.
4. Set the start command to `node server.js`.
5. Add these environment variables:
	- `PORT=5000` (Render will override with its own runtime port)
	- `MONGODB_URI=<your MongoDB Atlas connection string>`
	- `NODE_ENV=production`
	- `JWT_SECRET=<strong-random-secret>`
	- `JWT_EXPIRE=7d`
	- `CORS_ORIGIN=<your GitHub Pages URL>`
	- `AZURE_TRANSLATOR_KEY` if used
	- `AZURE_TRANSLATOR_REGION` if used
	- `AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com`
6. Deploy the service.
7. Copy the final public URL, for example `https://travelator-api.onrender.com`.

## Railway Deployment Steps
1. Go to Railway and create a new project.
2. Deploy from GitHub repository.
3. Add a Node.js service.
4. Set environment variables exactly as listed above.
5. Make sure the service is exposed publicly over HTTPS.
6. Copy the public Railway URL.

## MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Allow your backend host IP or use network access set for deployment.
4. Copy the Atlas connection string.
5. Put it into `MONGODB_URI` on Render/Railway.

## GitHub Pages Frontend Setup
1. Open your GitHub repository settings.
2. Go to Secrets and variables > Actions.
3. Add a new repository secret named `TRAVELATOR_API_BASE_URL`.
4. Set its value to your deployed backend HTTPS URL.
5. Keep `CORS_ORIGIN` on the backend set to your GitHub Pages domain.
6. Redeploy the GitHub Pages workflow.

## Final Check
1. Open the backend root URL and confirm it returns JSON.
2. Open the website from mobile or another network.
3. Try sign up with a new email.
4. Confirm the user appears in MongoDB Atlas.
5. Log in with the same account from another network.

## Important Rule
If the frontend is on GitHub Pages, the backend must be public and HTTPS. A local `localhost` API will only work on your own machine.
