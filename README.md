# Mini CRM Backend (NestJS + Prisma + PostgreSQL)

A backend REST API built using NestJS, PostgreSQL and Prisma ORM with JWT authentication and role-based authorization.

---

## Tech Stack
- NestJS (TypeScript)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger API Documentation
- class-validator & class-transformer
- bcrypt for password hashing

---

## Features
- User Registration & Login (ADMIN, EMPLOYEE)
- Role-based access control
- Customers CRUD with pagination
- Task assignment to employees
- Secure password hashing
- Swagger API documentation

---

## Project Setup Instructions

### 1. Clone Repository
```bash
git clone <your-github-repo-url>
cd mini-crm-backend
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in root directory using the example below.

#### .env.example
```env
DATABASE_URL=postgresql://username:password@localhost:5432/mini_crm
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
### 4. Database Migration (Prisma)
Make sure PostgreSQL is running and database exists.
```bash
npx prisma migrate dev --name init
```
This will:
- Create tables
- Apply schema
- Generate Prisma Client

### 5. Start the Server
```bash
npm run start:dev
```
Server will start at:
```arduino
http://localhost:3000
```

### 6. Swagger API Documentation
Open in browser:
```arduino
http://localhost:3000/api
```
Swagger allows testing all endpoints including protected routes using JWT token.

## Authentication Flow (Testing)
1. Register user: 
POST `/auth/register`
2. Login: 
POST `/auth/login`
3. Copy `accessToken`
4. Click "Authorize" in Swagger and paste:
```php-template
Bearer <your_token>
```
5. Test protected APIs (users, customers, tasks)
---


## API Modules
- Auth Module
- Users Module (Admin only)
- Customers Module
- Tasks Module
---
## Database Migration Commands
```bash
npx prisma migrate dev
npx prisma studio
```
---
## Author
Rajshree

---


# 📁 .env.example (create file)

Create a file named `.env.example` in root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mini_crm
JWT_SECRET=your_secret_key
PORT=3000
```
⚠️ Do NOT push `.env` file, only `.env.example`

---
## 🔗 curl Commands (API Testing)
### 1. Register User (ADMIN)
```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "password123",
  "role": "ADMIN"
}'
```
### 2. Login User
```bash
 curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@gmail.com",
  "password": "password123"
}'
```
Reponse contains:
```json
{
  "accessToken": "JWT_TOKEN_HERE"
}
```
### 3. Create Customer (ADMIN only)
```bash
curl -X POST http://localhost:3000/customers \
-H "Authorization: Bearer JWT_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone": "9876543210",
  "company": "ABC Corp"
}'
```
### 4. Get Customers (ADMIN + EMPLOYEE)
```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```
### 5. Create Task (ADMIN only)
```bash
curl -X POST http://localhost:3000/tasks \
-H "Authorization: Bearer JWT_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{
  "title": "Follow up with client",
  "description": "Call customer",
  "assignedTo": 2,
  "customerId": 1,
  "status": "PENDING"
}'
```
### 6. Update Task Status (EMPLOYEE)
```bash
curl -X PATCH http://localhost:3000/tasks/1/status \
-H "Authorization: Bearer JWT_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{
  "status": "DONE"
}'
```
### 7. Get Tasks
```bash
curl -X GET http://localhost:3000/tasks \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```
---




