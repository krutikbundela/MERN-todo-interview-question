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
