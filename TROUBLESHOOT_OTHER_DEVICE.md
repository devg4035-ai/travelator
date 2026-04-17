# 🔧 Troubleshooting: Can't Access Website on Other Devices

Your server is running on port 5000, but you can't access it from other devices. Here's the fix:

---

## 🔴 Issue #1: Windows Firewall Blocking Port 5000

This is the **most common reason** other devices can't reach your server.

### Fix: Allow Node.js Through Firewall

**Option A: Using Windows Defender Firewall GUI (Easiest)**

1. Open **Windows Defender Firewall** (Search in Windows)
2. Click **"Allow an app through firewall"**
3. Click **"Change settings"** (top-right)
4. Click **"Allow another app..."**
5. Find **"node.exe"** or **"NodeJS"** in your program files
   - Usually at: `C:\Program Files\nodejs\node.exe`
6. Select it and click **"Add"**
7. Make sure it's checked for both **Private** and **Public**
8. Click **OK**

**Option B: Using PowerShell (Fast)**

1. Open PowerShell as Administrator
2. Run:
```powershell
New-NetFirewallRule -DisplayName "Node.js Port 5000" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5000
```
3. Close PowerShell

**Option C: Disable Firewall (Testing Only - NOT RECOMMENDED)**

```powershell
# Disable firewall temporarily
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled $false

# Re-enable it later
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled $true
```

---

## 🔴 Issue #2: Other Device Not on Same Network

Your device trying to access might not be on the same WiFi network.

### Fix: Connect to Same Network

1. **On your computer**: Note the WiFi network name (SSID)
2. **On other device**: Connect to the exact same WiFi network
3. **Verify**: Both devices should show the same WiFi name

### Quick Test:
```
On your computer:
- Open Command Prompt
- Run: ipconfig
- Look for IPv4 Address (e.g., 192.168.x.x)

On other device:
- Make sure it's on same WiFi
- Should be able to ping your computer's IP
```

---

## 🔴 Issue #3: Browser Caching Old Port 3000

Your browser might still have port 3000 cached.

### Fix: Clear Cache & Try Again

1. Open browser and press **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
2. Clear **Browsing Data**
3. Try accessing `http://YOUR_IP:5000` again

---

## ✅ Step-by-Step Testing

### Step 1: Verify Server is Running

On your computer, open PowerShell and run:
```powershell
netstat -ano | findstr LISTENING | findstr :5000
```

Should show a process listening on port 5000. ✅

### Step 2: Access Locally

On your computer, open browser and try:
- `http://localhost:5000` ✅ Should work
- `http://127.0.0.1:5000` ✅ Should work

### Step 3: Get Your Computer's IP

```powershell
ipconfig
```

Look for line: `IPv4 Address. . . . . . . . . : 192.168.x.x`

Copy that IP address (e.g., `192.168.0.177`)

### Step 4: Test From Other Device

1. Make sure other device is on **same WiFi network**
2. Open browser on other device
3. Type: `http://192.168.0.177:5000` (use YOUR actual IP)
4. Press Enter

Should see Travelator login page ✅

### Step 5: If Still Not Working

Try these checks:

**Check 1: Ping Test**
```
On other device:
- Open Command Prompt
- Run: ping 192.168.0.177
- Should see replies (not timeout)
```

**Check 2: Port Test**
```powershell
# On your computer, in PowerShell:
Test-NetConnection -ComputerName 192.168.0.177 -Port 5000
```

**Check 3: Check Firewall Rules**
```powershell
Get-NetFirewallRule -DisplayName "*Node*" -Direction Inbound
```

Should show the rule we added.

---

## 🎯 Complete Access Checklist

- [ ] Server running on port 5000 (netstat shows it)
- [ ] Port 5000 firewall rule added (Allow Node.js)
- [ ] Both devices on same WiFi network
- [ ] Can access http://YOUR_IP:5000 from local computer
- [ ] Browser cache cleared
- [ ] Other device can ping your computer's IP
- [ ] Other device can reach port 5000 (Test-NetConnection passes)

---

## 📱 Access Instructions (Once Working)

**From your computer:**
```
http://localhost:5000
http://127.0.0.1:5000
```

**From phone/tablet on same WiFi:**
```
http://192.168.0.177:5000  (replace with YOUR IP)
OR
http://192.168.56.1:5000   (if that's your IP)
```

---

## 🚀 Quick Fix Command

If you want to quickly allow port 5000 through firewall, copy-paste this in PowerShell as Administrator:

```powershell
New-NetFirewallRule -DisplayName "Node.js Travelator Port 5000" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5000 -RemoteAddress Any
```

---

## 🆘 If Still Having Issues

**Check server logs for errors:**
```
Look at the terminal running npm run dev
- Any errors?
- Does it show "✓ Server running on port 5000"?
```

**Browser console errors:**
1. Open browser on other device
2. Press F12 (or Ctrl+Shift+I)
3. Go to "Console" tab
4. Look for red error messages
5. Take a screenshot and share

**Network isolation:**
- Some corporate networks or guest WiFi prevents device-to-device communication
- Try connecting to different WiFi network (like a hotspot) to test

---

## ✅ Server Status

**Current:**
- Port: 5000 ✓
- MongoDB: Connected ✓
- Firewall: **MIGHT BE BLOCKING** ← This is likely your issue

**Next Step:**
1. Add firewall rule (use PowerShell command above)
2. Restart browser on other device
3. Try `http://YOUR_IP:5000` again

**Let me know if this fixes it! 🎉**
