# Web-Based Calculator API Project

This README provides an in-depth description of a Web-Based Calculator API, which was developed as the third assignment for the Web Technologies and Applications course. The project is designed with a clear separation of concerns between the frontend and backend components. It uses React for the frontend to deliver an interactive UI and Koa for the backend. The communication between the two is achieved through API calls using Fetch. Code consistency and cleanliness are maintained with the help of ESLint and Prettier.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Execution Instructions](#execution-instructions)
3. [Assumptions and Observations](#assumptions-and-observations)

## Project Structure

This project is organized into two primary directories: `backend` and `frontend`. Each directory contains specific components related to their respective functions.

### Backend

The backend directory includes a `src` folder with the following files:

- `index.js`: Establishes a Koa server with CORS support, registers request and response, parses request data, and manages route using a router from `routes.js`. The server listens on port 3000, as detailed in the `.env` file.

- `routes.js`: Defines the routes for basic calculator operations using koa-router. It uses HTTP GET and POST methods to make the API operational.

- `operations.js`: Contains the definitions of basic mathematical operations.

Other important files in the backend directory include:

- `.env`: Stores the port (3000) which is used in `index.js` via `dotenv.config()`.

- `package.json`: Lists all dependencies and includes a script for nodemon which runs upon executing `yarn dev`.

### Frontend

The frontend directory contains a `src` folder with the following key components:

- `App.jsx`: Exports the calculator component.

- `main.jsx`: Renders the App component.

- `Calculator.jsx`: Serves as the main logic of the application. This component is responsible for handling button clicks, evaluating expressions, and making API calls. It uses React hooks (`useState` and `useEffect`) to manage calculator's state and screen display.

The `src` folder also includes an `assets` directory containing `calculator.css` which styles the calculator's interface.

Additionally, there is an `.eslintrc.jsc` file for integrating ESLint into the project. Note: The presence of this file might impact the project if the ESLint extension is not installed.

The `package.json` file specifies all dependencies, including the linter in the script. Note: If the ESLint extension isn't installed, this might affect the project's functionality.

## Execution Instructions

To run the application, follow these steps:

1. Remove the `node_modules` folder if it exists.

2. Run `yarn install` to fetch all dependencies.

3. Open two terminals. In each terminal, navigate to the project's main folder.

4. In one terminal, navigate to the backend directory using `cd backend`. In the other terminal, navigate to the frontend directory using `cd frontend`.

5. Run `yarn dev` in both terminals.

Once both servers are running, open your web browser and navigate to `http://localhost:5173/` to access the calculator and perform calculations.

## Assumptions and Observations

The following are some assumptions and observations made during

 the development of this project:

1. The calculator prevents the placement of operators in incorrect locations, e.g., starting an expression with addition, division, or multiplication. However, an expression can start with a subtraction sign to denote a negative number.

2. The calculator evaluates expressions in the format of: a number (positive or negative), an operator, and another number (positive or negative). Examples: `-6+7=1`, `-6--7=1`, `-6+-7=-13`, `6/-2=-3`, `-7*4=-28`, `-7*-4=28`. The application does not support multiple-operation expressions or invalid inputs, such as `3*/2`.

3. Attempts to divide by zero are handled by the backend, but the frontend will display an "ERROR" message. This error message is cleared when any button is pressed.
