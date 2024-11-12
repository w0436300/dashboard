M-Commerce Dashboard
This is a full-stack project based on React and Node.js, a dashboard for analyzing and displaying e-commerce data. The project uses Create React App to bootstrap the front-end and builds the back-end API with Express.js.

Project Introduction
This project consists of two main parts:

1. client: front-end application (React)
2. server: back-end API (Node.js + Express)

Install dependencies

First clone the repository:

### git clone https://github.com/w0436300/dashboard.git

Install all dependencies in one click
Run the following command to install all dependencies under the root directory, client and server directories:
### npm run install-all

Note: Make sure you have installed Node.js and npm, and it is recommended to install concurrently globally to start the front and back ends at the same time.

Available scripts
In the project root, you can use the following scripts:

1. Start the frontend and backend (development mode)
npm run dev

This command will start both:
Frontend (React): Run at http://localhost:3000
Backend (Node.js + Express): Run at http://localhost:5000

2. Start the frontend (React application)
### npm run client

3. Start the backend (Node.js API)
### npm run server


4. Build the frontend project
### npm run build
This command will build the production version of the React application and put the output into the client/build folder.


Data import and initialization
There is an insertData.js script in the server directory, which is used to import the initial data into MongoDB.

How to use
Enter the server directory:
### cd server
Run the data import script:
### node insertData.js
If successful, you will see the prompt "Data import successful!"

File structure

m-comm-dashboard/
├── client/ # React front-end
├── server/ # Node.js back-end
├── package.json # Dependencies and scripts in the root directory
└── README.md # Project description file

Detailed description
client: Contains the source code of the front-end React application.
server: Contains the back-end API and database model.
install-all: A quick script to install all dependencies at once.

Environment variable configuration
Create .env files in server and client respectively, and add the following environment variables:

server/.env

PORT=5001
MONGODB_URI=
JWT_SECRET=
CORS_ORIGIN=http://localhost:3000


client/.env

REACT_APP_API_URL=http://localhost:5001
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REACT_APP_GOOGLE_CLIENT_ID=
