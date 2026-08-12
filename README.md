✈️ AI Travel Agent — Frontend

Modern AI travel-planning interface built with React + TypeScript and connected to the FastAPI AI backend.

🌐 Live Demo

🚀 Try the AI Travel Agent

📐 Architecture



🚀 Features

🤖 Natural-language travel input

✈️ Flight information

🏨 Hotel information

🗺️ Travel itinerary

📊 Trip information and visualizations

🔐 Authentication UI

⚡ Real-time AI response interface

📱 Responsive design

🛠️ Tech Stack

React

TypeScript

Tailwind CSS

Axios

React Router

Zustand

🔌 Backend Integration

The frontend communicates with the FastAPI backend through REST APIs.

React Frontend
      ↓
   Axios
      ↓
FastAPI Backend
      ↓
   LangGraph
      ↓
AI Travel Response

Main API endpoints:

POST /auth/signup
POST /auth/signin
POST /ai

📁 Structure

Frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── ...
├── public/
├── package.json
└── README.md

▶️ Run

npm install
npm run dev

The frontend will run on the local development URL shown by Vite.

🔗 Project Links

🌐 Live Demo: https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/

💻 GitHub: https://github.com/Hammadsoftware/ai-travel-agent

👨‍💻 Author

Hammad Tariq — Full Stack / AI Developer