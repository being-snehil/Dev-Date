# DevTinder Backend 🚀

## 📌 Overview
DevDate is a **MERN stack** web application designed to help developers **connect and collaborate**, similar to Tinder but specifically for developers. Users can create profiles, explore other developers, send connection requests, manage their matches, and communicate in real-time.

This repository contains the **backend** of DevTinder, built with **Node.js, Express, and MongoDB**, following a **microservices architecture** for scalability.

> ✅ **Status:** The backend is **feature-complete** with real-time capabilities, advanced search, and comprehensive testing suite.

---

## 🛠️ Tech Stack
- **Backend Framework**: [Node.js](https://nodejs.org/en) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Real-time Communication**: [Socket.IO](https://socket.io/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/) + Cookies
- **Encryption**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- **Testing**: [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest)
- **API Testing**: Postman
- **Environment Variables**: dotenv
- **Package Manager**: npm

---

## 🔑 Features Implemented

### **1. Authentication System**
✅ User Signup, Login, and Logout  
✅ JWT-based authentication with secure cookies  
✅ Password encryption using **bcryptjs**  
✅ Authentication middleware to protect routes  

### **2. User Profile Management**
✅ View user profile  
✅ Edit profile details (restricted fields for security)  
✅ Update password with validation  
✅ Profile picture upload support  

### **3. Connection Request System**
✅ Send connection requests (`Interested` or `Ignored`)  
✅ Accept or reject received requests  
✅ Prevent duplicate requests using MongoDB validation  
✅ Prevent self-requests using Mongoose `.pre` middleware  

### **4. Feed API & Pagination**
✅ Fetch suggested developers while excluding:  
   - Logged-in user  
   - Existing connections  
   - Ignored users  
   - Users with pending requests  
✅ Implemented **pagination** using `skip` & `limit`  
✅ Optimized query using **MongoDB $nin and $ne operators**  

### **5. Real-time Features** 🆕
✅ **WebSocket Integration with Socket.IO**  
✅ Real-time notifications for:
   - New connection requests
   - Accepted/rejected requests
   - New messages
✅ Online/offline user status tracking  
✅ Real-time user presence indicators  

### **6. Messaging System** 🆕
✅ **One-on-one messaging** between connected users  
✅ Message history persistence in MongoDB  
✅ Real-time message delivery using Socket.IO  
✅ Read receipts and typing indicators  
✅ Message pagination for chat history  

### **7. Advanced Search & Filtering** 🆕
✅ Search developers by:
   - Skills (e.g., React, Node.js, Python)
   - Location
   - Experience level
   - Programming languages
✅ Multi-criteria filtering with query parameters  
✅ Full-text search implementation  
✅ Indexed search fields for performance  

### **8. Comprehensive Testing Suite** 🆕
✅ **Unit Tests** for all major functions  
✅ **Integration Tests** for API endpoints  
✅ **Test Coverage** > 80%  
✅ Automated testing with Jest & Supertest  
✅ Mock database for isolated testing  

### **9. Database Design**
✅ **User Schema**:
   - Sanitized input fields (`trim`, `lowercase`, validation)
   - Unique constraints on email and username  
   - Skills array for search functionality  

✅ **ConnectionRequest Schema**:
   - `fromUserId`, `toUserId`, `status` with **enum validation**
   - Indexed fields for optimized queries  

✅ **Message Schema** 🆕:
   - Sender/receiver references
   - Timestamps for message ordering
   - Read status tracking

### **10. Advanced Query Optimization**
✅ **Indexes & Compound Indexes**  
✅ Database query optimization for search  
✅ Caching strategies for frequently accessed data  

---

## 🚀 API Endpoints

### **1️⃣ Authentication Routes**
| Method | Endpoint      | Description          | Auth Required |
|--------|--------------|----------------------|--------------|
| POST   | `/auth/signup` | Register a new user | ❌ |
| POST   | `/auth/login` | Authenticate user & issue JWT | ❌ |
| POST   | `/auth/logout` | Logout user by clearing JWT cookie | ✅ |

### **2️⃣ User Profile Routes**
| Method | Endpoint           | Description              | Auth Required |
|--------|-------------------|------------------------|--------------|
| GET    | `/profile/view`   | Get logged-in user profile | ✅ |
| PATCH  | `/profile/edit`   | Update allowed profile fields | ✅ |
| PATCH  | `/profile/password` | Update user password | ✅ |

### **3️⃣ Connection Request Routes**
| Method | Endpoint                                    | Description                 | Auth Required |
|--------|--------------------------------------------|-----------------------------|--------------|
| POST   | `/request/send/:status/:toUserId`         | Send a connection request | ✅ |
| POST   | `/request/review/:status/:requestId`      | Accept/Reject a request | ✅ |
| GET    | `/user/requests/received`                 | Fetch pending requests | ✅ |
| GET    | `/user/connections`                       | Fetch accepted connections | ✅ |

### **4️⃣ Feed & Search APIs** 🆕
| Method | Endpoint      | Description                              | Auth Required |
|--------|--------------|----------------------------------------|--------------|
| GET    | `/user/feed?page=1&limit=10` | Get suggested profiles with pagination | ✅ |
| GET    | `/user/search?skills=React,Node&location=NYC` | Search with filters | ✅ |

### **5️⃣ Messaging Routes** 🆕
| Method | Endpoint                          | Description              | Auth Required |
|--------|----------------------------------|------------------------|--------------|
| GET    | `/messages/:userId`              | Get chat history       | ✅ |
| POST   | `/messages/send/:userId`         | Send a message         | ✅ |
| PATCH  | `/messages/read/:messageId`      | Mark message as read   | ✅ |

### **6️⃣ Real-time Events (Socket.IO)** 🆕
- `connection` - User comes online
- `disconnect` - User goes offline
- `send-message` - Send real-time message
- `receive-message` - Receive real-time message
- `notification` - Real-time notifications
- `typing` - Typing indicator

---

## 🏗️ Setup & Running the Server

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/being-snehil/Dev-Date.git
cd DevDate
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file and add:
```ini
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder
JWT_SECRET=your_jwt_secret
PORT=3000
SOCKET_PORT=3001
```

### **4️⃣ Start the Backend Server**
```bash
npm start
```
Server runs at: `http://localhost:3000/`  
WebSocket server runs at: `http://localhost:3001/`

### **5️⃣ Run Tests** 🆕
```bash
npm test
```

For test coverage report:
```bash
npm run test:coverage
```

---

## 🔗 Frontend Integration
The frontend for DevTinder is available at:
```bash
git clone https://github.com/being-snehil/Dev-Date.git
cd DevDate-UI
```

Make sure the backend is running before accessing the frontend.

---

## 📊 Project Status
✅ **Authentication & Authorization** - Complete  
✅ **User Profile Management** - Complete  
✅ **Connection System** - Complete  
✅ **Feed & Pagination** - Complete  
✅ **Real-time Notifications** - Complete 🆕  
✅ **Messaging System** - Complete 🆕  
✅ **Search & Filtering** - Complete 🆕  
✅ **Unit Testing** - Complete 🆕  

---

## 📢 Contribution Guidelines
The project is feature-complete, but contributions for optimization and new features are welcome!
✅ Open issues for bugs or feature requests  
✅ Fork the repository and submit pull requests  
✅ Follow the existing code style and add tests for new features  

---

## 🚀 Potential Future Enhancements
🔹 Video calling integration  
🔹 Group messaging/channels  
🔹 AI-powered matching suggestions  
🔹 OAuth integration (GitHub, Google)  
🔹 Mobile app development  
🔹 Advanced analytics dashboard  

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author
**Snehil**  
- GitHub: [@being-snehil](https://github.com/being-snehil)
- Project: [DevDate](https://github.com/being-snehil/Dev-Date)

---
