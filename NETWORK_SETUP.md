# Travelator - Network Setup Guide

## Quick Start for Multi-Device Access

This guide explains how to run your Travelator website and make it accessible from other devices on your network.

---

## Prerequisites

Make sure you have installed:
- **Node.js** (v12 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (running locally or accessible via network)
- **npm** (comes with Node.js)

---

## Step 1: Ensure Dependencies Are Installed

```bash
cd "c:\project new\dev new project\travelator"
npm install
```

---

## Step 2: Start MongoDB

MongoDB must be running for the backend to work. Choose one option:

### Option A: MongoDB Running Locally (Recommended for Local Network)

1. Open PowerShell as Administrator
2. Run MongoDB:
   ```bash
   mongod
   ```
   - Default runs on `localhost:27017`
   - Keep this window open while using the app

### Option B: MongoDB Atlas (Cloud-Based)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelator
   ```

---

## Step 3: Start the Backend Server

In the project directory, run:

```bash
npm run dev
```

Or for production:

```bash
npm start
```

### Expected Output:

```
✓ Server running on port 3000

📱 Access from this device: http://localhost:3000
📱 Access from other devices on network:
   http://192.168.x.x:3000
   http://10.0.x.x:3000
   (exact IPs depend on your network)
```

---

## Step 4: Access from Other Devices

### From the Same Computer:
- Open browser and go to: `http://localhost:3000`
- Open `index.html` directly (login/signup will work offline with local auth)

### From Another Device on the Same WiFi/Network:

1. **Find your computer's IP address** (from the server output above)
2. On the other device, open browser and go to:
   ```
   http://<YOUR_COMPUTER_IP>:3000
   ```
   
   Example: `http://192.168.1.100:3000`

### From Mobile Phone on Same Network:

1. Open browser on your phone
2. Go to: `http://<YOUR_COMPUTER_IP>:3000`
3. Allow microphone permissions when prompted
4. Log in or create account
5. Use translator with voice input feature

---

## Features Available

### ✅ Login & Signup
- Create accounts (stored in local browser or MongoDB)
- Login with any email (offline demo mode if API is down)

### ✅ Dashboard
- View bookings and trips
- Access translator, flights, hotels, zones

### ✅ Translator (translates.html)
- **Text Translation**: Auto-translates with Azure API or fallback dictionary
- **Voice Input**: Click mic button to speak, auto-translates on stop
- **Supported Languages**:
  - Hindi (हिन्दी) - hi-IN
  - English - en-US
  - Spanish (Español) - es-ES
  - French (Français) - fr-FR
  - German (Deutsch) - de-DE
  - Italian (Italiano) - it-IT
  - Russian (Русский) - ru-RU

### ✅ Hotel & Flight Booking
- Browse and book hotels and flights
- Save bookings to local storage

### ✅ Zone Alerts
- Set price, weather, security, and event alerts

---

## Troubleshooting

### ❌ "Failed to fetch" or Connection Refused

**Problem**: Can't access from another device
- **Solution 1**: Verify port 3000 is not blocked by firewall
  - Windows Defender Firewall → Allow Node.js through firewall
  - Or add port 3000 exception
  
- **Solution 2**: Use correct IP address
  - Run `ipconfig` in PowerShell
  - Look for "IPv4 Address" under your network adapter
  - Use that IP address, not the computer name

- **Solution 3**: Restart server
  ```bash
  # Kill the server (Ctrl+C), wait 2 seconds, then:
  npm run dev
  ```

### ❌ "MongoDB connection refused"

**Problem**: Backend can't connect to MongoDB
- **Solution 1**: Make sure MongoDB is running
  ```bash
  mongod
  ```
  
- **Solution 2**: Check connection string in `.env`
  ```
  MONGODB_URI=mongodb://127.0.0.1:27017/travelator
  ```

- **Solution 3**: If using remote MongoDB, verify internet connection

### ❌ Port 3000 Already in Use

**Problem**: `EADDRINUSE: address already in use :::3000`
- **Solution**: Kill the process using port 3000
  ```bash
  netstat -ano | findstr :3000
  taskkill /F /PID <PID_NUMBER>
  ```

### ❌ Microphone Not Working on Voice Input

**Problem**: "Microphone permission blocked"
- **Solution 1**: Allow microphone in browser settings
- **Solution 2**: Check browser support (Chrome/Edge have best support)
- **Solution 3**: Use HTTPS for production (localhost is exempt)

### ❌ Translation Not Working

**Problem**: "Translation failed" or no translation appears
- **Solution 1**: Check Azure Translator API key in `.env`
- **Solution 2**: Fallback dictionary will still translate common phrases
- **Solution 3**: Check internet connection for API access

---

## Configuration

### Environment Variables (.env)

```
PORT=3000                                    # Server port
MONGODB_URI=mongodb://127.0.0.1:27017/travelator  # MongoDB connection
NODE_ENV=development                        # development or production
JWT_SECRET=your_secret_here                 # For authentication
JWT_EXPIRE=7d                               # Token expiration
AZURE_TRANSLATOR_KEY=your_key_here         # Translation API key (optional)
AZURE_TRANSLATOR_REGION=centralindia       # Region for translator
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
```

---

## Performance Notes

- **Local Network Access**: Best performance for same-network devices
- **Internet Access**: Not recommended without proper HTTPS/security setup
- **Voice Recognition**: Best results with Chrome or Edge browsers
- **MongoDB**: Local instance is faster than cloud for typical usage

---

## Security Notes for Production

When deploying to production:

1. **Use HTTPS** instead of HTTP
2. **Enable Authentication** in MongoDB
3. **Set Strong JWT_SECRET**
4. **Use Environment Variables** - never hardcode secrets
5. **Enable CORS** properly (currently allows all origins for demo)
6. **Add Rate Limiting** to API endpoints
7. **Validate & Sanitize** all inputs

For now, this setup is ideal for **local development** and **small network testing**.

---

## Support

For issues:
1. Check browser console (F12)
2. Check server terminal for error messages
3. Verify MongoDB is running
4. Verify firewall isn't blocking port 3000
5. Verify correct IP address is being used

---

**Happy traveling with Travelator! ✈️🌍**
