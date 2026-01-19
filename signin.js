// ===== SIGN IN PAGE JAVASCRIPT =====

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupForms();
});

// Setup tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.signin-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active-form'));

            // Add active class to clicked button and corresponding form
            button.classList.add('active');
            document.querySelector(`.signin-form[data-tab="${tabName}"]`).classList.add('active-form');
        });
    });
}

// Setup forms
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate fields
    if (!email || !password) {
        showNotification('Please enter email and password', 'error');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Get registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone
        }));

        if (rememberMe) {
            localStorage.setItem('rememberUser', JSON.stringify({
                email: user.email,
                name: user.name
            }));
        }

        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'my-bookings.html';
        }, 1500);
    } else {
        // Demo login - for testing purposes
        localStorage.setItem('currentUser', JSON.stringify({
            name: 'Guest User',
            email: email
        }));

        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'my-bookings.html';
        }, 1500);
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const terms = document.getElementById('regTerms').checked;

    // Validate fields
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }

    // Validate password
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (!terms) {
        showNotification('Please agree to the terms and conditions', 'error');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (users.some(u => u.email === email)) {
        showNotification('Email already registered. Please log in or use a different email.', 'error');
        return;
    }

    // Register user
    const newUser = {
        id: 'USER' + Date.now(),
        name,
        email,
        phone,
        password, // In real app, this should be hashed
        registeredDate: new Date().toLocaleString()
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Save current user
    localStorage.setItem('currentUser', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
    }));

    showNotification('Account created successfully! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'my-bookings.html';
    }, 1500);
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.currentTarget.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Continue as guest
function continueAsGuest() {
    localStorage.removeItem('currentUser');
    window.location.href = 'rooms.html';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Pre-fill login if user was remembered
window.addEventListener('load', () => {
    const remembered = localStorage.getItem('rememberUser');
    if (remembered) {
        const user = JSON.parse(remembered);
        document.getElementById('loginEmail').value = user.email;
        document.getElementById('rememberMe').checked = true;
    }
});
