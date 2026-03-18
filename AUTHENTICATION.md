# Travelator - Enhanced Login System Documentation

## 🔐 Authentication System Overview

The Travelator app now includes a comprehensive authentication system with user registration, login, password reset, and session management.

---

## 📋 Features

### User Authentication
- ✅ Secure login system with email/password
- ✅ User registration with email validation
- ✅ Password strength checking
- ✅ "Remember me" functionality
- ✅ Password reset via email link (demo)

### Security Features
- ✅ Account lockout after failed attempts (5 attempts = 15 min lockout)
- ✅ Session timeout (1 hour of inactivity)
- ✅ Password hashing (SHA-256 in demo, bcrypt recommended for production)
- ✅ Login attempt tracking
- ✅ Email format validation

### User Management
- ✅ User profile management
- ✅ Password change functionality
- ✅ Travel preferences storage
- ✅ Phone number storage
- ✅ Account creation timestamp

---

## 🔑 Demo Accounts

Pre-configured demo accounts for testing:

| Email | Password | Name |
|-------|----------|------|
| demo@travelator.com | password123 | Demo User |
| jane@travelator.com | password456 | Jane Smith |

---

## 🚀 How to Use

### Login
1. Open `index.html` in your browser
2. Enter your email and password
3. Click "Login" or press Enter
4. (Optional) Check "Remember me" to stay logged in

### Create Account
1. Click "Sign up here" link
2. Fill in your full name, email, and password
3. Confirm your password
4. Click "Create Account"
5. You'll be automatically logged in

### Reset Password
1. Click "Forgot Password?" link on login page
2. Enter your registered email
3. You'll receive a reset link (demo: shows token in alert)

---

## 💻 File Structure

### New/Modified Files
```
js/
├── auth.js          # Main authentication system
├── login.js         # Login page logic
└── dashboard.js     # Updated to use auth system

index.html          # Enhanced with signup/reset forms
```

---

## 🔧 Authentication Class Reference

### AuthenticationManager

The main authentication class handling all auth operations.

#### Constructor
```javascript
const authManager = new AuthenticationManager();
```

#### Methods

##### `registerUser(fullName, email, password, confirmPassword)`
Create a new user account.

**Parameters:**
- `fullName` (string) - User's full name
- `email` (string) - User's email address
- `password` (string) - Password (minimum 8 characters)
- `confirmPassword` (string) - Password confirmation

**Returns:**
```javascript
{
    success: boolean,
    message: string
}
```

**Example:**
```javascript
const result = authManager.registerUser(
    'John Doe',
    'john@example.com',
    'SecurePass123!',
    'SecurePass123!'
);

if (result.success) {
    console.log('Account created!');
} else {
    console.log('Error:', result.message);
}
```

---

##### `login(email, password, rememberMe)`
Authenticate a user and create a session.

**Parameters:**
- `email` (string) - User's email
- `password` (string) - User's password
- `rememberMe` (boolean) - Keep user logged in

**Returns:**
```javascript
{
    success: boolean,
    message: string,
    user: {
        id: number,
        fullName: string,
        email: string
    }
}
```

**Example:**
```javascript
const result = authManager.login('john@example.com', 'SecurePass123!', true);

if (result.success) {
    window.location.href = 'dashboard.html';
}
```

---

##### `logout()`
End the user's session.

**Example:**
```javascript
authManager.logout();
window.location.href = 'index.html';
```

---

##### `isAuthenticated()`
Check if a user is currently logged in.

**Returns:** `boolean`

**Example:**
```javascript
if (authManager.isAuthenticated()) {
    // User is logged in
} else {
    // Redirect to login
}
```

---

##### `getCurrentUser()`
Get the current authenticated user's information.

**Returns:**
```javascript
{
    id: number,
    fullName: string,
    email: string,
    phone: string,
    preferences: object
}
```

**Example:**
```javascript
const user = authManager.getCurrentUser();
console.log(`Welcome, ${user.fullName}!`);
```

---

##### `updateProfile(userId, updates)`
Update user profile information.

**Parameters:**
- `userId` (number) - User ID
- `updates` (object) - Fields to update (fullName, phone, preferences)

**Returns:**
```javascript
{
    success: boolean,
    message: string,
    user: object
}
```

**Example:**
```javascript
const result = authManager.updateProfile(1, {
    fullName: 'John Updated',
    phone: '+1 (555) 000-0000',
    preferences: { hotelType: 'luxury' }
});
```

---

##### `changePassword(userId, oldPassword, newPassword, confirmPassword)`
Change a user's password.

**Parameters:**
- `userId` (number) - User ID
- `oldPassword` (string) - Current password
- `newPassword` (string) - New password
- `confirmPassword` (string) - Confirmation

**Returns:**
```javascript
{
    success: boolean,
    message: string
}
```

---

##### `validatePasswordStrength(password)`
Check password strength and requirements.

**Returns:**
```javascript
{
    isValid: boolean,
    strength: number (0-5),
    requirements: {
        minLength: boolean,
        hasUppercase: boolean,
        hasLowercase: boolean,
        hasNumbers: boolean,
        hasSpecial: boolean
    }
}
```

---

##### `validateEmail(email)`
Validate email format.

**Returns:** `boolean`

---

##### `requestPasswordReset(email)`
Request a password reset for an email.

**Returns:**
```javascript
{
    success: boolean,
    message: string,
    token: string  // For demo only
}
```

---

##### `getAllUsers()`
Get list of all users (admin function).

**Returns:** Array of user objects

---

## 🔒 Password Requirements

Passwords must meet the following criteria:
- ✅ Minimum 8 characters long
- ✅ At least one uppercase letter
- ✅ At least one lowercase letter
- ✅ At least one number
- ✅ At least one special character (!@#$%^&*)

---

## 📊 Login Attempt Tracking

The system tracks failed login attempts:
- **5 failed attempts** = 15-minute account lockout
- **Automatic unlock** after lockout period expires
- **Clear counter** on successful login

---

## 💾 Data Storage

All user data is stored in browser's **LocalStorage**:
- `travelator_users` - User database (array)
- `travelator_session` - Current session data
- `login_lockout_[email]` - Lockout tracking per email

**Note:** This is for demo purposes. Use a backend database in production!

---

## 🔐 Session Management

### Session Timeout
- Default: 1 hour of inactivity
- After timeout: User must re-login
- Configurable in `auth.js` → `sessionTimeout`

### Remember Me
- Keeps user logged in when browser closes
- Session still expires after timeout period
- Stored in localStorage

---

## 🛠️ Customization

### Change Password Requirements
In `js/auth.js`, modify the `validatePasswordStrength()` method:

```javascript
validatePasswordStrength(password) {
    const requirements = {
        minLength: password.length >= 10,  // Change from 8 to 10
        hasUppercase: /[A-Z]/.test(password),
        // ... other requirements
    };
}
```

### Change Session Timeout
In `js/auth.js`, modify the constructor:

```javascript
this.sessionTimeout = 2 * 60 * 60 * 1000; // 2 hours instead of 1
```

### Change Lockout Duration
In `js/auth.js`, modify the constructor:

```javascript
this.lockoutDuration = 30 * 60 * 1000; // 30 minutes instead of 15
```

### Change Max Login Attempts
In `js/auth.js`, modify the constructor:

```javascript
this.maxLoginAttempts = 3; // 3 attempts instead of 5
```

---

## 🔌 Integration Guide

### Connecting to Backend API

To use a real backend instead of localStorage:

1. **Create API endpoints:**
   ```
   POST /api/auth/register
   POST /api/auth/login
   POST /api/auth/logout
   GET /api/auth/profile
   PUT /api/auth/profile
   POST /api/auth/change-password
   ```

2. **Update `js/auth.js`:**
   ```javascript
   registerUser(fullName, email, password, confirmPassword) {
       // Replace with API call
       return fetch('/api/auth/register', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
               fullName, email, password, confirmPassword
           })
       }).then(res => res.json());
   }
   ```

3. **Use JWT tokens:**
   ```javascript
   // Store JWT token instead of session object
   localStorage.setItem('travelator_token', jwtToken);
   ```

---

## 🧪 Testing

### Test Cases

1. **Valid Login**
   - Email: demo@travelator.com
   - Password: password123
   - Expected: Redirect to dashboard

2. **Invalid Password**
   - Email: demo@travelator.com
   - Password: wrongpassword
   - Expected: Error message + attempt count

3. **Account Lockout**
   - Try 5 failed logins
   - Expected: Lockout message

4. **New Registration**
   - Create new account with valid data
   - Expected: Auto-login and redirect

5. **Password Strength**
   - Try various passwords
   - Check strength indicator updates

---

## 🚨 Security Considerations

### For Production:

1. **Use bcrypt** instead of simple hash
2. **Implement SSL/TLS** for all auth endpoints
3. **Use JWT tokens** with expiration
4. **Enable 2FA** (Two-Factor Authentication)
5. **Rate limiting** on login attempts
6. **Email verification** for new accounts
7. **HTTPS only** for all auth requests
8. **CORS configuration** on backend
9. **Password hashing** with salt
10. **Audit logging** for auth events

---

## 📞 Troubleshooting

### Issue: Can't login with demo account
**Solution:** Make sure JavaScript is enabled in your browser

### Issue: Login page redirects to dashboard immediately
**Solution:** Clear browser cache and localStorage

### Issue: Password reset not working
**Solution:** Check browser console for errors. Demo shows token in alert.

### Issue: Session expires too quickly
**Solution:** Increase `sessionTimeout` in `js/auth.js`

### Issue: Account locked after 1 failed attempt
**Solution:** Check `maxLoginAttempts` setting in `js/auth.js`

---

## 📝 API Response Examples

### Successful Registration
```json
{
    "success": true,
    "message": "Account created successfully!"
}
```

### Successful Login
```json
{
    "success": true,
    "message": "Login successful!",
    "user": {
        "id": 1,
        "fullName": "John Doe",
        "email": "john@example.com"
    }
}
```

### Error Response
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

## 🎯 Next Steps

1. ✅ Test the login system with demo accounts
2. ✅ Create your own account
3. ✅ Test password reset functionality
4. ✅ Verify session timeout works
5. ✅ Plan backend integration
6. ✅ Implement production security measures

---

## 📚 Related Files

- `index.html` - Login, signup, and password reset pages
- `js/auth.js` - Authentication system
- `js/login.js` - Login page interaction
- `js/dashboard.js` - Dashboard integration
- `css/style.css` - Login page styling

---

**Version:** 1.1.0  
**Last Updated:** January 2026  
**Status:** Enhanced & Production-Ready for Demo

---

For more information, see the main [README.md](README.md) file.
