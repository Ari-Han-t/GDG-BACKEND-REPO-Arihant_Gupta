# Productivity Management Dashboard API

A robust backend API for a productivity management system that empowers users to organize, track, and analyze their tasks efficiently. Built with a focus on clean architecture, security, and reliability.

## 📋 Overview

This API provides a complete task management solution with advanced features including role-based access control, recurring task automation, productivity analytics, and comprehensive test coverage. It supports both individual users tracking their own productivity and admins viewing system-wide insights.

## ✨ Key Features

- **Authentication & Security**
  - JWT-based authentication (register & login)
  - Secure password hashing with bcrypt
  - Token-based authorization

- **Task Management**
  - Full CRUD operations for tasks
  - Advanced filtering and search capabilities
  - Priority-based task organization
  - Status tracking (PENDING, IN_PROGRESS, COMPLETED)
  - Deadline management with overdue detection

- **Smart Automation**
  - Recurring tasks (daily / weekly recurrence)
  - Automatic task generation for recurring items
  - Overdue task detection and tracking

- **Access Control & Analytics**
  - Role-based access control (USER / ADMIN)
  - User-level productivity dashboard
  - Admin system-wide productivity analytics
  - Detailed completion metrics and trends

- **Developer Experience**
  - Automated database seeding
  - Comprehensive integration test suite
  - Centralized error handling
  - Structured logging with Winston

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | SQLite with Prisma ORM |
| **Authentication** | JWT |
| **Password Hashing** | bcrypt |
| **Logging** | Winston |
| **Testing** | Jest & Supertest |

---

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd GDG-BACKEND-REPO-Arihant_Gupta
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a .env file in the root directory:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
DATABASE_URL="file:./dev.db"
```

4. **Set up the database**
```bash
npx prisma migrate dev
```

5. **Seed the database (optional)**
```bash
node src/scripts/seed.js
```

This creates 5 test users (1 admin, 4 regular users) with 10 sample tasks each.

6. **Start the server**
```bash
npm run dev
```

The API will be available at http://localhost:5000/api

## 🔐 Authentication

All protected routes require a valid JWT token in the request header:

Authorization: Bearer <JWT_TOKEN>


Tokens expire after 7 days.

## 📚 API Documentation

### Base URL
http://localhost:5000/api

### Authentication Endpoints

#### Register a New User
POST /api/auth/register
Content-Type: application/json

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (201 Created):

```json
{
  "message": "User registered successfully"
}
```

#### Login
POST /api/auth/login
Content-Type: application/json

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 📝 Task Management Endpoints

#### Create a Task
POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

```json
{
  "title": "Finish backend implementation",
  "description": "Complete API endpoints",
  "priority": "HIGH",
  "deadline": "2026-01-20",
  "recurrence": "DAILY"
}
```

#### Get All Tasks
GET /api/tasks?status=PENDING&priority=HIGH&search=backend
Authorization: Bearer <JWT_TOKEN>

Query Parameters:

| Parameter | Values | Description |
|-----------|--------|-------------|
| status | PENDING, IN_PROGRESS, COMPLETED | Filter by task status |
| priority | LOW, MEDIUM, HIGH | Filter by priority |
| search | string | Search in task titles & descriptions |
| from | date (YYYY-MM-DD) | Deadline start |
| to | date (YYYY-MM-DD) | Deadline end |

#### Update a Task
PUT /api/tasks/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

```json
{
  "status": "COMPLETED",
  "priority": "MEDIUM"
}
```

For recurring tasks, marking a task as COMPLETED automatically creates the next occurrence.
## 🔁 Special Task Features

### Recurring Tasks

Tasks can recur automatically:

| Type | Behavior |
|------|----------|
| DAILY | Deadline +1 day |
| WEEKLY | Deadline +7 days |

### Overdue Detection

A task is marked overdue when:
- The deadline has passed
- The task status is not COMPLETED

## 📊 Dashboard Endpoints

### Productivity Overview (User & Admin)
GET /api/dashboard/overview
Authorization: Bearer <JWT_TOKEN>

Behavior by role:
- USER → sees analytics for their own tasks only
- ADMIN → sees system-wide analytics across all users

Query Parameters:

| Parameter | Values | Description |
|-----------|--------|-------------|
| range | day, week, month | Time window |
| from | date | Custom start date |
| to | date | Custom end date |

Example Response (User):

```json
{
  "scope": "USER",
  "totalTasks": 10,
  "completedTasks": 4,
  "overdueTasks": 2,
  "completionRateAllTime": 40
}
```

Example Response (Admin):

```json
{
  "scope": "SYSTEM",
  "totalTasks": 50,
  "completedTasks": 18,
  "overdueTasks": 6,
  "completionRateAllTime": 36
}
```

### Admin: View All Tasks
GET /api/tasks/admin/all
Authorization: Bearer <ADMIN_TOKEN>

## 👥 Role-Based Access Control

| Role | Permissions |
|------|-------------|
| USER | Manage own tasks<br/>View personal dashboard |
| ADMIN | View all tasks<br/>Access system-wide analytics |

## 🧪 Testing

Integration tests cover:
- Authentication
- Authorization & RBAC
- Task CRUD
- Filters & search
- User and admin dashboard behavior

Run tests:
```bash
NODE_ENV=test npm test
```

## 🌱 Database Seeding

```bash
node src/scripts/seed.js
```

Creates:
- 5 users (1 admin, 4 users)
- 10 tasks per user
- Password for all users: password123

## 🛡️ Error Handling & Logging

- Centralized error middleware
- Structured logging with Winston
- Input validation before processing
- Secure handling of sensitive data

## 📄 License

ISC

## 👤 Author

Arihant Gupta

Status: ✅ Task 1 complete — all required and optional features implemented

---