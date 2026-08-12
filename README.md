✈️ AI Travel Agent

<p align="center">
  <strong>An AI-powered travel planning assistant built with FastAPI, LangGraph, Groq, Tavily, and PostgreSQL.</strong>
</p>

<p align="center">
  <a href="https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/">
    🌐 <strong>Live Demo</strong>
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/Hammadsoftware/ai-travel-agent">
    💻 GitHub Repository
  </a>
</p>

🌐 Live Application

🚀 Try the AI Travel Agent

The deployed application provides an AI-powered interface for natural-language travel planning, including flight and hotel search, travel information, itinerary generation, and trip-related insights.

📐 Application Architecture

The following architecture shows how the React frontend communicates with the FastAPI backend, how LangGraph orchestrates specialized agents, and how those agents interact with external APIs, tools, LLMs, and data storage.



Architecture Overview

Frontend — React

Natural-language travel requests

Responsive travel-planning interface

React + TypeScript

Tailwind CSS

Axios API calls

React Router

Zustand state management

Backend API — FastAPI

REST API layer

Request validation with Pydantic

Handles frontend requests and responses

Connects the frontend with the AI agent workflow

AI Agent Orchestration — LangGraph

Supervisor/router agent

Flight agent

Hotel agent

Web search agent

Response synthesizer

Stateful agent workflow

Tools, APIs & LLM

Aviationstack for flight information

Hotel/accommodation APIs or web search

Tavily for travel-related web search

Groq/Llama for natural-language understanding and response generation

Data & Storage

PostgreSQL / Neon

Users

Chat history

Saved trips / itineraries

Preferences

Optional vector store for RAG and travel knowledge

🧠 What Is AI Travel Agent?

AI Travel Agent is an agentic AI travel assistant that understands natural-language travel requests and orchestrates multiple AI agents to search for flights, find hotels, generate itineraries, calculate trip statistics, and return structured travel information.

A user can ask something like:

"Plan a trip from Lahore to Dubai next week and find suitable flights and hotels."

The system analyzes the request, routes it to the appropriate agents, gathers information through external tools/APIs, and synthesizes the results into a final response.

🚀 Features

🤖 Agentic AI travel planning

🧠 LangGraph workflow orchestration

✈️ Flight search

🏨 Hotel search

🗺️ Automatic itinerary generation

📊 Trip statistics

📈 Plotly-ready visualization data

🔐 User signup and signin

🗄️ Neon PostgreSQL database

🔎 Tavily web search

⚡ Groq-powered LLM

🚀 FastAPI REST API

🐍 Python backend

📦 Modular agent architecture

🔌 Frontend-ready JSON responses

🏗️ System Architecture

                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Travel Planner     │
                         └──────────┬───────────┘
                                    │
                              HTTP / HTTPS
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       FastAPI        │
                         │      Backend API     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      LangGraph       │
                         │ Agent Orchestration  │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
      │ Flight Agent │      │ Hotel Agent  │      │ Web Search   │
      │              │      │              │      │ Agent        │
      └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
             │                     │                     │
             ▼                     ▼                     ▼
       Aviationstack        Hotel APIs / Web          Tavily
             │                     │                     │
             └─────────────────────┼─────────────────────┘
                                   ▼
                         ┌──────────────────────┐
                         │  Response Synthesizer│
                         │                      │
                         │ Final Travel Plan    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         └──────────────────────┘

🔄 Request Flow

A typical request follows this flow:

User Query
    ↓
React Frontend
    ↓
FastAPI / AI API
    ↓
LangGraph
    ↓
Supervisor / Router Agent
    ↓
┌──────────────┬──────────────┬────────────────┐
│              │              │                │
▼              ▼              ▼                │
Flight Agent   Hotel Agent    Web Search Agent │
│              │              │                │
▼              ▼              ▼                │
Flight Data    Hotel Data     Travel Data      │
└──────────────┴──────────────┴────────────────┘
                    ↓
             Response Synthesizer
                    ↓
              Final AI Response
                    ↓
              React Frontend

🧠 Agentic AI Workflow

The system uses LangGraph to orchestrate the travel-planning workflow.

For example:

"Plan a trip from Lahore to Dubai"
                    │
                    ▼
              FastAPI / AI
                    │
                    ▼
                LangGraph
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   Flight Agent Hotel Agent Web Search
        │           │           │
        ▼           ▼           ▼
   Flight Data  Hotel Data  Web Results
        │           │           │
        └───────────┼───────────┘
                    ▼
             Trip Planning
                    │
                    ▼
           Itinerary Generation
                    │
                    ▼
           Statistics / Charts
                    │
                    ▼
              Final Response

Specialized Agents

✈️ Flight Agent

Responsible for understanding flight-related requests and retrieving flight information.

User Query
    ↓
Flight Agent
    ↓
Flight Tool / Aviationstack
    ↓
Flight Data

🏨 Hotel Agent

Responsible for extracting the destination and retrieving hotel information.

User Query
    ↓
Hotel Agent
    ↓
Hotel Search
    ↓
Hotel Data

🌐 Web Search Agent

Uses Tavily to retrieve travel-related information such as places, attractions, guides, and other travel information.

AI Agent
    ↓
Tavily
    ↓
Web Results
    ↓
Agent Processing

✨ Response Synthesizer

Combines the results produced by the specialized agents and generates the final travel response.

🛠️ Tech Stack

Frontend

Technology

Purpose

React

User interface

TypeScript

Type safety

Tailwind CSS

Styling

Axios

API communication

React Router

Client-side routing

Zustand

State management

Backend

Technology

Purpose

Python

Backend language

FastAPI

REST API framework

Uvicorn

ASGI server

Pydantic

Request validation

Psycopg 3

PostgreSQL connection

Psycopg Pool

Database connection pooling

Agentic AI

Technology

Purpose

LangGraph

Agent workflow orchestration

LangChain

LLM and agent framework

LangChain Groq

Groq integration

Groq

LLM inference

Tavily

Web search

External APIs / Tools

Tool

Purpose

Aviationstack

Flight information

Hotel / Web APIs

Hotel information

Tavily

Travel web search

Groq / Llama

Natural-language understanding and generation

Database

Technology

Purpose

PostgreSQL

Relational database

Neon

Serverless PostgreSQL

Psycopg

Python PostgreSQL driver

Visualization

Technology

Purpose

Plotly

Interactive charts

Custom chart services

Travel visualizations

📁 Project Structure

ai-travel-agent/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── test_db.py
│   │   │
│   │   ├── agents/
│   │   │   ├── __init__.py
│   │   │   ├── graph.py
│   │   │   │
│   │   │   └── tools/
│   │   │       ├── tavily_tool.py
│   │   │       └── flight_tool.py
│   │   │
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   └── auth.py
│   │   │
│   │   └── visualizations/
│   │       ├── __init__.py
│   │       └── charts.py
│   │
│   ├── .env
│   ├── .gitignore
│   ├── requirements.txt
│   └── README.md
│
├── docs/
│   └── architecture.png
│
└── README.md

🔐 Authentication

The backend provides authentication endpoints.

Signup

POST /auth/signup

Example request:

{
  "name": "Hammad",
  "email": "hammad@example.com",
  "password": "123456"
}

Example response:

{
  "message": "Signup successful",
  "user": {
    "id": 1,
    "name": "Hammad",
    "email": "hammad@example.com",
    "created_at": "..."
  }
}

Signin

POST /auth/signin

Example request:

{
  "email": "hammad@example.com",
  "password": "123456"
}

Example response:

{
  "message": "Signin successful",
  "user": {
    "id": 1,
    "name": "Hammad",
    "email": "hammad@example.com"
  }
}

🤖 AI Travel API

Main Endpoint

POST /ai

Example request:

{
  "query": "Plan a trip from Lahore to Dubai"
}

The LangGraph workflow processes the request and returns structured travel information.

Example response structure:

{
  "success": true,
  "query": "Plan a trip from Lahore to Dubai",
  "response": "Here is your travel plan...",
  "data": {
    "flights": {
      "result": "...",
      "items": []
    },
    "hotels": {
      "result": "...",
      "items": []
    },
    "itinerary": [],
    "trip_stats": {},
    "visualizations": {
      "flights": [],
      "hotels": []
    }
  },
  "meta": {
    "llm_calls": 3
  }
}

📡 API Overview

Method

Endpoint

Description

POST

/auth/signup

Create a new user

POST

/auth/signin

Authenticate user

POST

/ai

AI travel planning

The backend intentionally keeps the public API minimal:

/auth/signup
/auth/signin
/ai

🗄️ Database Architecture

The application uses Neon PostgreSQL.

┌──────────────┐
│    users     │
├──────────────┤
│ id           │
│ name         │
│ email        │
│ password     │
│ created_at   │
└──────┬───────┘
       │
       │ user_id
       ▼
┌─────────────────────┐
│   conversations     │
├─────────────────────┤
│ id                  │
│ user_id             │
│ title               │
│ created_at          │
└──────────┬──────────┘
           │
           │ conversation_id
           ▼
┌──────────────┐
│   messages   │
├──────────────┤
│ id           │
│ conversation │
│ role         │
│ content      │
│ created_at   │
└──────────────┘

Database Relationships

User
 │
 └── 1 : N ─── Conversations
                  │
                  └── 1 : N ─── Messages

⚙️ Environment Variables

Create a .env file inside the backend:

DATABASE_URL=your_neon_database_url
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key

If your flight integration requires an Aviationstack key, configure it according to the backend implementation.

⚠️ Security

Never commit .env to GitHub.

Add the following to .gitignore:

.env
.venv/
__pycache__/
*.pyc

📦 Installation

1. Clone the repository

git clone https://github.com/Hammadsoftware/ai-travel-agent.git
cd ai-travel-agent

2. Backend setup

cd Backend

Create a virtual environment:

python3 -m venv .venv

Activate it on Linux/macOS:

source .venv/bin/activate

On Windows:

.venv\Scriptsctivate

Install dependencies:

pip install -r requirements.txt

🗄️ Database Setup

Make sure your .env contains your Neon PostgreSQL connection string:

DATABASE_URL=postgresql://...

Test the database connection:

python -m app.test_db

Expected:

Database connected successfully!
PostgreSQL 18.x

Create the application tables:

python -m app.models

Expected:

Database tables created successfully!

▶️ Run the Backend

Start the FastAPI development server:

python -m uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Interactive API Documentation

http://127.0.0.1:8000/docs

Alternative Documentation

http://127.0.0.1:8000/redoc

🔌 Frontend Integration

The backend is designed to work with a modern React-based frontend.

Example API request:

const response = await fetch(
  "https://your-api-url.com/ai",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: "Plan a trip from Lahore to Dubai"
    })
  }
);

const data = await response.json();

Access the AI response:

data.response

Flights:

data.data.flights

Hotels:

data.data.hotels

Itinerary:

data.data.itinerary

Trip statistics:

data.data.trip_stats

Visualizations:

data.data.visualizations

📊 Visualization System

The application generates frontend-ready visualization data.

Supported visualization categories include:

Flight Charts

Flight comparisons

Flight statistics

Hotel Charts

Hotel comparisons

Hotel statistics

Trip Statistics

Flight information

Hotel information

Overall trip data

The response contains Plotly-compatible data so the frontend can render interactive charts.

☁️ Deployment Architecture

A recommended production architecture is:

                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │ React Frontend  │
              └────────┬────────┘
                       │
                      HTTPS
                       │
                       ▼
              ┌─────────────────┐
              │    Railway      │
              │                 │
              │    FastAPI      │
              │    LangGraph    │
              └────────┬────────┘
                       │
            ┌──────────┼───────────┐
            │          │           │
            ▼          ▼           ▼
         ┌──────┐   ┌──────┐   ┌────────┐
         │ Neon │   │ Groq │   │ Tavily │
         │  DB  │   │ LLM  │   │ Search │
         └──────┘   └──────┘   └────────┘

Recommended Services

Component

Service

Frontend

Vercel

Backend

Railway

Database

Neon PostgreSQL

LLM

Groq

Web Search

Tavily

🔒 Security Notes

For production deployment:

Store secrets in environment variables.

Never commit .env.

Never expose API keys to the frontend.

Use HTTPS.

Add proper authentication tokens/JWT.

Hash passwords before production use.

Validate user input.

Add rate limiting to AI endpoints.

Restrict CORS to trusted frontend domains.

🚧 Future Improvements

Planned improvements include:

JWT authentication

Secure password hashing

Conversation history

Persistent AI chat sessions

Streaming AI responses

Real-time agent updates

More travel APIs

Flight booking integration

Hotel booking integration

User travel history

Saved trips

Multi-destination planning

Budget optimization

Personalized recommendations

Production monitoring

Rate limiting

Automated tests

🎯 Use Cases

✈️ Flight Planning

"Find flights from Lahore to Dubai"

🏨 Hotel Planning

"Find hotels in Dubai"

🗺️ Complete Trip Planning

"Plan a 5-day trip from Lahore to Dubai"

💰 Budget Travel

"Plan a budget trip from Lahore to Istanbul"

🌍 International Travel

"Plan a trip from Pakistan to France"

The agent transforms natural-language requests into structured travel information.

🧠 Why LangGraph?

Instead of relying on a single LLM call:

User
 ↓
LLM
 ↓
Response

This application uses a multi-agent workflow:

User
 ↓
LangGraph
 ↓
Agent Workflow
 ├── Flight Agent
 ├── Hotel Agent
 ├── Web Search
 ├── Planning
 └── Visualization
 ↓
Final AI Response

This architecture makes the system easier to extend with additional agents, tools, memory, and decision-making logic.

📈 Project Vision

The long-term goal is to evolve the project into a complete AI travel-planning platform where users can:

Ask
 ↓
Plan
 ↓
Compare
 ↓
Customize
 ↓
Save
 ↓
Book

The architecture is designed so additional travel agents and external services can be added without rewriting the entire backend.

👨‍💻 Author

Hammad Tariq

Backend / AI Developer

Focused on:

Python

FastAPI

LangChain

LangGraph

Agentic AI

Next.js

PostgreSQL

Cloud Deployment

🤝 Contributing

Contributions, ideas, and improvements are welcome.

Fork the repository

git fork

Create a feature branch

git checkout -b feature/new-feature

Commit your changes

git commit -m "add new feature"

Push the branch

git push origin feature/new-feature

Then open a Pull Request.

📄 License

This project is available for educational and development purposes.

⭐ Project Links

🌐 Live Application:https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/

💻 GitHub Repository:https://github.com/Hammadsoftware/ai-travel-agent

<p align="center">
  ✈️ <strong>AI Travel Agent</strong> — Plan smarter with Agentic AI.
</p>