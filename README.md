# AI Resume Assistant with Async Resume Parsing and Intelligent Chat UI

A full-stack web application that allows users to upload their resume, get it parsed using VLM.run, and chat with an AI assistant powered by OpenAI that analyzes the resume and suggests improvements.

## 🛠 Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Frontend      | Next.js, Tailwind CSS            |
| Chat UI       | @ai-sdk                          |
| Backend       | FastAPI (Python)                 |
| Resume Parser | VLM.run (document.resume domain) |
| Chat Model    | OpenAI Chat API (GPT-3.5-turbo)  |
| Database      | PostgreSQL                       |
| Deployment    | Docker                           |

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 22+ (for local development)
- Python 3.12+ (for local development)
- VLM.run API key ([Sign up here](https://app.vlm.run/))
- OpenAI API key

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/proatik/resume-ai.git
cd resume-ai
```

### 2. Environment Configuration

Copy the example environment files and fill in your API keys:

```bash
# Root environment
cp .env.example .env

# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

#### Root Environment Variables (`.env`)

```env
DB_USER=proatik
DB_PASSWORD=55556666
DB_NAME=resumedb
```

#### Backend Environment Variables (`backend/.env`)

```env
DB_USER=proatik
DB_PASSWORD=55556666
DB_HOST=database
DB_PORT=5432
DB_NAME=resumedb

VLMRUN_API_KEY=<your_api_key>

OPENAI_API_KEY=<your_api_key>
```

#### Frontend Environment Variables (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Docker Setup (Recommended)

Start the entire application stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:

- PostgreSQL database on port 5432
- FastAPI backend on port 8000
- Next.js frontend on port 3000

### 4. Local Development Setup (Alternative)

#### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

#### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## 💬 Sample Prompts

Try these example queries with the AI assistant:

### Resume Analysis

- "How can I improve this resume?"
- "What are the main strengths and weaknesses of my resume?"
- "Rate my resume on a scale of 1-10 and explain why"

### Role-Specific Feedback

- "Is this resume good for a backend engineer role?"
- "How should I tailor this resume for a data scientist position?"
- "What changes would make this resume better for a senior developer role?"

### Skills and Experience

- "What skills should I add to make my resume more competitive?"
- "Are there any missing technical skills for my field?"
- "How can I better highlight my experience?"

### Formatting and Structure

- "Is my resume format professional and readable?"
- "Should I reorganize any sections?"
- "What's the ideal length for my resume?"

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build backend
docker-compose up --build frontend
```

## 🎥 Demo

[Video Demo Link](https://drive.google.com/file/d/1WE0fnh2nw4OV0qzy8VTVboG2U4rORUfE/view?usp=sharing)

The demo showcases:

- Resume upload and async parsing process
- Real-time status updates via SSE
- Interactive chat with AI assistant
- Dynamic UI elements in chat responses
- Resume data persistence and retrieval
