# SigmaGPT 🤖

A full-stack AI chat application built with Node.js, Express, MongoDB, and Groq AI — similar to ChatGPT with multi-thread conversation support.

---

## 🚀 Features

- 💬 Multi-thread chat (create, view, delete conversations)
- 🧠 AI responses powered by Groq API (Llama 3.3 70B)
- 🗄️ Persistent chat history with MongoDB
- ⚡ Fast and lightweight backend with Express.js
- 🌐 CORS enabled for frontend integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| AI Model | Groq API (llama-3.3-70b-versatile) |
| Environment | dotenv |

---

## 📁 Project Structure

SigmaGPT/
├── Backend/
│   ├── models/
│   │   └── Thread.js
│   ├── routes/
│   │   └── chat.js
│   ├── utils/
│   │   └── openai.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
---

## ⚙️ Setup & Installation

### 1. Clone the repository

git clone https://github.com/anchalmaurya0206/SigmaGPT.git
cd SigmaGPT/Backend
### 2. Install dependencies

npm install
### 3. Create .env file

MONGODB_URL=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
### 4. Get your API keys

- MongoDB: [mongodb.com/atlas](https://www.mongodb.com/atlas) — Free cluster available
- Groq API: [console.groq.com](https://console.groq.com) — Free, no credit card needed

### 5. Start the server

npm start
Server will run on http://localhost:8080

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/thread | Get all chat threads |
| GET | /api/thread/:threadId | Get messages of a thread |
| POST | /api/chat | Send a message & get AI reply |
| DELETE | /api/thread/:threadId | Delete a thread |

### Example Request

POST /api/chat
{
  "threadId": "unique-thread-id",
  "message": "Hello, how are you?"
}
### Example Response

{
  "reply": "I'm doing great! How can I help you today?"
}
---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| MONGODB_URL | MongoDB connection string |
| GROQ_API_KEY | Groq API key for AI responses |

---

## 👤 Author

Anchal Maurya
GitHub: [@anchalmaurya0206](https://github.com/anchalmaurya0206)

---

> Built with ❤️ using Groq AI — Free & Fast!
