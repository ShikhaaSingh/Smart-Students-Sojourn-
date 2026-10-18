# Smart Student Sojourn 🏡

A full-stack accommodation discovery platform designed to help students find PGs and hostels while relocating to a new city.

Smart Student Sojourn simplifies accommodation discovery with searchable listings, budget-based filtering, locality selection, and detailed accommodation information through a clean and user-friendly interface.

## ✨ Features

- **Accommodation Listings:** Browse PG and hostel accommodation options.
- **City & Locality Filters:** Narrow down listings by city and locality.
- **Accommodation Type:** Filter listings by accommodation type.
- **Budget Filtering:** Find accommodations within your selected rent limit.
- **Sorting:** Arrange listings using the available sorting options.
- **Accommodation Details:** View additional information and amenities in a details modal.
- **Database Integration:** Retrieve accommodation data through a Spring Boot REST API backed by MySQL.
- **Responsive UI:** A clean interface built with React and CSS.

> **Note:** The current listings include demo data for development and demonstration. They do not represent verified vacancies or confirmed accommodation availability.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Java, Spring Boot |
| Database | MySQL |
| API | REST API, JSON |
| Build Tool | Maven |
| Version Control | Git, GitHub |

## 🏗️ Architecture

The application follows a frontend–backend architecture:

1. **React frontend** provides the accommodation listings, filters, sorting, and details interface.
2. **Spring Boot backend** exposes REST endpoints and processes accommodation search parameters.
3. **MySQL database** stores the accommodation records retrieved by the backend.
4. **REST API** connects the frontend to the backend and returns accommodation data in JSON format.

## 📂 Project Structure

```text
Smart-Students-Sojourn/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sojourn/backend/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Java 21
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ShikhaaSingh/Smart-Students-Sojourn-.git
cd Smart-Students-Sojourn-
```

### 2. Configure the database

Create the MySQL database:

```sql
CREATE DATABASE smart_student_sojourn;
```

Configure the database connection in `backend/src/main/resources/application.properties`:

```properties
spring.application.name=backend
spring.datasource.url=jdbc:mysql://localhost:3306/smart_student_sojourn
spring.datasource.username=sojourn_app
spring.datasource.password=${DB_PASSWORD}
```

Ensure that the MySQL user exists, has the required database permissions, and that the accommodation table and data are set up before starting the application.

Set the database password through the `DB_PASSWORD` environment variable. Do not commit real credentials to GitHub.

### 3. Start the backend

Open a terminal in the project directory and run:

```powershell
cd backend
```

Set the password in PowerShell without displaying it:

```powershell
$secure = Read-Host "Enter MySQL password" -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new("", $secure).Password
```

Start the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 4. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## 🔌 API Endpoint

### Get accommodation listings

```http
GET /api/accommodations
```

The endpoint supports optional search parameters:

| Parameter | Purpose |
|---|---|
| `city` | Filter by city |
| `locality` | Filter by locality |
| `type` | Filter by accommodation type |
| `maxRent` | Set the maximum monthly rent |

Example:

```http
GET http://localhost:8080/api/accommodations?city=Pune&maxRent=10000
```

Negative `maxRent` values are rejected by request validation.

## 🧪 Testing

Run the backend tests from the `backend` directory:

```powershell
.\mvnw.cmd test
```

The backend test suite currently passes **5 tests**.

## 🔮 Future Improvements

- User authentication and profile management
- Verified accommodation listings and availability
- Booking or enquiry functionality
- Map-based accommodation discovery
- Image uploads and richer listing galleries
- Deployment with a hosted backend and database

## 👩‍💻 Author

**Shikha Singh**

- GitHub: [ShikhaaSingh](https://github.com/ShikhaaSingh)

---

*Built to make student relocation and accommodation discovery easier.*
