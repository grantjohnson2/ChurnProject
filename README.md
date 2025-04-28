# Bank Customer Management Application

A full-stack web application for managing bank customer data with CRUD operations and advanced querying capabilities.

## Overview

This application provides a user-friendly interface to view, add, update, and delete bank customer records. It features a custom query builder that allows for complex data filtering and visualization of customer data.

## Features

- **View Customers**: Display a list of bank customers with basic information
- **Add Customers**: Create new customer records with comprehensive details
- **Update Customers**: Modify existing customer information
- **Delete Customers**: Remove customer records from the database
- **Custom Query Builder**: Advanced filtering and sorting with the following capabilities:
  - Column selection: Choose specific data fields to display
  - Multiple filter criteria: Filter by ID, geography, gender, age, balance, and salary
  - Comparison operators: Support for =, <, >, <=, >=, != operations
  - Sorting options: Order results by various fields in ascending or descending order
  - Result limiting: Control the number of results returned

## Technical Stack

### Frontend
- **React**: Library for building the user interface
- **React Router**: Navigation between different pages
- **Axios**: HTTP client for API requests
- **CSS**: Custom styling for components

### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **MySQL**: Database for storing customer information
- **dotenv**: Environment variable management

## Installation

### Prerequisites
- Node.js
- MySQL Server
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd bank-customer-management
   ```

2. **Set up the database**
   - Create a MySQL database for the application
   - Import the database schema (schema.sql if available, or create a table matching the data structure)
   - The customers table should have the following structure:
     - CustomerId (INT, Primary Key)
     - Surname (VARCHAR)
     - Geography (VARCHAR)
     - Gender (VARCHAR)
     - Age (INT)
     - CreditScore (INT)
     - Tenure (INT)
     - Balance (DECIMAL)
     - NumOfProducts (INT)
     - HasCrCard (TINYINT, 0 or 1)
     - IsActiveMember (TINYINT, 0 or 1)
     - EstimatedSalary (DECIMAL)
     - Exited (TINYINT, 0 or 1)

3. **Backend setup**
   ```
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   ```

4. **Frontend setup**
   ```
   cd frontend
   npm install
   ```

5. **Start the application**
   
   Start the backend:
   ```
   cd backend
   npm start
   ```
   
   Start the frontend in a separate terminal:
   ```
   cd frontend
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## Application Structure

- **Backend**
  - `index.js`: Main server file with Express routes and MySQL connection
  - Implements RESTful API endpoints for CRUD operations
  - Custom query endpoint using stored procedure

- **Frontend**
  - `App.js`: Main component with route definitions
  - `pages/`:
    - `Customers.js`: Displays all customers with delete functionality
    - `Add.js`: Form for adding new customers
    - `Update.js`: Form for updating existing customer details
    - `Query.js`: Custom query builder interface
  - `style.css`: Styling for all components

## API Endpoints

- **GET /customers**: Retrieve all customers (limited to 10)
- **GET /customers/:id**: Retrieve a specific customer by ID
- **POST /customers**: Create a new customer
- **PUT /customers/:id**: Update an existing customer
- **DELETE /customers/:id**: Delete a customer
- **GET /query**: Execute a custom query with multiple parameters

## Database Stored Procedure

The application uses a MySQL stored procedure called `CustomQuery` for the advanced query functionality. This procedure accepts parameters for column selection, filtering criteria, sorting options, and result limiting.

## Customizing the Query Builder

The Query Builder supports various filter conditions:
1. Select specific columns to display
2. Filter by CustomerID, Geography, Gender, Age, Balance, and Estimated Salary
3. Apply different comparison operators
4. Sort results by multiple criteria
5. Limit the number of results returned
