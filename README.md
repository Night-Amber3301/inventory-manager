# Inventory Manager

A secure full-stack inventory management system built with React, Node.js, and PostgreSQL.

# Inventory Manager

Inventory Manager is a full-stack web application that allows authenticated users to manage product inventory securely.  
The system supports user authentication with JWT, protected API routes, and full CRUD operations for products.

---

## Features

- User registration and login
- JWT authentication
- Access token + refresh token mechanism
- Protected routes
- Create, view, and delete products
- Unique SKU validation
- RESTful API design
- Modular backend architecture
- React frontend with Axios API layer

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

### Database
- PostgreSQL

---

## Project Structure

secure-auth-system/
├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── routes
│ │ ├── services
│ │ ├── middleware
│ │ └── utils
│ └── prisma
│
├── frontend
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── pages
│ │ └── App.tsx


---

## Authentication Flow

1. User registers or logs in.
2. Server generates:
   - **Access Token (15 minutes)**
   - **Refresh Token (7 days)**
3. Access token is used for API requests.
4. When the access token expires:
   - Frontend automatically calls `/auth/refresh`
   - A new access token is issued.

---

## API Endpoints

### Authentication

POST /auth/register  
POST /auth/login  
POST /auth/refresh  
POST /auth/logout  
GET /auth/profile  

### Products

GET /products  
POST /products  
PATCH /products/:id  
DELETE /products/:id  

---

## Setup Instructions

### 1. Clone repository

git clone <repo-url>
cd inventory-manager


---

### 2. Install dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend 
npm install


---

### 3. Configure environment variables

Create `.env` file in backend:

DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key


---

### 4. Run database migrations

npx prisma migrate dev


---

### 5. Start backend

npm run dev
Server will run on:
http://localhost:3000


---

### 6. Start frontend

cd frontend
npm run dev
Frontend runs on:
http://localhost:5173


---

## Security Measures

- Password hashing with bcrypt
- JWT authentication
- Refresh token mechanism
- Protected API routes
- Input validation

---

## Future Improvements

- Update product functionality
- Pagination for product listing
- Role-based access control
- Product search and filtering

---

## Author

Built as part of a take-home assignment.


