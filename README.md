# M-Commerce Analytics Dashboard
This is a full-stack project based on React (front-end) and Node.js + Express (back-end). It provides a dashboard for analyzing and displaying e-commerce data. The project uses Create React App to set up the front-end and builds the back-end API using Express.js.
<img width="891" alt="Screenshot 2025-01-14 at 2 06 17 PM" src="https://github.com/user-attachments/assets/0952adb3-da74-4e3d-bf4b-c8aa7038ffc8" />
![dashboard2](https://github.com/user-attachments/assets/1b9e7565-8dc8-4697-9f55-2d04a53feb94)
![dashboard-web](https://github.com/user-attachments/assets/b5b68bd2-646c-4893-a99f-9b6ccaf07303)
![dashboard-web2](https://github.com/user-attachments/assets/7ce3549c-161f-46bc-8f7c-7eb3bf746437)

## Project Structure
m-comm-dashboard/

├── client/           # React front-end

├── server/           # Node.js back-end

├── package.json      # Dependencies and scripts for the root

└── README.md    

## Project Introduction
The project consists of two main parts:

client: Front-end application (React)
server: Back-end API (Node.js + Express)

Prerequisites
Node.js and npm should be installed on your system.

## Installation
1. Clone the repository:
git clone https://github.com/w0436300/dashboard.git

2. Install all dependencies in one click
Run the following command to install all dependencies under the root directory, client and server directories:

     `npm run install-all`

## Available scripts
In the project root, you can use the following scripts:
1. Start the frontend and backend (development mode)
 
   `npm run dev`
  
This command will start both:
Frontend (React): Run at http://localhost:3000
Backend (Node.js + Express): Run at http://localhost:5001

2. Start the frontend (React application)
 
   `npm run client`
   
4. Start the backend (Node.js API)

    `npm run server`

6. Build the frontend project

     `npm run build`

## Data import and initialization
There is an insertData.js script in the server directory, which is used to import the initial data into MongoDB.

How to use
1. Navigate to the server directory:

    `cd server`
   
2. Run the data import script:
 
    `node insertData.js`

If successful, you will see the prompt "Data import successful!"
## Environment Variable Configuration
Make sure to create .env files in both the server and client directories:

### server/.env
PORT=5001

MONGODB_URI=<your_mongo_connection_string>

JWT_SECRET=<your_jwt_secret>

CORS_ORIGIN=http://localhost:3000

STRIPE_SECRET_KEY=<your_stripe_secret_key>

STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

NODE_ENV=development

GA_PROPERTY_ID-old=

GOOGLE_APPLICATION_CREDENTIALS=

GA_PROPERTY_ID=

stripe listen --forward-to localhost:5001/api/subscription/webhook

### client/.env

REACT_APP_API_URL=http://localhost:5001
REACT_APP_GOOGLE_CLIENT=<your_google_client_id>

REACT_APP_GOOGLE_CLIENT_SECRET=<your_google_client_secret>



