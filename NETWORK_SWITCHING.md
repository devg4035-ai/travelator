# 🌐 Travelator - Network Switching Guide

Your website now automatically adapts when you change networks!

---

## ✨ What Changed

Your website now includes **automatic network detection and switching** that handles:
- ✅ Switching from WiFi to mobile hotspot
- ✅ Connecting to different routers
- ✅ Moving between VPNs
- ✅ Going offline and coming back online
- ✅ Changing device networks while app is running

---

## 🚀 How It Works

### Network-Aware API Configuration (`js/api-config.js`)

The new system:
1. **Detects your network context** - How you accessed the website (localhost, IP, domain)
2. **Adapts the API URL** - Automatically uses the correct backend server address
3. **Monitors connection** - Checks every 30 seconds if backend is reachable
4. **Retries on failure** - Up to 3 automatic retries with backoff
5. **Detects changes** - Notices when you switch networks and re-detects the API

---

## 📱 Access from Any Network

### Scenario 1: Same WiFi Network (Original Setup)
```
Home WiFi:
- Your computer: http://192.168.0.177:3000
- Your phone: http://192.168.0.177:3000
- Both see same server ✅
```

### Scenario 2: Different WiFi Networks
```
Your home WiFi: 192.168.0.177
Friend's WiFi: 192.168.1.100

On your phone at friend's house:
1. Phone connects to friend's WiFi
2. API config auto-detects new network
3. Looks for backend on new network (192.168.1.100:3000)
4. Finds it and continues working ✅
```

### Scenario 3: Mobile Hotspot
```
Your phone becomes hotspot:
- Desktop connects to mobile hotspot
- Desktop runs Travelator
- Phone accesses Travelator via http://192.168.x.x:3000
- API config detects hotspot network ✅
```

### Scenario 4: Offline → Online Transitions
```
No WiFi → Connects to WiFi:
- App uses offline mode (localStorage, local auth)
- Detects WiFi available
- Automatically finds and reconnects to backend ✅
```

---

## 🔧 Technical Details

### API Base Detection Priority

The system tries methods in this order:

1. **File Protocol** (`file://index.html`)
   - Assumes localhost: `http://localhost:3000`

2. **Same Port 3000** (Accessed via port 3000)
   - Uses same-origin: `http://` + current host

3. **Different Port** (Accessed via port 8080, 5000, etc)
   - Uses IP with 3000: `http://192.168.x.x:3000`

### Health Checks

Every 30 seconds:
- Pings the backend API
- If unreachable, logs warning
- Automatically recalculates API base
- Notifies app of connection changes

### Automatic Retries

On network errors:
1. Waits 1 second, retries (attempt 1/3)
2. Waits 2 seconds, retries (attempt 2/3)
3. Waits 3 seconds, retries (attempt 3/3)
4. If all fail, shows error to user

---

## 🎯 Usage Examples

### Example 1: Working from Multiple Locations

**Morning - Home WiFi:**
```
1. Start your computer with backend server
2. Open http://localhost:3000 on browser
3. Login, use translator, everything works
```

**Afternoon - Moved to Coffee Shop:**
```
1. Your phone is now hotspot (IP: 192.168.x.x)
2. You open Travelator on your laptop
3. API config automatically finds hotspot IP
4. Everything continues working, no manual changes needed
```

**Evening - Back Home on Same WiFi:**
```
1. No changes needed - API config detects home WiFi IP
2. Everything works same as morning
```

### Example 2: Shared Network Access

**You (Host):**
```
Running server: npm run dev
Network: 192.168.0.177
URL: http://192.168.0.177:3000
```

**Friend on Same Network:**
```
Opens: http://192.168.0.177:3000
API config detects your IP
Works immediately without any setup
```

**Friend Joins Different Network Later:**
```
Original URL (192.168.0.177:3000) stops working
Friend switches networks
API config recalculates and finds your server (if connected to same new network)
Or shows "API unavailable" if on completely different network
```

---

## ⚠️ Important Notes

### When Network Switching Works ✅
- Both devices are on **same physical/WiFi network**
- Backend server is running on the target network
- No firewall blocking port 3000

### When It Won't Work ❌
- Devices on **different networks** that can't reach each other
- Backend server not running or offline
- Corporate firewall blocking port 3000
- VPN restrictions preventing connections

### Requirements for Multi-Network Access

**For your computer hosting the server:**
1. Backend running: `npm run dev`
2. MongoDB running: `mongod` (in separate terminal)
3. Port 3000 accessible (check firewall)

**For devices accessing the website:**
1. Connected to same network as server
2. Know the server's IP address (shown in server terminal)
3. Use Chrome/Edge for best compatibility
4. JavaScript enabled in browser

---

## 🔍 Debugging Network Issues

### Check API Configuration

Open browser DevTools (F12) → Console → Type:
```javascript
// See current API base
console.log('API Base:', apiConfig.getAPIBase());

// See if online
console.log('Is Online:', apiConfig.isOnline);

// Test health
apiConfig.testAPIHealth().then(isHealthy => {
    console.log('API Healthy:', isHealthy);
});
```

### View Network Events

In Console, you'll see logs like:
```
[API Config] File protocol detected, using localhost
[API Config] API health check failed
[API Config] Network changed, updating API base
[API Config] Device is online
```

---

## 📊 Network Switching Flow

```
Device connects to page
         ↓
API Config detects protocol/hostname/port
         ↓
Calculates API base URL
         ↓
Every 30 seconds: Check if API is healthy
         ↓
Device goes offline → Triggers "offline" mode
         ↓
Device comes back online → Auto-detects network
         ↓
Re-verifies API is reachable
         ↓
Continues working
```

---

## 🎯 Best Practices

1. **Always have server running** before accessing on other devices
2. **Check firewall** - Allow Node.js through Windows Defender
3. **Use consistent network** - Best results on stable WiFi
4. **Monitor server logs** - Look for connection messages
5. **Test locally first** - Verify `http://localhost:3000` works
6. **Use device IP** - Not computer name for remote access

---

## 🚨 Common Issues & Solutions

### "API unavailable" after switching WiFi

**Cause:** New network has different IP range
**Solution:** 
- Ensure both devices on same new WiFi
- Check server is still running
- Restart browser tab if needed

### Phone can't reach server on new hotspot

**Cause:** Hotspot has different IP subnet
**Solution:**
- Make sure phone hotspot is running
- Connect desktop to hotspot
- Restart backend: `npm run dev`
- Phone should auto-detect and reconnect

### Works on home WiFi but not at office

**Cause:** Office network isolation or firewall
**Solution:**
- Check if port 3000 is blocked
- Try different network if available
- Use fallback local auth (still works offline)

### "Failed to fetch" errors appearing randomly

**Cause:** Possible network flakiness
**Solution:**
- Check server logs for crashes
- Verify MongoDB still running
- Restart backend: `npm run dev`
- API config will retry automatically

---

## 🎓 How to Test Network Switching

### Test 1: Same Network
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Open on same device
http://localhost:3000

# On phone/tablet (same WiFi):
http://192.168.0.177:3000  # Should work
```

### Test 2: Hotspot Switching
```bash
# Terminal 1: Start server on laptop
npm run dev

# Phone becomes hotspot, laptop connects to it
# Laptop now on new network (192.168.x.x)

# On tablet connected to phone hotspot:
http://192.168.x.x:3000  # Should work via new IP
```

### Test 3: Offline Detection
```bash
# Have the app open
# Disconnect WiFi (device goes offline)
# Notice console logs: "[API Config] Device is offline"
# Reconnect WiFi
# Notice console logs: "[API Config] Device is online"
# App automatically reconnects
```

---

## ✅ Summary

Your website now:
- 🌐 Works on any device connected to the same network
- 🔄 Automatically handles network switches
- 📡 Detects when backend is unavailable
- 🔁 Retries failed connections 3 times
- 📱 Adapts to WiFi, hotspot, VPN changes
- 💾 Falls back to offline mode when needed

**Start testing on different networks! 🎉**
