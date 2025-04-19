# 📚 Assignment B1 – CRUD Snippets

This is a full-stack web application built with Node.js, Express, and MongoDB for managing code snippets. It was developed as part of a backend programming course with a strong focus on authentication, authorization, CRUD functionality, and RESTful design principles.

The application allows developers to register, log in, and manage their own snippets in a secure, user-friendly environment. Anonymous users can browse snippets, while authenticated users can create, edit, and delete their own code entries.

## 🚀 Features

- User registration and login system with session-based authentication
- Passwords stored securely using hashing (no recovery)
- Role-based authorization:
  - Anonymous users: view snippets only
  - Authenticated users: create, update, and delete their own snippets
- Full CRUD operations for code snippets
- Support for multiline text (real code snippets)
- Express-session used for secure session storage
- Flash messages and feedback for better user interaction
- Server-side validation and permission controls
- Proper HTTP status codes for errors (403, 404, 500)
- Deployment-ready on CSCloud

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Docker or MongoDB Atlas)
- **ODM**: Mongoose
- **Authentication**: express-session (no third-party login/auth libs)
- **Frontend**: Server-side rendered views using EJS or similar
- **Deployment**: CSCloud server (via SSH)
