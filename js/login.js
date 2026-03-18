// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const resetForm = document.getElementById('resetForm');
    const signupPassword = document.getElementById('signupPassword');
    const authToggleLinks = document.querySelectorAll('.auth-toggle-link');

    // Initialize password strength indicator
    if (signupPassword) {
        signupPassword.addEventListener('input', updatePasswordStrength);
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Handle password reset form submission
    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
    }

    // Handle form toggling
    authToggleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-form');
            switchAuthForm(targetForm);
        });
    });

    // Check if user is already logged in
    if (authManager.isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
});

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }

    // Attempt login
    const result = authManager.login(email, password, rememberMe);

    if (result.success) {
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Register user
    const result = authManager.registerUser(fullName, email, password, confirmPassword);

    if (result.success) {
        showAlert(result.message + ' Logging you in...', 'success');
        
        // Clear form
        document.getElementById('signupForm').reset();
        
        // Auto-login after signup
        setTimeout(() => {
            const loginResult = authManager.login(email, password, false);
            if (loginResult.success) {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
}

// Handle password reset
function handlePasswordReset(e) {
    e.preventDefault();

    const email = document.getElementById('resetEmail').value.trim();

    if (!email) {
        showAlert('Please enter your email address', 'error');
        return;
    }

    const result = authManager.requestPasswordReset(email);

    if (result.success) {
        showAlert('Password reset link has been sent to your email! (Demo: ' + result.token.substring(0, 8) + '...)', 'success');
        
        // Clear form
        setTimeout(() => {
            document.getElementById('resetForm').reset();
            switchAuthForm('login');
        }, 2000);
    } else {
        showAlert(result.message, 'error');
    }
}

// Update password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthDiv.innerHTML = '';
        return;
    }

    const strengthCheck = authManager.validatePasswordStrength(password);
    const strength = strengthCheck.strength;
    
    let strengthText = '';
    let strengthClass = '';
    
    if (strength === 0) {
        strengthText = 'Very Weak';
        strengthClass = 'weak';
    } else if (strength === 1 || strength === 2) {
        strengthText = 'Weak';
        strengthClass = 'weak';
    } else if (strength === 3) {
        strengthText = 'Fair';
        strengthClass = 'fair';
    } else if (strength === 4) {
        strengthText = 'Strong';
        strengthClass = 'strong';
    } else {
        strengthText = 'Very Strong';
        strengthClass = 'very-strong';
    }

    let requirementsHtml = '<div class="requirements">';
    const req = strengthCheck.requirements;
    
    requirementsHtml += `<span class="req-item ${req.minLength ? 'met' : 'unmet'}">✓ At least 8 characters</span>`;
    requirementsHtml += `<span class="req-item ${req.hasUppercase ? 'met' : 'unmet'}">✓ Uppercase letter</span>`;
    requirementsHtml += `<span class="req-item ${req.hasLowercase ? 'met' : 'unmet'}">✓ Lowercase letter</span>`;
    requirementsHtml += `<span class="req-item ${req.hasNumbers ? 'met' : 'unmet'}">✓ Number</span>`;
    requirementsHtml += `<span class="req-item ${req.hasSpecial ? 'met' : 'unmet'}">✓ Special character (!@#$%^&*)</span>`;
    requirementsHtml += '</div>';

    strengthDiv.innerHTML = `<div class="strength-bar"><div class="strength-fill ${strengthClass}" style="width: ${(strength / 5) * 100}%"></div></div><span class="strength-text ${strengthClass}">${strengthText}</span>${requirementsHtml}`;
}

// Switch between auth forms
function switchAuthForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const resetForm = document.getElementById('resetForm');
    const authToggle = document.getElementById('authToggle');
    const loginToggle = document.getElementById('loginToggle');

    // Hide all forms
    if (loginForm) loginForm.classList.remove('active');
    if (signupForm) signupForm.classList.remove('active');
    if (resetForm) resetForm.classList.remove('active');

    // Show selected form
    if (formType === 'login') {
        if (loginForm) loginForm.classList.add('active');
        authToggle.style.display = 'block';
        loginToggle.style.display = 'none';
    } else if (formType === 'signup') {
        if (signupForm) signupForm.classList.add('active');
        authToggle.style.display = 'none';
        loginToggle.style.display = 'block';
    } else if (formType === 'reset') {
        if (resetForm) resetForm.classList.add('active');
        authToggle.style.display = 'none';
        loginToggle.style.display = 'block';
    }

    // Scroll to top
    document.querySelector('.login-card').scrollTop = 0;
}

// Show alerts
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${getAlertIcon(type)}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Get alert icon
function getAlertIcon(type) {
    const icons = {
        'success': '✓',
        'error': '✕',
        'info': 'ℹ',
        'warning': '⚠'
    };
    return icons[type] || 'ℹ';
}

// Handle forgot password link click
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('reset');
        });
    }
});
