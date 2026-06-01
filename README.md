Campus Vault - Student Resource Sharing Platform

Overview

Campus Vault is a modern resource-sharing platform built for students to organize, upload, search, and share academic resources such as notes, PDFs, previous year question papers, and useful learning links.

The goal of this project is to solve a common problem faced by students: losing important study materials across chats, drives, and social media groups. Campus Vault provides a centralized place where students can securely store and access educational resources anytime.

---

Features

Authentication

- User Registration
- User Login
- Comments and bookmarks
- Secure Authentication using Firebase Auth
- Protected Routes
- Logout Functionality

Resource Management

- Upload PDF Notes
- Upload Previous Year Question Papers
- Save Educational Links
- Categorize Resources by Subject
- Add Resource Descriptions

Search & Discovery

- Search Resources by Title
- Filter Resources by Subject
- Quick Access to Uploaded Resources

User Experience

- Responsive Design
- Light Mode / Dark Mode
- Modern Dashboard Interface
- Mobile-Friendly Layout

Storage

- Secure File Uploads using Firebase Storage
- Cloud-based Resource Access
- Download Resources Anytime

---

Tech Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS

State Management

- Redux Toolkit

Backend Services

- Firebase Authentication
- Firebase Firestore
- Firebase Storage

Deployment

- Vercel

---

Database Design

Firestore Collection

resources

{
  title: "DSA Notes",
  subject: "Computer Science",
  fileUrl: "https://...",
  uploadedBy: "userId",
  createdAt: Timestamp
}

---

Installation

Clone the repository:

git clone https://github.com/Aisha-shaikh578/CampusVault

Install dependencies:

npm install

Run development server:

npm run dev

---

Environment Variables

Create a ".env.local" file in the root directory:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

---

Future Enhancements

- Resource Rating System
- Resource Recommendations
- AI-powered Resource Search
- Semester-wise Categorization
- Resource Analytics Dashboard

---

Learning Outcomes

This project demonstrates:

- Authentication Implementation
- CRUD Operations
- Cloud Storage Integration
- Database Design
- State Management
- Responsive UI Development
- Real-world Project Architecture
- Frontend and Backend Integration

---

Screenshots

- Login Page
- Dashboard
- Upload Resource Page
- Dark Mode Interface

---

Author

Aisha Shaikh

Built with Next.js, Tailwind CSS, Redux Toolkit, Firebase Authentication, Firestore, and Firebase Storage.