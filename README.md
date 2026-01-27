# Mini CRM Backend

## Tech Stack
- NestJS
- PostgreSQL
- Prisma
- JWT Auth
- Swagger

## Setup
1. Clone repo
2. npm install
3. Create .env file

DATABASE_URL=postgresql://user:password@localhost:5432/crm
JWT_SECRET=secret123

4. npx prisma migrate dev
5. npm run start:dev

## Swagger
http://localhost:3000/swagger

## Auth
POST /auth/register
POST /auth/login

## Customers
GET /customers?page=1&limit=10

## Tasks
POST /tasks
GET /tasks
PATCH /tasks/:id/status
