# 📚 Library Management System

> A production-ready, high-performance library management platform with real-time analytics, intuitive admin controls, and seamless member experience.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791)](https://www.postgresql.org/)

## 🎯 Overview

A full-stack Library Management System designed to streamline operations for administrators and enhance the borrowing experience for members. Built with modern web technologies, featuring a sleek dark-slate theme, real-time statistics dashboards, and responsive interfaces optimized for all devices.

**Key Highlights:**
- 🔐 JWT-based authentication with role-based access control
- 📊 Real-time analytics and inventory management
- 🎨 Modern UI with glassmorphism design patterns
- ⚡ Asynchronous API with FastAPI
- 🔄 Automatic availability calculation and due-date management
- 📱 Fully responsive mobile-first design
- 🚀 Cloud-ready with containerized deployment

---

## 📑 Table of Contents

- [🎯 Overview](#-overview)
- [⚡ Key Features](#-key-features)
- [🛠️ Technology Stack](#-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🗄️ Database Architecture](#-database-architecture)
- [⚙️ Environment Configuration](#-environment-configuration)
- [🚀 Getting Started](#-getting-started)
- [🔌 API Documentation](#-api-documentation)
- [📈 System Architecture](#-system-architecture)
- [📋 Usage Guide](#-usage-guide)
- [☁️ Deployment Guide](#-deployment-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ⚡ Key Features

### 👤 Member Interface
- **Dashboard Summary** - Real-time gauges displaying active borrows, overdue items, and reading statistics
- **Book Catalog** - Searchable and filterable book listings with availability indicators
- **Smart Borrowing** - One-click borrowing with automatic due-date calculation
- **Borrow History** - Comprehensive transaction logs with status tracking
- **User Profile** - Personalized account management and credentials verification

### 🛠️ Admin Panel
- **Unified Dashboard** - Centralized control center with key performance indicators
- **Advanced Analytics** - Real-time statistics on circulation, inventory, and member activity
- **Inventory Management** - Add, edit, and delete books with bulk operations support
- **Drawer Overlay System** - Modern inline editing without page navigation
- **Smart Filtering** - Advanced filtering by category, availability, and status
- **Pagination Controls** - Configurable pagination (5, 10, or 25 items per page)
- **Secure Access** - JWT-based role validation and permission management

---

## 🛠️ Technology Stack

### Frontend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 19 |
| **Build Tool** | Vite | Latest |
| **Router** | React Router DOM | v7 |
| **HTTP Client** | Axios | Latest |
| **Styling** | CSS3 (Variables, Gradients) | Modern |
| **Icons** | React Icons (Lucide) | Latest |
| **Package Manager** | npm | 10+ |

### Backend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | FastAPI | Latest |
| **Server** | Uvicorn (ASGI) | Latest |
| **ORM** | SQLAlchemy | 2.x |
| **Database Driver** | psycopg2-binary | Latest |
| **Authentication** | JWT + passlib | Latest |
| **Validation** | Pydantic | v2 |
| **Password Hashing** | bcrypt | Latest |
| **CORS** | fastapi-cors | Latest |

### Database & Infrastructure
| Component | Technology | Details |
|-----------|-----------|---------|
| **Primary DB** | PostgreSQL | 15+ (via Neon) |
| **ORM Mapping** | SQLAlchemy | Relational models |
| **Alternative DB** | MongoDB | Conceptual schemas provided |
| **Backend Hosting** | Render | Cloud deployment |
| **Frontend Hosting** | Vercel | Edge deployment |
| **Database Hosting** | Neon | Serverless PostgreSQL |

---

## 📂 Project Structure
