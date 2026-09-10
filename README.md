# URL Shortener

A full-stack URL shortening web application built with Node.js, Express, MongoDB, and EJS. The application provides user authentication, personalized dashboard views, click analytics tracking, and automated redirection.

## Features

- User Authentication: Account registration and login powered by cookie-based session management.
- Protected Routes: Dashboard and link generation endpoints are accessible only to authenticated users.
- Per-User Link Isolation: Each user can only view and manage links created under their own account.
- Analytics Tracking: Records visit timestamps and calculates total click counts for every shortened link.
- Form Resubmission Prevention: Implements the Post/Redirect/Get pattern to prevent duplicate link creation on page refresh.
- Responsive Interface: Dark-themed interface with clipboard copy integration and form validation feedback.

## Tech Stack

- Backend Runtime: Node.js
- Web Framework: Express.js (v5)
- Database: MongoDB via Mongoose ODM
- Templating Engine: EJS
- Session Management: cookie-parser, uuid
- Identifier Generation: shortid
- Development Watcher: nodemon

## Project Architecture

```
Url_Short/
|-- connect.js               # MongoDB connection setup
|-- index.js                 # Application entry point and middleware pipeline
|-- package.json             # Project metadata and dependencies
|-- controller/
|   |-- url.js               # Link creation, redirection, and analytics handlers
|   \-- user.js              # Signup and login authentication logic
|-- middlewares/
|   \-- auth.js              # Route protection and session validation middleware
|-- model/
|   |-- url.js               # Schema definition for shortened URLs and visit history
|   \-- user.js              # Schema definition for user accounts
|-- routes/
|   |-- staticRouter.js      # Frontend page routes (home, login, signup, logout)
|   |-- url.js               # URL operational endpoints
|   \-- user.js              # Authentication submission endpoints
|-- service/
|   \-- auth.js              # In-memory session store mapping session IDs to users
\-- views/
    |-- home.ejs             # Main dashboard and link management template
    |-- login.ejs            # User sign-in interface
    \-- signup.ejs           # User registration interface
```

## Routing and Endpoints

### Static and View Routes
- `GET /`: Renders the authenticated user dashboard. Unauthenticated users are redirected to `/login`.
- `GET /signup`: Renders the registration form.
- `GET /login`: Renders the login form.
- `GET /logout`: Clears the session cookie (`uid`) and redirects to `/login`.

### Authentication Routes
- `POST /user`: Accepts `name`, `email`, and `password` to register a new user. Displays a success message and redirects to `/login` after a 2-second delay.
- `POST /user/login`: Validates credentials, issues a session ID stored in an HTTP cookie (`uid`), and redirects to `/`.

### URL Management Routes
- `POST /url`: Accepts a target `url` in the request body, generates a short identifier, associates it with the logged-in user, and redirects to `/?id=<shortId>`.
- `GET /url/:shortId`: Looks up the original URL, appends the current timestamp to `visitHistory`, and redirects the client to the destination.
- `GET /url/analytics/:shortId`: Returns JSON payload with total click count and timestamp logs for the given ID.

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/url_short`) or a remote MongoDB connection string.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/smaranya06/Url_Short.git
   cd Url_Short
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Database Configuration:
   Ensure your MongoDB instance is running. The default connection string is located in `connect.js`:
   ```javascript
   mongoose.connect("mongodb://127.0.0.1:27017/url_short")
   ```
   Modify this connection string if connecting to a different host or MongoDB Atlas.

4. Start the application:
   ```bash
   npm start
   ```

5. Access the application:
   Open your browser and navigate to `http://localhost:3000`.
