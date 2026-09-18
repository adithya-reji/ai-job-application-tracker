# AI Job Application Tracker

A full-stack web application for managing job applications and organizing the job search process. It allows users to store and track applications, extract structured information from job descriptions using Google's Gemini API, and compare job requirements with their profile.

## Features

* **Job Application Tracking**
  Create, update, view, and manage job applications throughout the recruitment process.

* **Job Description Extraction**
  Extract information such as company, job title, location, and required skills from raw job descriptions using Google's Gemini API.

* **Profile & Job Matching**
  Compare a user's profile with the requirements of a job and identify relevant skills and potential skill gaps.

* **Application Dashboard**
  Search, filter, paginate, and view applications with their current status and matching information.

* **User Authentication**
  JWT-based registration and login with protected application data.

* **Containerized Development**
  Frontend, backend, and PostgreSQL database can be run together using Docker Compose.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Google GenAI SDK

### Database

* PostgreSQL

### Infrastructure

* Docker
* Docker Compose

## Project Structure

```text
ai-application-tracker/
├── backend/
│   ├── app/
│   │   ├── api/              # API routers
│   │   ├── core/             # Database and security configuration
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── services/         # Business logic and AI integration
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   └── services/         # API configuration and requests
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── .env.example              # Environment variable template
├── compose.yaml              # Docker Compose configuration
└── README.md
```

## Prerequisites

Make sure the following are installed:

* [Docker](https://www.docker.com/)
* Git
* A Google Gemini API key

## Environment Configuration

The project uses environment variables for database credentials, application security, and AI API configuration.

A `.env.example` file is included in the repository as a template.

### 1. Create the environment file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 2. Configure `.env`

Update the values in `.env` with your local configuration:

```env
PROJECT_NAME=ai-job-application-tracker

# Database Credentials
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_database_password_here
POSTGRES_DB=jat_db

# PostgreSQL host port
DB_PORT=5433

# Database connection used by the backend container
DATABASE_URL=postgresql+psycopg://postgres:your_database_password_here@db:5432/jat_db

# Security
SECRET_KEY=your_jwt_secret_key_here

# AI Integration
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder values with your actual database password, JWT secret key, and Gemini API key.

For a secure `SECRET_KEY`, you can generate one with:

```bash
openssl rand -hex 32
```

### Database Connection

PostgreSQL runs as a separate Docker service named `db`.

The database is exposed on port `5433` on the host machine and listens on port `5432` inside the Docker network.

```text
Host machine                  Docker network

localhost:5433  ───────────►  db:5432
                              PostgreSQL
```

The backend connects to PostgreSQL using `db:5432` when running inside Docker. The `DB_PORT` value controls the port exposed to the host and is not used in the backend's `DATABASE_URL`.

> **Important:** Do not commit your `.env` file or API keys to the repository. The `.env.example` file contains placeholder values only and can be committed safely.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adithya-reji/ai-application-tracker.git
cd ai-application-tracker
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and update the required values as described in the [Environment Configuration](#environment-configuration) section.

### 3. Start the application

Build and start the containers using Docker Compose:

```bash
docker compose up --build
```

Once the containers are running, the application will be available at:

* **Frontend:** http://localhost:5173
* **Backend API:** http://localhost:8000
* **Swagger API Documentation:** http://localhost:8000/docs

To stop the application:

```bash
docker compose down
```

## API Overview

The backend exposes REST APIs for authentication, application management, and job analysis.

| Method | Endpoint             | Description                                           |
| ------ | -------------------- | ----------------------------------------------------- |
| `POST` | `/auth/register`     | Register a new user                                   |
| `POST` | `/auth/login`        | Authenticate a user and return a JWT                  |
| `GET`  | `/jobs`              | Retrieve the user's job applications                  |
| `POST` | `/jobs/extract`      | Extract structured information from a job description |
| `GET`  | `/jobs/{id}/analyze` | Compare a job with the user's profile                 |

Additional endpoints are available through the Swagger documentation at `/docs`.

## Application Flow

The main workflow consists of extracting job information, storing the application data, and comparing job requirements with the user's profile.

```text
Raw Job Description
        │
        ▼
   Gemini API
        │
        ▼
Structured Job Data
        │
        ▼
   PostgreSQL
        │
        ├──────────────┐
        │              │
        ▼              ▼
 Job Requirements   User Profile
        │              │
        └──────┬───────┘
               ▼
      Profile Comparison
               │
               ▼
        Skill Gaps / Match
```

## Architecture

The application is organized into separate frontend, backend, and database services.

```text
┌─────────────────────┐
│      React UI       │
│   TypeScript/Vite   │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│      FastAPI        │
│                     │
│   API Routes        │
│   Business Logic    │
│   Authentication    │
│   AI Integration    │
└───────┬───────┬─────┘
        │       │
        │       │ API Requests
        │       ▼
        │   ┌──────────────┐
        │   │  Gemini API  │
        │   └──────────────┘
        │
        │ db:5432
        ▼
┌─────────────────────┐
│     PostgreSQL      │
│  Application Data   │
└─────────────────────┘
```

## Development Notes

The project is designed to run locally using Docker Compose. The frontend, backend, and PostgreSQL database run as separate services.

The backend uses FastAPI for REST API development, SQLAlchemy for database interaction, and Pydantic for request and response validation. Gemini is used for extracting structured information from job descriptions and performing profile-to-job comparisons.

## Future Improvements

Possible improvements include:

* Application reminders and follow-up tracking
* Additional application statistics
* Resume-to-job comparison
* More detailed application history
* Deployment to a cloud environment
* Automated testing and CI/CD

## License

This project is intended as a personal portfolio and learning project.
