# Flashcard Learning App with Leitner System

## 📌 Project Overview
This project is a **Flashcard Learning App** built using the **MERN (MongoDB, Express, React, Node.js) stack**, integrating the **Leitner System** for spaced repetition. Users can create, review, and progress through flashcards, optimizing learning efficiency.

## 🚀 Features
- Add, update, delete, and review flashcards
- Implements the **Leitner System**:
  - Flashcards start in Box 1
  - Correct answers move to the next box
  - Incorrect answers reset to Box 1
  - Higher boxes have longer review intervals
- Fetch flashcards based on their **next review date** (spaced repetition logic)
- Minimal and clean UI for better focus
- **Bonus Features:**
  - JWT Authentication (User Progress Saving)
  - Dark Mode Toggle
  - Smooth animations using Framer Motion
  - Deployed on Vercel/Render

---

## 🛠️ Tech Stack
### **Frontend:**
- React
- React Hooks
- Axios
- Tailwind CSS / Bootstrap
- Framer Motion (for animations)

### **Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication

---

## 🏗️ Thought Process
1. **Understanding the Leitner System:**
   - Designed the logic for handling spaced repetition.
   - Implemented five boxes with increasing review intervals.
   
2. **Structuring the Backend:**
   - Defined a **Flashcard Model** with fields: `question`, `answer`, `box`, `nextReview`.
   - Created API routes for CRUD operations and logic to update review status.

3. **Designing the Frontend:**
   - Built a minimal UI with **React Hooks** for managing state.
   - Created components for displaying, answering, and updating flashcards.

4. **Handling API Requests:**
   - Used **Axios** to fetch flashcards based on their `nextReview` date.
   - Integrated the spaced repetition logic into frontend interactions.

5. **Enhancements:**
   - Implemented **JWT Authentication** for user-based flashcard tracking.
   - Added **Dark Mode Toggle** for better UX.
   - Deployed the app on **Vercel/Render**.

---

## 🔧 Setup Instructions
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/flashcard-app.git
cd flashcard-app
```

### 2️⃣ **Backend Setup**
```sh
cd backend
npm install
```
#### Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
#### Start the backend server:
```sh
npm run dev
```

### 3️⃣ **Frontend Setup**
```sh
cd ../frontend
npm install
```
#### Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```
#### Start the frontend:
```sh
npm run dev
```

---

## 🚀 Deployment
- **Backend:** Hosted on **Render** or **Railway**
- **Frontend:** Deployed on **Vercel**

---

## 🛠️ API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/flashcards` | Add a new flashcard |
| `GET` | `/flashcards` | Get all flashcards |
| `PUT` | `/flashcards/:id` | Update flashcard (move to next box or reset) |
| `DELETE` | `/flashcards/:id` | Delete a flashcard |

---

## 📝 Future Improvements
- **Leaderboard System** for user motivation
- **Custom Review Intervals**
- **AI-Based Smart Flashcard Suggestions**

### 💡 Happy Learning! 🚀
