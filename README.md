Geometry Dash Level Database

A full-stack web application for searching, storing, and managing Geometry Dash level data. The application combines a React frontend with an Express.js/Node.js backend and PostgreSQL database, with external level data provided by the Global Stats Viewer API.

Features
Search for Geometry Dash levels by name
Search locally stored levels through a PostgreSQL database
Retrieve levels from the Global Stats Viewer API when they aren't found locally
Store externally retrieved level data in the application's database
Add levels to a personal level list
Remove levels from the list
Reorder levels
Persist the personal level list using localStorage
Toggle between light and dark mode
RESTful API for interacting with the PostgreSQL database
Tech Stack
Frontend
React
JavaScript
HTML/CSS
Backend
Node.js
Express.js
PostgreSQL
pg
CORS
External API
Global Stats Viewer API
Architecture

The application is separated into a React frontend, Express.js backend, and PostgreSQL database.

┌─────────────────────┐
│    React Frontend   │
│                     │
│  Search / Level UI  │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│   Express Backend   │
│                     │
│   API Endpoints     │
└──────────┬──────────┘
           │
           │ SQL
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│                     │
│    Level Database   │
└─────────────────────┘

           ▲
           │
           │ External API
           │
┌──────────┴──────────┐
│ Global Stats Viewer │
│        API          │
└─────────────────────┘
How It Works

When a user searches for a level, the React frontend sends a request to the Express backend.

The backend queries PostgreSQL using a parameterized SQL query:

SELECT * FROM levels
WHERE name ILIKE $1

If the desired level cannot be found locally, the application can query the Global Stats Viewer API. The returned data is then normalized into the application's database structure before being displayed and stored.

For example, external API data is converted into a consistent format:

{
    name: level.level_name,
    id: level.level_id,
    uploader: level.creator.name,
    difficulty: level.difficulty
}

This allows data from the external API and the application's own database to use the same structure.

API Endpoints
GET /api/levels

Search for levels stored in PostgreSQL.

Query parameter:

name

Example:

GET /api/levels?name=Bloodbath
POST /api/levels

Add one or more levels to the PostgreSQL database.

Duplicate level IDs are ignored using PostgreSQL's ON CONFLICT handling.

Local Development
Prerequisites
Node.js
npm
PostgreSQL
A PostgreSQL database named aredl-companion
1. Clone the repository
git clone <repository-url>
cd <repository-directory>
2. Install dependencies

Install the frontend dependencies:

npm install

Install the backend dependencies:

cd server
npm install
3. Configure PostgreSQL

Create a PostgreSQL database and configure the backend connection.

The backend expects the PostgreSQL password to be provided through the PGPASSWORD environment variable.

4. Start the backend
node server.js

The API will run on:

http://localhost:5000
5. Start the frontend

From the frontend directory:

npm run dev

The application will then be available through the development server.

Project Structure
├── components/
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── InputForm.jsx
│   ├── LevelCard.jsx
│   ├── LevelList.jsx
│   ├── SearchApp.jsx
│   └── SearchResults.jsx
│
├── server/
│   └── server.js
│
├── src/
│   └── App.jsx
│
├── package.json
└── README.md
Current Status

This project is actively being developed.

The current implementation focuses on establishing the full-stack architecture and communication between React, Express.js, PostgreSQL, and the Global Stats Viewer API.

Planned improvements include:

User authentication
Fully database-backed user level lists
Additional database operations
Improved error handling
Input validation
Deployment
Automated testing
What I Learned

This project has provided hands-on experience with:

Building REST APIs with Express.js
Connecting a Node.js application to PostgreSQL
Writing parameterized SQL queries
Designing and querying a relational database
Integrating third-party APIs
Normalizing external API data
Managing state with React hooks
Structuring reusable React components
Communicating between frontend and backend applications
Using Git and GitHub for version control
License

This project is for educational and portfolio purposes.