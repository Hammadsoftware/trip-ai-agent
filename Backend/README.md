✈️ AI Travel Agent — Backend

AI-powered travel planning backend built with FastAPI, LangGraph, LangChain, Groq, Tavily, Aviationstack, and PostgreSQL/Neon.

🚀 Features

🤖 Agentic AI travel planning

🧠 LangGraph orchestration

✈️ Flight search

🏨 Hotel search

🗺️ Itinerary generation

📊 Trip statistics

🔎 Tavily web search

⚡ Groq / Llama

🗄️ PostgreSQL / Neon

🚀 FastAPI REST API

📐 Architecture



🧠 Agent Workflow

User Query
    ↓
FastAPI
    ↓
LangGraph
    ↓
├── Flight Agent
├── Hotel Agent
└── Web Search Agent
    ↓
Response Synthesizer
    ↓
Final Response

📡 API

Method

Endpoint

Description

POST

/auth/signup

Create user

POST

/auth/signin

Authenticate user

POST

/ai

AI travel planning

🛠️ Tech Stack

Python

FastAPI

LangGraph

LangChain

Groq / Llama

Tavily

Aviationstack

PostgreSQL / Neon

Psycopg

Uvicorn

📁 Structure

Backend/
├── app/
│   ├── agents/
│   │   ├── graph.py
│   │   └── tools/
│   │       ├── tavily_tool.py
│   │       └── flight_tool.py
│   ├── routers/
│   │   └── auth.py
│   ├── visualizations/
│   │   └── charts.py
│   ├── main.py
│   ├── database.py
│   └── models.py
├── requirements.txt
└── .env

▶️ Run

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

API: http://127.0.0.1:8000

Docs: http://127.0.0.1:8000/docs

🔐 Environment Variables

DATABASE_URL=your_neon_database_url
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key

👨‍💻 Author

Hammad Tariq — Backend / AI Developer