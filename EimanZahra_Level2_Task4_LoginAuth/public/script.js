// API Base URL
const API_BASE = '/api';

// Helper function to show error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Helper function to hide error
function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Store token in localStorage
function storeToken(token) {
    localStorage.setItem('authToken', token);
}

// Get token from localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Remove token
function removeToken() {
    localStorage.removeItem('authToken');
}

// Check if user is authenticated
async function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    
    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.success;
    } catch {
        return false;
    }
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Client-side validation
        if (password !== confirmPassword) {
            showError('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            showError('Password must be at least 6 characters long!');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password, confirmPassword })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token
                storeToken(data.token);
                // Redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError('Network error. Please try again.');
        }
    });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token
                storeToken(data.token);
                // Redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError('Network error. Please try again.');
        }
    });
}

// Dashboard page
if (window.location.pathname === '/dashboard') {
    // Check authentication
    (async () => {
        const token = getToken();
        if (!token) {
            window.location.href = '/login';
            return;
        }
        
        try {
            // Get user info
            const userResponse = await fetch(`${API_BASE}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await userResponse.json();
            
            if (!userData.success) {
                removeToken();
                window.location.href = '/login';
                return;
            }
            
            // Update UI with user info
            const user = userData.user;
            document.getElementById('userName').textContent = user.fullName;
            document.getElementById('welcomeName').textContent = user.fullName.split(' ')[0];
            document.getElementById('userEmail').textContent = user.email;
            
            // Format dates
            const memberDate = new Date(user.createdAt);
            document.getElementById('memberSince').textContent = `Member since: ${memberDate.toLocaleDateString()}`;
            
            // Calculate account age in days
            const accountAge = Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));
            document.getElementById('accountAge').textContent = `${accountAge} days`;
            
            if (user.lastLogin) {
                const lastLoginDate = new Date(user.lastLogin);
                document.getElementById('lastLogin').textContent = `Last login: ${lastLoginDate.toLocaleString()}`;
            } else {
                document.getElementById('lastLogin').textContent = 'First login today!';
            }
            
            // Session info
            document.getElementById('sessionInfo').innerHTML = `
                Logged in as: ${user.email}<br>
                Session valid for: JWT Token (7 days)<br>
                Authentication: Active
            `;
            
            // Get dashboard stats
            const statsResponse = await fetch(`${API_BASE}/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const statsData = await statsResponse.json();
            
            if (statsData.success) {
                document.getElementById('securityStatus').innerHTML = `
                    ${statsData.data.activity.accountStatus}<br>
                    <small>JWT Protected</small>
                `;
            }
            
        } catch (error) {
            console.error('Dashboard error:', error);
            removeToken();
            window.location.href = '/login';
        }
    })();
    
    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const token = getToken();
            if (token) {
                try {
                    await fetch(`${API_BASE}/auth/logout`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                }
            }
            removeToken();
            window.location.href = '/login';
        });
    }
}

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Redirect if already logged in (for login/register pages)
if (window.location.pathname === '/login' || window.location.pathname === '/register') {
    (async () => {
        if (await isAuthenticated()) {
            window.location.href = '/dashboard';
        }
    })();
}