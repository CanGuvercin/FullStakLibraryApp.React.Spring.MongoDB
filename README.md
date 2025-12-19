# 📚 Library App – Full Stack Library Management System

A production-ready full stack library application where users can search books, borrow available copies, place reservations (holds), and where administrators manage inventory and users.

This project focuses on **real-world business rules**, **clean API design**, and **frontend–backend state synchronization** rather than simple CRUD operations.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router
- TanStack Query
- Zustand
- TailwindCSS

### Backend
- Spring Boot 3 (Java 21)
- Spring Security (JWT Authentication)
- Spring Data MongoDB
- MapStruct, Lombok
- Validation (Jakarta Validation)

### Database & DevOps
- MongoDB (Atlas / Docker)
- Docker & Docker Compose

---

## ✨ Core Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (`ADMIN`, `MEMBER`)
- Protected routes on both frontend and backend

### Book & Inventory Management
- Search books by title, author, ISBN, or tags
- Separate **Book** and **Copy** models for real inventory tracking
- Real-time availability counts

### Loan System
- Borrow available copies
- Return books with due-date tracking
- Business-rule-driven error handling (conflict prevention)

### Hold (Reservation) System
- Queue-based reservation when no copies are available
- Automatic priority handling
- Reservation cancellation and fulfillment logic

### Admin Panel
- Create, update, and delete books
- Manage physical copies
- Manage users and roles

---

## 🧠 Key Design Decisions

- **Book vs Copy separation**  
  Enables realistic inventory management instead of “infinite stock” books.

- **DTO-based API design**  
  Clean separation between persistence models and API contracts.

- **Explicit business rule enforcement**  
  Conflicts (e.g. double loan attempts) are handled via proper HTTP status codes (`409`, `422`).

- **Frontend state synchronization**  
  TanStack Query ensures server state consistency after loan/return/hold actions.

---

## 🗂️ Project Structure

- `client/`: React + Vite + TypeScript + Tailwind
- `server/`: Spring Boot 3.5.7 + MongoDB + Docker
