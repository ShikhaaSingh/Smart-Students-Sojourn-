
# 🏡 Smart Student Sojourn

**A Full-Stack Student Accommodation Discovery Platform with AI-Powered Natural Language Search**

Smart Student Sojourn helps students discover suitable PGs and hostels based on their location, accommodation preferences, and budget. The application combines a React frontend, Spring Boot REST APIs, MySQL database, and Google Gemini AI to make accommodation searching simpler and more intuitive.

> **Project Status:** Developed with sample accommodation data for demonstration. Listing availability and prices have not been independently verified in real time.

## ✨ Features

### 🏠 Accommodation Discovery
- Browse PG and hostel listings.
- View accommodation details, pricing, and amenities.
- Filter listings by city, locality, accommodation type, and budget.
- Sort and explore available sample listings.
- View additional information through an accommodation details modal.

### 🤖 AI-Powered Search
- Search using natural language instead of selecting every filter manually.
- Use queries such as:
  - `Find a PG in Hinjawadi under 10000 with Wi-Fi`
  - `Show hostels in Pune under 8000`
  - `Find accommodation in Kharadi`
- Use Google Gemini to extract relevant search criteria from a query.
- Retrieve matching accommodation records from MySQL through the Spring Boot backend.
- View matching results in a slide-out AI search panel.
- Receive loading and error feedback during searches.

**How the AI search works:**

1. The user enters a natural-language accommodation request.
2. Gemini interprets the request and extracts relevant search criteria.
3. The Spring Boot backend uses those criteria to search the database.
4. Matching database records are returned by the API.
5. The frontend displays the results to the user.

The AI helps interpret the search request; accommodation results come from the application's database rather than being invented by the AI.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Java 21, Spring Boot, REST APIs |
| Database | MySQL |
| AI Integration | Google Gemini API |
| API Communication | HTTP, JSON |
| Build Tool | Maven |
| Version Control | Git, GitHub |

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│     React + Vite Frontend   │
│  Listings, Filters, AI UI   │
└──────────────┬──────────────┘
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│    Spring Boot REST APIs    │
│ Filtering and Search Logic  │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌──────────────┐  ┌────────────────┐
│    MySQL     │  │  Google Gemini │
│ Accommodation│  │ Query Parsing  │
│    Records   │  │   for AI Search│
└──────────────┘  └────────────────┘
```

## 📁 Project Structure

```text
Smart-Student-Sojourn/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sojourn/backend/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── README.md
```

*The exact package and component structure may evolve as the project develops.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following tools:

- [Java JDK 21](https://adoptium.net/)
- [Node.js and npm](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)
- A Google Gemini API key for AI-powered search

### 1. Clone the Repository

```bash
git clone https://github.com/ShikhaaSingh/Smart-Students-Sojourn-.git
cd Smart-Students-Sojourn-
```

### 2. Configure the MySQL Database

Start your MySQL server and create the database:

```sql
CREATE DATABASE smart_student_sojourn;
```

Configure the database connection in:

`backend/src/main/resources/application.properties`

```properties
spring.application.name=backend
spring.datasource.url=jdbc:mysql://localhost:3306/smart_student_sojourn
spring.datasource.username=sojourn_app
spring.datasource.password=${DB_PASSWORD}
```

Make sure the MySQL user `sojourn_app` exists and has the necessary permissions for the database. Use your actual database password through the `DB_PASSWORD` environment variable.

If the project requires initial accommodation records, make sure the database is populated using the project's existing schema and data setup.

### 3. Configure Environment Variables

The backend uses environment variables for sensitive credentials.

On Windows PowerShell, navigate to the backend folder:

```powershell
cd backend
```

Set the MySQL password securely:

```powershell
$secureDb = Read-Host "Enter MySQL password" -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new("", $secureDb).Password
```

Set your Gemini API key securely:

```powershell
$secureGemini = Read-Host "Enter Gemini API key" -AsSecureString
$env:GEMINI_API_KEY = [System.Net.NetworkCredential]::new("", $secureGemini).Password
```

Get a Gemini API key through [Google AI Studio](https://aistudio.google.com/).

**Security note:** Never commit API keys, database passwords, or other secrets to GitHub. These environment variables must be configured again in any new terminal session used to run the backend.

### 4. Run the Spring Boot Backend

From the `backend` directory, run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend should start at:

`http://localhost:8080`

Keep this terminal open while using the application.

### 5. Run the React Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## 🔌 API Endpoints

### Accommodation API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/accommodations` | Retrieve and filter accommodation listings |

Example request:

```http
GET http://localhost:8080/api/accommodations?city=Pune&maxRent=10000
```

Supported filters depend on the backend implementation and may include city, locality, accommodation type, and maximum rent.

### AI Search API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ai/search?message=...` | Interpret a natural-language query and search matching accommodation records |

Example request:

```http
GET http://localhost:8080/api/ai/search?message=Find%20a%20PG%20in%20Hinjawadi%20under%2010000%20with%20Wi-Fi
```

The endpoint uses Gemini to interpret the query and the backend to retrieve matching database records. AI search requires a valid `GEMINI_API_KEY` and a running backend with the required database configuration.

## 🧪 Running Tests

From the `backend` directory, run:

```powershell
.\mvnw.cmd test
```

Make sure any environment variables required by the test configuration are set before running the test suite.

## 🔒 Data and Availability Disclaimer

This project currently demonstrates accommodation discovery using sample data. Prices, amenities, and listings are intended for application testing and demonstration; they do not guarantee that a property exists, has current availability, or offers the displayed price.

AI search filters the records available in the application's database. It does not independently verify accommodation availability.

## 🔮 Future Improvements

- User registration and authentication
- Student profiles and saved accommodations
- Booking and enquiry workflows
- Map-based accommodation discovery
- Accommodation owner listings and image uploads
- Verified property information and availability
- Deployment with production configuration and monitoring

## 👩‍💻 Author

**Shikha Singh**

- GitHub: [ShikhaaSingh](https://github.com/ShikhaaSingh)
- Project Repository: [Smart Student Sojourn](https://github.com/ShikhaaSingh/Smart-Students-Sojourn-)

---

*Built to make student relocation and accommodation discovery easier.*
