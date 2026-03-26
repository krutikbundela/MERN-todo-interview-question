# 🚀 Backend Setup Guide (Node + Express + TypeScript)

This guide helps you manually set up the backend project step-by-step after cloning (or even from scratch).

---

## 📦 Step 1: Initialize Project

```bash
npm init -y
```

---

## 📥 Step 2: Install Dependencies

```bash
npm install bcrypt cookie-parser cors dotenv express express-rate-limit helmet jsonwebtoken mongoose zod
```

---

## 🛠️ Step 3: Install Dev Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/cookie-parser @types/cors @types/jsonwebtoken
```

---

## ⚙️ Step 4: Setup TypeScript Config

Create a `tsconfig.json` file in root:

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"],
    "outDir": "dist",
    "rootDir": "src",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## ▶️ Step 5: Add Scripts

Update `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## 📁 Folder Structure

```
└── 📁server
    └── 📁src
        └── 📁config
            ├── db.ts
            ├── env.ts
        └── 📁controllers
            ├── auth.controller.ts
            ├── todo.controllers.ts
        └── 📁middleware
        └── 📁modals
            ├── todo.modal.ts
            ├── user.modal.ts
        └── 📁routes
            ├── auth.route.ts
            ├── index.ts
            ├── todo.route.ts
        └── 📁utils
            ├── hash.ts
            ├── token.ts
            ├── validations.ts
        ├── app.ts
        ├── server.ts
    ├── .env
    ├── .env.sample
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

---

## 🔐 Environment Variables

Create a `.env` file in root and copy values from `.env.sample`:

### `.env.sample`

```env
MONGO_URI=
PORT=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Production Mode

```bash
npm start
```

---

## 🧠 Notes

* Make sure MongoDB is running locally or use a cloud URI.
* Use `.env` for sensitive configs (never commit it).
* `ts-node-dev` enables hot-reloading in development.
* Output JS files will be generated in the `dist/` folder.

---

## ✅ You're Ready!

Now your backend is fully set up and ready to build 🚀



# 🚀 Frontend Setup Guide (React + Vite + TypeScript)

This guide helps you manually set up the frontend project using Vite.

---

## 📦 Step 1: Create Vite App

```bash
npm create vite@latest .
```

👉 Select:

* Framework: **React**
* Variant: **TypeScript**

---

## 📥 Step 2: Install Dependencies

Install only additional dependencies (excluding those already installed by Vite):

```bash
npm install @emotion/react @emotion/styled @hookform/resolvers @mui/icons-material @mui/material @reduxjs/toolkit axios react-hook-form react-redux react-router zod
```

---

## 🛠️ Step 3: Install Dev Dependencies

Install additional dev dependencies (excluding preinstalled ones):

```bash
npm install -D @types/react-redux
```

---

## 📁 Folder Structure

```
└── 📁client
    └── 📁public
        ├── favicon.svg
        ├── icons.svg
    └── 📁src
        └── 📁components
            ├── Layout.tsx
        └── 📁interface
        └── 📁pages
            ├── Login.tsx
            ├── Signup.tsx
        └── 📁redux
            ├── AuthSlice.tsx
            ├── hook.ts
            ├── store.ts
        └── 📁routes
            ├── route.ts
        └── 📁validation
            ├── auth.ts
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

---

### Build Project

```bash
npm run build
```

---

### Preview Build

```bash
npm run preview
```

---

## 🧠 Notes

* Vite provides fast development with HMR (Hot Module Replacement).
* React 19 + TypeScript is used for type safety.
* Redux Toolkit is used for global state management.
* React Hook Form + Zod is used for form validation.
* MUI is used for UI components.

---

## ✅ You're Ready!

Your frontend is now fully set up and ready to connect with the backend 🚀


# 🧠 MERN Interview Assignment: Authenticated Todo System

---

## 📌 Problem Statement

Design and implement a **full-stack Todo Application** with secure authentication and advanced data manipulation capabilities.

Each user should be able to manage their own todos with support for filtering, grouping, subtasks, and bulk operations.

---

## 🎯 Objective

This assignment evaluates your ability to:

* Design secure authentication systems
* Handle complex array and object manipulations
* Structure scalable backend APIs
* Manage frontend state effectively using Redux
* Handle edge cases and real-world scenarios

---

## 🔐 Authentication (Mandatory)

### Requirements:

* Implement user registration and login
* Use **JWT-based authentication**:

  * Access Token (short-lived)
  * Refresh Token
* Implement protected routes

### Constraints:

* Users must only access their own data
* Invalid or expired tokens must be handled properly
* Refresh token should allow generation of new access tokens

---

## 🧾 Todo Data Model (Mandatory)

Each todo must include:

* Title
* Description
* Status (`todo`, `in-progress`, `done`)
* Priority (`low`, `medium`, `high`)
* Tags (array of strings)
* Subtasks (array of objects):

  * Title
  * Completed (boolean)
* Created timestamp

---

## ⚙️ Backend Requirements (Mandatory)

### Core APIs:

* Create a todo
* Get all todos (user-specific)
* Update a todo
* Delete a todo

---

### Advanced APIs:

#### 1. Filter Todos

* Filter based on:

  * Status
  * Priority
  * Tags (support multiple tags)

---

#### 2. Group Todos

* Return todos grouped by status:

  * `todo`
  * `in-progress`
  * `done`

---

#### 3. Todo Statistics

Return:

* Total todos
* Completed todos
* Pending todos
* Count grouped by priority

---

#### 4. Subtask Operations

* Add subtask
* Update subtask completion
* Delete subtask

---

#### 5. Bulk Operations

* Update status of multiple todos
* Delete multiple todos

---

## ⚛️ Frontend Requirements (Mandatory)

### Tech Stack:

* React
* Redux (Redux Toolkit preferred)

---

### Features:

* Authentication flow (login/logout)
* Display user-specific todos
* Create / update / delete todos
* Filter todos:

  * Status
  * Priority
  * Tags (multi-select)
* Manage subtasks
* Perform bulk actions

---

### State Management Requirements:

* Maintain global state for todos
* Maintain filter state
* Handle loading and error states properly

---

## 🔄 Data Handling Requirements (Mandatory)

Your implementation must correctly handle:

* Updating nested subtasks inside a todo
* Adding/removing tags without duplication
* Applying multiple filters simultaneously
* Grouping todos by status
* Performing bulk updates efficiently

---

## ⚠️ Edge Cases (Mandatory)

* Prevent duplicate tags
* Handle invalid or expired tokens
* Handle updates/deletions of non-existing todos
* Handle empty or missing subtasks
* Prevent unauthorized access

---

## ⭐ Optional (Preferred)

* Persist authentication using refresh token on reload
* Optimistic UI updates
* Pagination or lazy loading
* Search todos by title or description
* Sorting (date, priority)
* Clean and modular project structure

---

## 🌟 Bonus (Strong Signal)

* Axios interceptor for automatic token refresh
* Normalized Redux state
* Memoized selectors for derived data (grouping, stats)
* Scalable folder structure

---

## 🧪 Evaluation Criteria

* Authentication flow correctness
* Ability to handle nested data structures
* API design and structure
* Redux state management approach
* Edge case handling
* Code readability and scalability

---

## 📌 Submission Expectations

* Functional full-stack application
* Clean and well-structured codebase
* Proper separation of concerns
* Meaningful commit history (if using Git)

---
