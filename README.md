# 💬 QuickChat – Real-Time Chat Application

QuickChat is a full-stack real-time messaging platform built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. The application enables secure one-to-one communication with instant message delivery, JWT-based authentication, online/offline user presence tracking, media sharing through Cloudinary, and persistent chat history storage.

The project follows a modern client-server architecture where React handles the frontend user interface, Express and Node.js provide REST APIs and Socket.IO communication, MongoDB stores application data, and Cloudinary manages media uploads. The application is fully responsive and optimized for both desktop and mobile devices.

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-black)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blueviolet)

## 📑 Table of Contents

- ✨ [Features](#features)
- 🏗️ [System Architecture](#system-architecture)
- 🌐 [High-Level System Design](#high-level-system-design)
- 📂 [Project Structure](#project-structure)
- 🔄 [Data Flow Diagrams](#data-flow-diagrams)
- ⚙️ [Request Processing Flow](#request-processing-flow)
- 📡 [Real-Time Messaging Architecture](#real-time-messaging-architecture)
- 🗄️ [Database Schema](#database-schema)
- 🎯 [Design Decisions](#design-decisions)
- 🚀 [How to Use QuickChat](#how-to-use-quickchat)
- 💻 [Tech Stack](#tech-stack)
- 🔮 [Future Improvements](#future-improvements)
- 👨‍💻 [Author](#author)



## 📸 Screenshots

### 🔐 Login Page
Secure user authentication with JWT-based login and registration.

![Login Page]("D:\PROJECTS\CHAT-BOX\github_image\login-page.jpeg")

---

### 💬 Real-Time Chat Interface
Instant messaging with Socket.IO, image sharing, and real-time communication.

![Chat Interface]("D:\PROJECTS\CHAT-BOX\github_image\chat-interface.jpeg")

---

### 👥 User Directory
Browse and search available users to start conversations.

![User Directory]("D:\PROJECTS\CHAT-BOX\github_image\user-directory.jpeg")

---

### 👤 User Profile & Shared Media
View profile information, uploaded media, and account details.

![Profile Page]("D:\PROJECTS\CHAT-BOX\github_image\profile-page.jpeg")


---

  
## Features


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


## System Architecture


QuickChat follows a 5-Layer Distributed Architecture where each layer has a dedicated responsibility. This separation improves maintainability, scalability, and security.

```text
┌──────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                         (React.js)                           │
│                                                              │
│  HomePage.jsx                                                │
│  LoginPage.jsx                                               │
│  ProfilePage.jsx                                             │
│  ChatContainer.jsx                                           │
│  SideBar.jsx                                                 │
│  RightSideBar.jsx                                            │
│                                                              │
│  Responsibility:                                             │
│  • User Interface                                            │
│  • User Interaction                                          │
│  • State Rendering                                           │
│  • Responsive Design                                         │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                  STATE MANAGEMENT LAYER                      │
│                      (Context API)                           │
│                                                              │
│  AuthContext.jsx                                             │
│  ChatContext.jsx                                             │
│                                                              │
│  Responsibility:                                             │
│  • Global User State                                         │
│  • Authentication State                                      │
│  • Active Chat State                                         │
│  • Online Users State                                        │
│  • Socket Connection Management                              │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     API / SOCKET LAYER                       │
│                (REST API + Socket.IO)                        │
│                                                              │
│  userRoutes.js                                               │
│  messageRoutes.js                                            │
│                                                              │
│  Socket Events                                               │
│   • sendMessage                                              │
│   • receiveMessage                                           │
│   • onlineUsers                                              │
│                                                              │
│  Responsibility:                                             │
│  • Client-Server Communication                               │
│  • Real-Time Messaging                                       │
│  • User Presence Tracking                                    │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                        │
│                    (Express.js)                              │
│                                                              │
│  userController.js                                           │
│  messageController.js                                        │
│  auth.js                                                     │
│  protectRoute.js                                             │
│                                                              │
│  Responsibility:                                             │
│  • Authentication                                            │
│  • Authorization                                             │
│  • Message Processing                                        │
│  • Input Validation                                          │
│  • Business Rules                                            │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│                                                              │
│  MongoDB                                                     │
│   ├── Users Collection                                       │
│   └── Messages Collection                                    │
│                                                              │
│  Cloudinary                                                  │
│   └── Media Storage                                          │
│                                                              │
│  Responsibility:                                             │
│  • Persistent Storage                                        │
│  • Chat History                                              │
│  • User Data                                                 │
│  • Image Storage                                             │
└──────────────────────────────────────────────────────────────┘
```

---


## High-Level System Design

```text
                   ┌───────────────┐
                   │     User      │
                   └───────┬───────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │     React Frontend      │
              └───────────┬─────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌─────────────────┐               ┌─────────────────┐
│   REST APIs     │               │   Socket.IO     │
│ Authentication  │               │ Real-Time Chat  │
└────────┬────────┘               └────────┬────────┘
         │                                 │
         └──────────────┬──────────────────┘
                        ▼
             ┌─────────────────────┐
             │  Express + Node.js  │
             └──────────┬──────────┘
                        │
        ┌───────────────┼────────────────┐
        │                                │
        ▼                                ▼
┌─────────────────┐            ┌─────────────────┐
│    MongoDB      │            │   Cloudinary    │
│                 │            │                 │
│ Users           │            │ Images          │
│ Messages        │            │ Media Files     │
└─────────────────┘            └─────────────────┘
```


---


## Project Structure


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


## Data Flow Diagrams


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

## Request Processing Flow


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


## Real-Time Messaging Architecture


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


## Database Schema


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


## Design Decisions


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


## Installation Guide


### Prerequisites

Before running the project, ensure you have the following installed:

* Node.js (v18 or above)
* npm
* MongoDB Atlas Account
* Cloudinary Account
* Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/QuickChat.git

cd QuickChat
```

### Backend Setup

```bash
cd Server

npm install
```

Create a `.env` file inside the **Server** directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run server
```

### Frontend Setup

```bash
cd Client

npm install
```

Create a `.env` file inside the **Client** directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### Run Application

Backend:

```bash
cd Server
npm run server
```

Frontend:

```bash
cd Client
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 🚀 How to Use QuickChat

### 1. Register or Login

Create a new account using your email and password, or log in with existing credentials.

### 2. View Users

Browse all available users from the sidebar. Online users are updated in real time.

### 3. Start a Chat

Select any user to open a conversation. Previous messages are automatically loaded.

### 4. Send Messages

Type a message and click **Send**. Messages are instantly delivered through Socket.IO.

### 5. Share Images

Upload images directly in chat. Files are securely stored using Cloudinary.

### 6. Track User Presence

View online and offline users in real time.

### 7. Logout

Securely logout and disconnect the active socket session.



## How to Use QuickChat

| Step | Action |
|------|---------|
| **1** | Register a new account or login using existing credentials. |
| **2** | Browse available users from the sidebar. |
| **3** | Select a user to start a conversation. |
| **4** | Send messages instantly using Socket.IO. |
| **5** | Share images and media through Cloudinary integration. |
| **6** | View real-time online/offline user status. |
| **7** | Logout securely and disconnect the active session. |

---

## Tech Stack


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


## Future Improvements


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


---
  

## Author


**Gaurav Patil**

- Walchand College of Engineering, Sangli
- MERN Stack & Competitive Programming Enthusiast

---
