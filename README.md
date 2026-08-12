# ✈️ AI Travel Agent — Frontend

A modern AI-powered travel planning interface built with **React + TypeScript**, connected to a **FastAPI + LangGraph** backend.

🌐 **Live Demo:**
https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/

💻 **GitHub Repository:**
https://github.com/Hammadsoftware/ai-travel-agent

---

## 🔹 Key Features

* 🤖 **Natural-Language Travel Planning** — Ask travel questions naturally.
* ✈️ **Flight Information** — Search and display flight data.
* 🏨 **Hotel Information** — Find hotel information for destinations.
* 🗺️ **AI Itinerary** — Generate structured travel plans.
* 📊 **Trip Insights** — Display travel statistics and visualization data.
* 🔐 **Authentication** — Signup and signin interface.
* ⚡ **AI Responses** — Receive responses from the agentic AI backend.
* 📱 **Responsive UI** — Modern responsive travel interface.

---

## 🛠️ Tech Stack

| Component            | Technology   | Purpose                |
| -------------------- | ------------ | ---------------------- |
| **Frontend**         | React        | User interface         |
| **Language**         | TypeScript   | Type-safe development  |
| **Styling**          | Tailwind CSS | Responsive UI          |
| **API Client**       | Axios        | REST API communication |
| **Routing**          | React Router | Application navigation |
| **State Management** | Zustand      | Client-side state      |
| **Backend**          | FastAPI      | REST API               |
| **AI Orchestration** | LangGraph    | Agent workflow         |
| **LLM**              | Groq / Llama | AI processing          |
| **Web Search**       | Tavily       | Travel information     |

---

## 🏗️ Architecture Overview

```mermaid
graph TD
    A[React + TypeScript Frontend] -->|REST API / JSON| B[FastAPI Backend]

    A --> AUTH[Authentication]

    B --> C[LangGraph Agent Orchestration]

    C --> S[Supervisor / Router Agent]

    S --> F[✈️ Flight Agent]
    S --> H[🏨 Hotel Agent]
    S --> W[🔎 Web Search Agent]

    F --> AV[Aviationstack API]
    H --> HS[Hotel Search]
    W --> T[Tavily Search]

    AV --> R[Response Synthesizer]
    HS --> R
    T --> R

    R -->|Structured Response| B
    B -->|JSON / Response| A

    classDef frontend fill:#2563eb,color:#fff,stroke:#1d4ed8
    classDef backend fill:#16a34a,color:#fff,stroke:#15803d
    classDef agent fill:#9333ea,color:#fff,stroke:#7e22ce
    classDef tool fill:#f59e0b,color:#fff,stroke:#d97706
    classDef auth fill:#64748b,color:#fff,stroke:#475569
    classDef response fill:#0891b2,color:#fff,stroke:#0e7499

    class A frontend
    class B backend
    class C,S,F,H,W agent
    class AV,HS,T tool
    class AUTH auth
    class R response

## 🔌 Backend Integration

The frontend communicates with the FastAPI backend through REST APIs.

### API Endpoints

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| `POST` | `/auth/signup` | Create a new user       |
| `POST` | `/auth/signin` | Authenticate user       |
| `POST` | `/ai`          | Generate AI travel plan |

### Example Request

```json
{
  "query": "Plan a trip from Lahore to Dubai"
}
```

### Response Flow

```text
React
  ↓
Axios
  ↓
FastAPI
  ↓
LangGraph
  ↓
Flight / Hotel / Search Agents
  ↓
Response Synthesizer
  ↓
FastAPI
  ↓
React
```

---

## 📁 Project Structure

```text
Frontend/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   └── cards/
│   │       └── FlightCard.tsx
│   │
│   ├── api/
│   │   └── client.ts
│   │
│   ├── App.tsx
│   └── ...
│
├── public/
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## ▶️ Run Locally

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The frontend will run on the local development URL provided by the development server.

---

## 🌐 Live Application

🚀 **[Try the AI Travel Agent](https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/)**

---

## 🔗 Project Links

🌐 **Live Demo**
https://18p0f0inr0d49dap6mx9f11y9.nativelyai.app/

💻 **GitHub Repository**
https://github.com/Hammadsoftware/ai-travel-agent

---

## 👨‍💻 Author

**Hammad Tariq**

Full Stack / AI Developer

**Focus:** React • TypeScript • FastAPI • LangChain • LangGraph • Agentic AI
