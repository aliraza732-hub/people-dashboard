# People Dashboard

A full-stack web application built with Next.js, PostgreSQL, and Prisma. Features Google authentication and full CRUD functionality for managing users and their posts.



## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js with Google OAuth
- **Deployment:** Vercel + Supabase

## ✨ Features

- Google OAuth login and logout
- Protected routes — redirects to login if not authenticated
- View all users with post counts
- Add new users
- Delete users
- Real-time UI updates after mutations
- Responsive design

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository
```bash
   git clone https://github.com/YOUR_USERNAME/people-dashboard.git
   cd people-dashboard
```

2. Install dependencies
```bash
   npm install
```

3. Set up environment variables — create a `.env` file:
```
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   AUTH_SECRET="your_auth_secret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

4. Generate Prisma client
```bash
   npx prisma generate
```

5. Run the development server
```bash
   npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
my-fullstack-app/
  app/
    api/
      auth/        # NextAuth routes
      users/       # User CRUD API routes
    components/
      AddUserForm  # Form to create users
      UserCard     # User card with delete
    login/         # Login page
    page.tsx       # Home dashboard
  lib/
    prisma.ts      # Prisma client
  prisma/
    schema.prisma  # Database schema
  auth.ts          # NextAuth config
```

## 🗄️ Database Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  userId    Int
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## 📝 API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a user |
| DELETE | `/api/users/:id` | Delete a user |

## 🧑‍💻 Author
Ali Raza
