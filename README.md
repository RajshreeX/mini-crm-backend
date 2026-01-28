# Mini CRM Backend (NestJS + Prisma + PostgreSQL)

A production-ready backend API for a Mini CRM system built using NestJS, Prisma ORM, and PostgreSQL, featuring JWT authentication, role-based access control, and fully documented APIs using Swagger.
Deployed live on Render.

---
## Live Demo
```arduino
https://mini-crm-backend-yabk.onrender.com/
```
Swagger API Documentation:
```arduino
https://mini-crm-backend-yabk.onrender.com/api
```
---

## Tech Stack
- Backend Framework: NestJS(Node.js+TypeScript)
- Database: PostgreSQL
- ORM: Prisma ORM
- Authetication: JWT
- Authorization: Role-based Guards(ADMIN/USER)
- API Docs: Swagger(OpenAPI)
- Deployment: Render
---

## Features
- User Registration & Login (JWT Auth)
- Role-based Authorization (Admin/User)
- CRUD operations for Customers
- Task Management for Customers
- Update Task Status
- Pagination for listing endpoints
- Swagger API documentation
- Production-ready deployment

---
## Project Structure
```bash
src/
 ├── auth/
 ├── customers/
 ├── customers/
 ├── tasks/
 ├── prisma/
 └── main.ts
```
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
Development mode
```bash
npm run start:dev
```
Production build
```bash
npm run build
npm run start:prod
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
or live:
```arduino
https://mini-crm-backend-yabk.onrender.com/api
```
Swagger allows testing all endpoints including protected routes using JWT token.

--- 

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
## Sample API Endpoints
#### Auth
- `POST /auth/register`
- `POST /auth/login`

#### Users
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`

#### Customers
- `POST /customers`
- `GET /customers`
- `GET /customers/:id`
- `PATCH /customers/:id`
- `DELETE /customers/:id`

#### Tasks
- `POST /tasks`
- `GET /tasks`
- `PATCH /tasks/:id/status`

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
## Deployment (Render)
- Backend deployed on Render
- PostgreSQL database connected
- Environment variables set in Render dashboard
- Prisma migrations applied in production

---

## Learning Outcomes
- Built scalable REST API using NestJS
- Implemented JWT authentication & role-based guards
- Used Prisma ORM with PostgreSQL
- Designed modular architecture
- Deployed backend to cloud (Render)
- API documentation using Swagger

---
## Future Enhancements
- Frontend integration (React)
- Search & filtering
- Docker support
- Refresh tokens
- Rate limiting
- Unit tests
---
## Author
- **Rajshree (Rexi)**
- B.Tech IT Student
- Future Full-Stack Developer 
- Project: Mini CRM Backend API




