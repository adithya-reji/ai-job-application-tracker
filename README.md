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
├── compose.yaml              # Docker Compose configuration
└── README.md
```

## Prerequisites

Make sure the following are installed:

* [Docker](https://www.docker.com/)
* Git
* A Google Gemini API key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adithya-reji/ai-application-tracker.git
cd ai-application-tracker
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=adminpassword
POSTGRES_DB=job_tracker
DB_PORT=5432

# Backend
GEMINI_API_KEY=your_google_gemini_api_key
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Replace the placeholder values with your own credentials.

> **Note:** Do not commit your `.env` file or API keys to the repository.

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

The main workflow is:

```text
Job Description
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
       ▼
User Profile ──────► Job Requirement Comparison
                           │
                           ▼
                    Match / Skill Gaps
```

## Architecture

The application is organized into separate frontend, backend, and database services.

```text
┌─────────────────────┐
│      React UI       │
│   TypeScript/Vite   │
└──────────┬──────────┘
           │ HTTP / REST
           ▼
┌─────────────────────┐
│      FastAPI        │
│                     │
│ API Routes          │
│ Business Logic      │
│ Authentication      │
│ AI Integration      │
└───────┬───────┬─────┘
        │       │
        │       ▼
        │   Gemini API
        │
        ▼
┌─────────────────────┐
│     PostgreSQL      │
│  Application Data   │
└─────────────────────┘
```

## Development Notes

The project is designed to run locally using Docker Compose. The frontend and backend are separated into their own services, while PostgreSQL provides persistent application data storage.

The backend uses FastAPI for REST API development, SQLAlchemy for database interaction, and Pydantic for request and response validation. Gemini is used for extracting structured information from job descriptions and generating profile-to-job comparisons.

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
