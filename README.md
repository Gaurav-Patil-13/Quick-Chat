# 💬 QuickChat – Real-Time Chat Application

QuickChat is a full-stack real-time messaging platform built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. The application enables secure one-to-one communication with instant message delivery, JWT-based authentication, online/offline user presence tracking, media sharing through Cloudinary, and persistent chat history storage.

The project follows a modern client-server architecture where React handles the frontend user interface, Express and Node.js provide REST APIs and Socket.IO communication, MongoDB stores application data, and Cloudinary manages media uploads. The application is fully responsive and optimized for both desktop and mobile devices.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-black)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blueviolet)

## 📑 Table of Contents

- Features
- System Architecture
- High-Level System Design
- Project Structure
- Data Flow Diagrams
- Request Processing Flow
- Real-Time Messaging Architecture
- Database Schema
- Design Decisions
- How to Use QuickChat
- Tech Stack
- Future Improvements

  
## ✨ Features


### User Features

- User Registration and Login
- JWT Authentication & Authorization
- Real-Time One-to-One Messaging
- Online/Offline User Presence Tracking
- Image and Media Sharing
- Persistent Chat History
- Profile Management
- Real-Time Message Synchronization
- Responsive UI for Mobile & Desktop
- Secure Logout

### Technical Features

- RESTful API Architecture
- WebSocket Communication using Socket.IO
- Cloudinary Media Storage
- MongoDB Data Persistence
- React Context API State Management
- Protected Routes
- Real-Time User Status Updates


---


## 🏗️ System Architecture

┌──────────────────────────────────────────────────────────────┐│                    PRESENTATION LAYER                        ││                         (React.js)                           ││                                                              ││  HomePage.jsx                                                ││  LoginPage.jsx                                               ││  ProfilePage.jsx                                             ││  ChatContainer.jsx                                           ││  SideBar.jsx                                                 ││  RightSideBar.jsx                                            ││                                                              ││  Responsibility:                                             ││  • User Interface                                            ││  • User Interaction                                          ││  • State Rendering                                           ││  • Responsive Design                                         │└──────────────────────────────────────────────────────────────┘│▼┌──────────────────────────────────────────────────────────────┐│                  STATE MANAGEMENT LAYER                      ││                      (Context API)                           ││                                                              ││  AuthContext.jsx                                             ││  ChatContext.jsx                                             ││                                                              ││  Responsibility:                                             ││  • Global User State                                         ││  • Authentication State                                      ││  • Active Chat State                                         ││  • Online Users State                                        ││  • Socket Connection Management                              │└──────────────────────────────────────────────────────────────┘│▼┌──────────────────────────────────────────────────────────────┐│                     API / SOCKET LAYER                       ││                (REST API + Socket.IO)                        ││                                                              ││  userRoutes.js                                               ││  messageRoutes.js                                            ││                                                              ││  Socket Events                                               ││   • sendMessage                                              ││   • receiveMessage                                           ││   • onlineUsers                                              ││                                                              ││  Responsibility:                                             ││  • Client-Server Communication                               ││  • Real-Time Messaging                                       ││  • User Presence Tracking                                    │└──────────────────────────────────────────────────────────────┘│▼┌──────────────────────────────────────────────────────────────┐│                  BUSINESS LOGIC LAYER                        ││                    (Express.js)                              ││                                                              ││  userController.js                                           ││  messageController.js                                        ││  auth.js                                                     ││  protectRoute.js                                             ││                                                              ││  Responsibility:                                             ││  • Authentication                                            ││  • Authorization                                             ││  • Message Processing                                        ││  • Input Validation                                          ││  • Business Rules                                            │└──────────────────────────────────────────────────────────────┘│▼┌──────────────────────────────────────────────────────────────┐│                     DATA LAYER                               ││                                                              ││  MongoDB                                                     ││   ├── Users Collection                                       ││   └── Messages Collection                                    ││                                                              ││  Cloudinary                                                  ││   └── Media Storage                                          ││                                                              ││  Responsibility:                                             ││  • Persistent Storage                                        ││  • Chat History                                              ││  • User Data                                                 ││  • Image Storage                                             │└──────────────────────────────────────────────────────────────┘


---


## 🌐 High-Level System Design

┌───────────────┐│     User      │└───────┬───────┘│▼┌─────────────────────────┐│     React Frontend      │└───────────┬─────────────┘│┌─────────────────┴─────────────────┐│                                   │▼                                   ▼┌─────────────────┐               ┌─────────────────┐│   REST APIs     │               │   Socket.IO     ││ Authentication  │               │ Real-Time Chat  │└────────┬────────┘               └────────┬────────┘│                                 │└──────────────┬──────────────────┘▼┌─────────────────────┐│  Express + Node.js  │└──────────┬──────────┘│┌───────────────┼────────────────┐│                                │▼                                ▼┌─────────────────┐            ┌─────────────────┐│    MongoDB      │            │   Cloudinary    ││                 │            │                 ││ Users           │            │ Images          ││ Messages        │            │ Media Files     │└─────────────────┘            └─────────────────┘

---


## 📂 Project Structure


```text
QuickChat/
│
├── Client/
│   ├── public/
│   │   ├── bgImage.svg
│   │   ├── favicon.svg
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── Components/
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── RightSideBar.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── Server/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── messageController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── protectRoute.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   │
│   ├── Routes/
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── lib/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── utils.js
│   │
│   └── server.js
│
└── README.md
```

---


## 🔄 Data Flow Diagrams


### Registration Flow

```text
User
 │
 ▼
Signup Form
 │
 ▼
POST /api/auth/signup
 │
 ▼
Validate Input
 │
 ▼
Hash Password
 │
 ▼
Store User in MongoDB
 │
 ▼
Generate JWT
 │
 ▼
Authentication Success
```

### Login Flow

```text
User
 │
 ▼
Login Form
 │
 ▼
POST /api/auth/login
 │
 ▼
Verify Credentials
 │
 ▼
Generate JWT
 │
 ▼
Open Dashboard
```

### Send Message Flow

```text
Sender
 │
 ▼
ChatContainer.jsx
 │
 ▼
Socket.IO Event
 │
 ▼
messageController.js
 │
 ▼
Save Message in MongoDB
 │
 ▼
Find Receiver Socket
 │
 ▼
Deliver Message
 │
 ▼
Update Receiver UI
```

### Offline Message Flow

```text
Sender Sends Message
 │
 ▼
Store in MongoDB
 │
 ▼
Receiver Online?
 │
 ├── YES → Deliver Instantly
 │
 └── NO
        ▼
     Store Message
        ▼
Receiver Login
        ▼
Load Chat History
```

### Media Sharing Flow

```text
Select Image
 │
 ▼
Upload to Cloudinary
 │
 ▼
Receive URL
 │
 ▼
Store in MongoDB
 │
 ▼
Send via Socket.IO
 │
 ▼
Display on Receiver Side
```

### User Presence Flow

```text
User Login
 │
 ▼
Socket Connect
 │
 ▼
Store Socket ID
 │
 ▼
Update Online Users List
 │
 ▼
Broadcast Status
```

## ⚙️ Request Processing Flow


```text
User Action
     │
     ▼
React Component
     │
     ▼
Context API
     │
     ▼
REST API / Socket.IO
     │
     ▼
Express Route
     │
     ▼
Middleware (JWT)
     │
     ▼
Controller
     │
     ▼
MongoDB / Cloudinary
     │
     ▼
Response
     │
     ▼
UI Update
```

This flow demonstrates how user requests travel through the frontend, backend, middleware, business logic, and database layers before updating the user interface.

---


## 📡 Real-Time Messaging Architecture


```text
User A
 │
 ▼
Socket.IO Client
 │
 ▼
Socket.IO Server
 │
 ▼
Store Message in MongoDB
 │
 ▼
Find Receiver Socket ID
 │
 ▼
Receiver Online?
 │
 ├── YES
 │      ▼
 │   Deliver Instantly
 │
 └── NO
        ▼
     Store Message
        ▼
     Deliver on Login
```

This architecture ensures reliable message delivery by combining real-time Socket.IO communication with persistent MongoDB storage.

---


## 🗄️ Database Schema


### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  password: String,
  bio: String,
  profilePic: String,
  createdAt: Date
}
```

### Message Collection

```javascript
{
  _id: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  text: String,
  image: String,
  createdAt: Date
}
```

### User Schema Responsibilities

- Store user profile information.
- Manage authentication credentials.
- Maintain profile image and bio data.
- Track account creation details.

### Message Schema Responsibilities

- Store chat messages permanently.
- Maintain sender and receiver relationships.
- Support both text and image messages.
- Preserve conversation history across sessions.

---


## 🎯 Design Decisions


| Design Decision | Why |
|----------------|-----|
| MERN Stack | Provides a unified JavaScript ecosystem across frontend, backend, and database layers, reducing development complexity. |
| Socket.IO | Enables low-latency bidirectional communication and instant real-time message delivery. |
| JWT Authentication | Implements secure and stateless authentication for protecting user sessions and APIs. |
| MongoDB | Offers flexible document-based storage suitable for users, messages, and chat-related data. |
| Cloudinary | Handles media storage efficiently while reducing server storage overhead. |
| React Context API | Simplifies global state management without requiring external libraries such as Redux. |
| Separate User & Message Models | Promotes maintainability and follows the Single Responsibility Principle. |
| Protected Route Middleware | Ensures only authenticated users can access protected resources and APIs. |
| Socket ID Mapping | Maintains active socket connections to enable direct real-time message delivery. |
| Persistent Message Storage | Preserves chat history across page refreshes, logouts, and reconnects. |
| REST API + WebSocket Hybrid Architecture | Uses REST APIs for standard CRUD operations and Socket.IO for real-time communication. |
| MVC Backend Architecture | Separates Models, Controllers, Routes, and Middleware for scalability and maintainability. |
| Context-Based Authentication State | Provides application-wide access to user authentication data without prop drilling. |
| Media URL Storage Instead of File Storage | Stores Cloudinary URLs in MongoDB rather than actual files, improving performance and reducing database size. |
| Responsive UI Design | Ensures seamless usability across desktop, tablet, and mobile devices. |
| Cloud-Based Deployment (Vercel + Render) | Enables easy deployment, scalability, and accessibility from any location. |

---


## 🚀 How to Use QuickChat


1. Register or Login
2. View Users
3. Start a Chat
4. Send Messages
5. Share Images
6. Track User Presence
7. Logout

---

## 💻 Tech Stack


### Frontend
- React.js
- Vite
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication

### Database & Storage
- MongoDB
- Cloudinary

### Deployment
- Vercel (Frontend)
- Render (Backend)

---


## 🚀 Future Improvements


- Add Group Chat functionality for communication among multiple users.
- Implement Message Read Receipts (Sent, Delivered, Seen).
- Add Typing Indicators to show when a user is composing a message.
- Support Voice and Video Calling using WebRTC.
- Enable Push Notifications for offline users.
- Add Message Search and Chat Filtering features.
- Implement End-to-End Encryption for enhanced security.
- Introduce Redis for scalable real-time user session management.
- Support File Sharing (PDFs, Documents, ZIP files).
- Add Message Reactions, Emojis, and Dark Mode support.
  

## 👨‍💻 Author


**Gaurav Patil**

- Walchand College of Engineering, Sangli
- Assistant Aptitude Developer, ACSES
- MERN Stack & Competitive Programming Enthusiast

---
