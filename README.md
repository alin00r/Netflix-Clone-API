<h1 align="center">
  Netflix Clone REST API
</h1>

## Technologies 🚀

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt

## Structure

- app
  - models
    - List.js
    - Movie.js
    - User.js
  - routes
    - listRoutes.js
    - movieRoutes.js
    - userRoutes.js
  - auth
    - verifyToken.js
  - index.js
  - db.js
- node_modules
- package.json

## Features ✨

# Lists Routes:

- [x] Handles CRUD operations for lists.
- [x] Uses middleware verify for authentication.
- [x] Supports creating and deleting lists.
- [x] Supports fetching lists based on type and genre.

# Movies Routes:

- [x] Manages CRUD operations for movies.
- [x] Also includes a route to get a random movie.
- [x] Utilizes middleware verify for authentication.
- [x] Allows updating, deleting, fetching movies by ID, and fetching all movies.
- [x] Supports fetching a random movie based on type (series or movie).

# User Routes:

- [x] Handles user-related operations like updating, deleting, and fetching users.
- [x] routes for user authentication like logout and logout from all devices.
- [x] Provides functionality to get user statistics.
- [x] Uses middleware verify for authentication.

## Setting Up Your Local Environment

Follow these steps to set up your local environment for the Netflix-API:

1. **Clone the Repository:**
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/alin00r/Netflix-API.git
   cd Netflix-API
   ```
2. **Install Dependencies:**
   Run the following command to install all the required dependencies:
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**

   Before you can run the Netflix-API, you need to set up your environment variables. These variables store sensitive information required for the app to function properly. Follow these steps to configure your environment variables:

   1. **Create a `.env` File:**
      In the root directory of the app, create a file named `.env`.

   2. **Add the Following Environment Variables:**
      Replace the placeholders with your actual information. You might need to sign up for accounts and services to obtain the required credentials.

      ```dotenv

      # MongoDB Configuration
      DATABASE_URI=your-mongodb-database-url


      # JSON Web Token Configuration
      SECRET=your-json-web-token-secret

      ```

# API reference

During API development, I use `Postman` for handling/testing all endpoints.

- Postman collection/documentation is available on this link [click here](#)
- Base URL endpoints: `http://127.0.0.1:5000/api/V1/` or `http://localhost:PORT/api/v1/`

## License

[![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](http://badges.mit-license.org)

- [Ali Nour](https://github.com/alin00r)
