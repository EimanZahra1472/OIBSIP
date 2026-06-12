# SecureAuth - Complete Login Authentication System

## Description
A complete, production-ready authentication system with user registration, secure login, JWT tokens, bcrypt password hashing, MongoDB storage, and protected routes. Built with Node.js, Express, MongoDB, and modern web technologies.

## Features
- ✅ **User Registration** - Create new accounts with validation
- ✅ **Secure Login** - JWT-based authentication
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Protected Routes** - Authenticated-only access
- ✅ **JWT Tokens** - Stateless authentication
- ✅ **MongoDB Integration** - Persistent user data storage
- ✅ **Session Management** - Token expiration (7 days)
- ✅ **Password Visibility Toggle** - Show/hide password
- ✅ **Form Validation** - Client & server-side validation
- ✅ **Responsive Design** - Works on all devices
- ✅ **Error Handling** - Proper error messages
- ✅ **Logout Functionality** - Clear tokens and cookies
- ✅ **Dashboard** - Protected user dashboard
- ✅ **Account Info** - View user profile and stats
- ✅ **Rate Limiting** - Prevent brute force attacks

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, helmet, rate limiting
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)

## File Structure
Level2_Task4_LoginAuth/
├── server.js # Main server file
├── package.json # Dependencies
├── .env # Environment variables
├── models/
│ └── User.js # User schema model
├── middleware/
│ └── auth.js # JWT verification middleware
├── routes/
│ ├── auth.js # Authentication routes
│ └── dashboard.js # Protected routes
├── public/
│ ├── index.html # Landing page
│ ├── login.html # Login page
│ ├── register.html # Registration page
│ ├── dashboard.html # Protected dashboard
│ ├── style.css # Global styles
│ └── script.js # Frontend logic
└── README.md # Documentation

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Install Dependencies
npm install
Step 2: Set up MongoDB
Local MongoDB: Make sure MongoDB is running on mongodb://localhost:27017

OR use MongoDB Atlas and update the connection string in .env

Step 3: Configure Environment Variables
Create .env file in root directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/login_auth_db
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
Step 4: Run the Application
bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
Step 5: Access the Application
Home: http://localhost:5000

Register: http://localhost:5000/register

Login: http://localhost:5000/login

Dashboard: http://localhost:5000/dashboard (protected)

API Endpoints
Authentication Routes (/api/auth)
Method	Endpoint	Description	Access
POST	/register	Register new user	Public
POST	/login	Login user	Public
GET	/logout	Logout user	Private
GET	/me	Get current user	Private
POST	/change-password	Change password	Private
Dashboard Routes (/api/dashboard)
Method	Endpoint	Description	Access
GET	/stats	Get dashboard stats	Private
GET	/profile	Get user profile	Private
PUT	/profile	Update profile	Private
Security Features
Password Hashing - bcrypt with salt rounds

JWT Tokens - Signed with secret key

HTTP-only Cookies - For token storage

Rate Limiting - 100 requests per 15 minutes

Input Validation - Sanitize user inputs

CORS Protection - Controlled origins

Environment Variables - Sensitive data protection

API Response Examples
Successful Registration
json
{
  "success": true,
  "message": "Registration successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
Successful Login
json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
Error Response
json
{
  "success": false,
  "message": "Invalid credentials"
}
Testing the Application
Test Registration
Go to http://localhost:5000/register

Fill in full name, email, password

Click Register

Should redirect to dashboard

Test Login
Go to http://localhost:5000/login

Enter registered email and password

Click Login

Should redirect to dashboard

Test Protected Route
Try accessing http://localhost:5000/dashboard without login

Should redirect to login page

Test Logout
From dashboard, click Logout button

Should redirect to login page

Dashboard becomes inaccessible

Troubleshooting
MongoDB Connection Error
Make sure MongoDB is running: mongod

Check connection string in .env

For Atlas, check network access settings

JWT Token Issues
Clear localStorage: localStorage.removeItem('authToken')

Clear browser cookies

Restart server

Port Already in Use
Change PORT in .env file

Kill process using the port

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Future Enhancements
Email verification

Password reset via email

Two-factor authentication (2FA)

OAuth (Google, Facebook login)

User roles (admin, user)

Session management

Activity logging

Profile picture upload

License
MIT

Author
SecureAuth Team

Support
For issues, please create a ticket on GitHub

---

## How to Run the Authentication System

### Step 1: Install Node.js
Download and install Node.js from https://nodejs.org/

### Step 2: Install MongoDB
- Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
- OR use MongoDB Atlas (cloud version)

### Step 3: Setup Project
```bash
# Create project folder
mkdir Level2_Task4_LoginAuth
cd Level2_Task4_LoginAuth

# Create all the files as shown above
# Copy each file content into its respective file

# Install dependencies
npm install

# Create .env file with your configuration

# Start MongoDB (if using local)
# On Windows: "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
# On Mac: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Run the application
npm run dev
Step 4: Access the App
Open browser and go to: http://localhost:5000

