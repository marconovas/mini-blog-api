# Mini Blog API

A RESTful API built with Node.js, Express, Prisma, and PostgreSQL.  
This project focuses on backend architecture, authentication, and database design using modern JavaScript tooling.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- CRUD operations for blog posts
- Protected routes with middleware
- Ownership validation for posts (users can only modify their own content)
- Prisma ORM with PostgreSQL integration

---

## 🧠 Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt

---

## 🔐 Authentication Flow

- Users register with username, email, and password
- Passwords are hashed using bcrypt
- Login returns a JWT token
- Protected routes require token validation via middleware

---

## 📌 API Goals

This API is designed to serve as the backend for a full-stack blog platform, handling all core logic including authentication, post management, and data persistence.

---

## 📈 Future Improvements

- Refresh tokens
- Role-based authorization (admin/user)
- Input validation layer (e.g. Zod or Joi)
- Pagination for posts
- Search and filtering
- Rate limiting and security hardening
- API documentation (Swagger)

---

## 🛠️ Setup (coming soon)

Instructions for installation, environment variables, and database setup will be added as the project progresses.
