# Portfolio Website - Mayank Gupta

A single-page portfolio website for a university assignment.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MySQL

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup Instructions

### 1. MySQL Database Setup
Open your MySQL client and execute the SQL commands found in `database/schema.sql`:
```sql
CREATE DATABASE portfolio_db;
USE portfolio_db;
-- (copy the table creation code from database/schema.sql)
```

### 2. Backend Configuration
Create a `.env` file in the root directory and add your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
PORT=5000
```

### 3. Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 4. Run the Server
```bash
npm start
```
The server will start on `http://localhost:5000`.

### 5. Open the Website
Open `client/index.html` in your browser. (Note: The form submission requires the backend server to be running).

## Project Structure
- `client/`: Frontend files (HTML, CSS, JS)
- `server/`: Backend files (Express server, database connection, routes)
- `database/`: SQL schema
