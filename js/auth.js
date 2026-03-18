// Authentication System
class AuthenticationManager {
    constructor() {
        // Default admin credentials (stored in localStorage keys below if modified)
        this.defaultAdminEmail = localStorage.getItem('travelator_default_admin_email') || 'demo@travelator.com';
        this.defaultAdminPassword = localStorage.getItem('travelator_default_admin_password') || 'password123';

        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.maxLoginAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        this.sessionTimeout = 60 * 60 * 1000; // 1 hour

        // Ensure there is an admin/default user present with the configured credentials
        this.ensureAdminUser();
    }

    // Load users from localStorage
    loadUsers() {
        const storedUsers = localStorage.getItem('travelator_users');
        return storedUsers ? JSON.parse(storedUsers) : this.getDefaultUsers();
    }

    // Get default demo users
    getDefaultUsers() {
        return [
            {
                id: 1,
                fullName: 'John Doe',
                email: 'demo@travelator.com',
                password: this.hashPassword('password123'),
                phone: '+1 (555) 123-4567',
                createdAt: new Date().toISOString(),
                preferences: {
                    hotelType: 'luxury',
                    directFlights: true,
                    notifications: true
                }
            },
            {
                id: 2,
                fullName: 'Jane Smith',
                email: 'jane@travelator.com',
                password: this.hashPassword('password456'),
                phone: '+1 (555) 987-6543',
                createdAt: new Date().toISOString(),
                preferences: {
                    hotelType: 'comfort',
                    directFlights: false,
                    notifications: true
                }
            }
        ];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('travelator_users', JSON.stringify(this.users));
    }

    // Ensure admin/default user exists and matches configured credentials
    ensureAdminUser() {
        const email = this.defaultAdminEmail.toLowerCase();
        let user = this.users.find(u => u.email === email);
        if (user) {
            // Update password to match configured default (useful when changing credentials)
            user.password = this.hashPassword(this.defaultAdminPassword);
        } else {
            const newUser = {
                id: Math.max(...this.users.map(u => u.id), 0) + 1,
                fullName: 'Demo Admin',
                email: email,
                password: this.hashPassword(this.defaultAdminPassword),
                phone: '',
                createdAt: new Date().toISOString(),
                preferences: {
                    hotelType: 'luxury',
                    directFlights: true,
                    notifications: true
                }
            };
            this.users.push(newUser);
        }
        this.saveUsers();
    }

    // Update the default admin credentials and persist them; ensures the admin user is updated/created
    setDefaultAdmin(email, password) {
        if (!email || !password) return { success: false, message: 'Email and password required' };
        localStorage.setItem('travelator_default_admin_email', String(email).toLowerCase());
        localStorage.setItem('travelator_default_admin_password', String(password));
        this.defaultAdminEmail = String(email).toLowerCase();
        this.defaultAdminPassword = String(password);
        this.ensureAdminUser();
        return { success: true, message: 'Default admin updated' };
    }

    // Simple hash function (for demo - use bcrypt in production)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
    }

    // Validate password strength
    validatePasswordStrength(password) {
        const requirements = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecial: /[!@#$%^&*]/.test(password)
        };

        const strength = Object.values(requirements).filter(Boolean).length;
        return {
            isValid: password.length >= 8,
            strength: strength,
            requirements: requirements
        };
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Register new user
    registerUser(fullName, email, password, confirmPassword) {
        // Validate inputs
        if (!fullName || !email || !password || !confirmPassword) {
            return {
                success: false,
                message: 'All fields are required'
            };
        }

        if (!this.validateEmail(email)) {
            return {
                success: false,
                message: 'Invalid email format'
            };
        }

        if (password !== confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match'
            };
        }

        const strengthCheck = this.validatePasswordStrength(password);
        if (!strengthCheck.isValid) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long'
            };
        }

        // Check if user already exists
        if (this.users.some(u => u.email === email)) {
            return {
                success: false,
                message: 'Email already registered'
            };
        }

        // Create new user
        const newUser = {
            id: Math.max(...this.users.map(u => u.id), 0) + 1,
            fullName: fullName,
            email: email,
            password: this.hashPassword(password),
            phone: '',
            createdAt: new Date().toISOString(),
            preferences: {
                hotelType: 'comfort',
                directFlights: true,
                notifications: true
            }
        };

        this.users.push(newUser);
        this.saveUsers();

        return {
            success: true,
            message: 'Account created successfully!'
        };
    }

    // Login user - accepts any valid email
    login(email, password, rememberMe) {
        // Validate inputs
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required'
            };
        }

        // Validate email format
        if (!this.validateEmail(email)) {
            return {
                success: false,
                message: 'Please enter a valid email address'
            };
        }

        // Validate password is not empty
        if (password.trim() === '') {
            return {
                success: false,
                message: 'Password is required'
            };
        }

        // Clear any existing lockout (allows login with any valid email)
        const lockoutKey = `login_lockout_${email}`;
        localStorage.removeItem(lockoutKey);

        // Create session for any valid email with password provided
        // Extract name from email if available, otherwise use generic name
        const emailParts = email.split('@');
        const nameFromEmail = emailParts[0]
            .replace(/[._-]/g, ' ')
            .split(' ')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');

        const session = {
            userId: Math.random().toString(36).substr(2, 9), // Generate random user ID
            email: email,
            fullName: nameFromEmail || 'Traveler',
            loginTime: Date.now(),
            rememberMe: rememberMe,
            sessionTimeout: Date.now() + this.sessionTimeout
        };

        localStorage.setItem('travelator_session', JSON.stringify(session));
        this.currentUser = session;

        return {
            success: true,
            message: 'Login successful!',
            user: {
                id: session.userId,
                fullName: session.fullName,
                email: email
            }
        };
    }

    // Record failed login attempt
    recordFailedLogin(email) {
        const lockoutKey = `login_lockout_${email}`;
        const lockoutData = localStorage.getItem(lockoutKey);
        
        let data = lockoutData ? JSON.parse(lockoutData) : { timestamp: Date.now(), attempts: 0 };
        data.attempts += 1;

        if (data.attempts >= this.maxLoginAttempts) {
            data.timestamp = Date.now(); // Reset timer on lockout
        }

        localStorage.setItem(lockoutKey, JSON.stringify(data));
    }

    // Load current user session
    loadCurrentUser() {
        const session = localStorage.getItem('travelator_session');
        if (!session) return null;

        const sessionData = JSON.parse(session);
        
        // Check if session expired
        if (sessionData.sessionTimeout < Date.now()) {
            this.logout();
            return null;
        }

        return sessionData;
    }

    // Logout user
    logout() {
        localStorage.removeItem('travelator_session');
        this.currentUser = null;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get current user info
    getCurrentUser() {
        if (!this.currentUser) return null;

        const user = this.users.find(u => u.id === this.currentUser.userId);
        return user ? {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            preferences: user.preferences
        } : null;
    }

    // Update user profile
    updateProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        const user = this.users[userIndex];
        
        if (updates.fullName) user.fullName = updates.fullName;
        if (updates.phone) user.phone = updates.phone;
        if (updates.preferences) user.preferences = { ...user.preferences, ...updates.preferences };

        this.saveUsers();
        
        return {
            success: true,
            message: 'Profile updated successfully',
            user: user
        };
    }

    // Change password
    changePassword(userId, oldPassword, newPassword, confirmPassword) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        if (user.password !== this.hashPassword(oldPassword)) {
            return {
                success: false,
                message: 'Current password is incorrect'
            };
        }

        if (newPassword !== confirmPassword) {
            return {
                success: false,
                message: 'New passwords do not match'
            };
        }

        const strengthCheck = this.validatePasswordStrength(newPassword);
        if (!strengthCheck.isValid) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long'
            };
        }

        user.password = this.hashPassword(newPassword);
        this.saveUsers();

        return {
            success: true,
            message: 'Password changed successfully'
        };
    }

    // Password reset (send email in production)
    requestPasswordReset(email) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            return {
                success: false,
                message: 'Email not found'
            };
        }

        // In production, send email with reset link
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const resetData = {
            email: email,
            token: resetToken,
            timestamp: Date.now(),
            expiry: Date.now() + 30 * 60 * 1000 // 30 minutes
        };

        localStorage.setItem(`password_reset_${email}`, JSON.stringify(resetData));

        return {
            success: true,
            message: 'Password reset link sent to email',
            token: resetToken // In production, this would be in email
        };
    }

    // Get user by email
    getUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }

    // Get all users (admin function)
    getAllUsers() {
        return this.users.map(u => ({
            id: u.id,
            fullName: u.fullName,
            email: u.email,
            phone: u.phone,
            createdAt: u.createdAt
        }));
    }
}

// Create global instance
const authManager = new AuthenticationManager();
