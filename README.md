**Group Messaging App**
**Overview**
The Group Messaging App is a web application that allows users to create groups, send messages, and manage group members. It includes real-time messaging functionality using Socket.io, and provides features like adding/removing members and viewing the list of group members. This project is built using the MERN (MongoDB, Express, React, Node.js) stack.

**Features**
-User Authentication: Secure user authentication with JWT tokens.
-Group Management: Create, update, delete groups, and manage group members.
-Real-time Messaging: Send and receive messages in real-time.
-User Management: View and add users to groups.
-Responsive UI: User-friendly and responsive design similar to WhatsApp.

**Technologies Used**
-Frontend: React, React Router
-Backend: Node.js, Express.js
-Database: MongoDB, Mongoose
-Real-time Communication: Socket.io
-Authentication: JSON Web Tokens (JWT)
-CSS Framework: Custom CSS for styling

**Getting Started**
Prerequisites
Node.js (v14 or later)
MongoDB

**Installation**
Clone the repository:
sh

**Copy code**
git clone [https://github.com/archi999/ChatApp.git]
cd group-messaging-app

**Install server dependencies:**
sh

**Copy code**
cd server
npm install
Install client dependencies:

sh
Copy code
cd ../client
npm install
Configure environment variables:

**Create a .env file in the server directory and add the following variables:**

env
Copy code
PORT=8080
MONGO_URI=
JWT_SECRET=
Start the MongoDB server:

Make sure your MongoDB server is running. If using MongoDB Atlas, ensure your connection string is correct.

**Run the server:**

sh
Copy code
cd ../server
npm start
Run the client:

Open a new terminal window and run:

sh
Copy code
cd client
npm start
The app should now be running at http://localhost:3000.

**Project Structure**
**Backend**
models: Mongoose models for User and Group.
controllers: Controller functions for handling requests.
routes: Express routes for API endpoints.
middleware: Middleware for authentication and authorization.
Frontend
src/components: React components for different parts of the app.
src/context: Context API for managing authentication state.
src/pages: Main pages of the application (e.g., Home, GroupDetails).
src/styles: CSS files for styling components.

**API Endpoints
Authentication**
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login an existing user.

**Groups**
POST /api/group/create: Create a new group.
GET /api/group/groups: Get all groups.
GET /api/group/:groupId: Get details of a specific group.
DELETE /api/group/delete/:groupId: Delete a group.
PUT /api/group/addMember/:groupId: Add a member to a group.
PUT /api/group/:groupId/leave: Remove a member from a group.

****Messages**
**POST /api/message/:groupId/:userId: Send a message in a group.

**Users**
GET /api/user/allUser: Get all users.

**Usage**
Register and Login:
Register a new account and log in.
Create Group:
Create a new group from the UI.
Manage Group:
Add or remove members and view the list of members.
Send Messages:
Send and receive messages in real-time within the group.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Inspired by messaging platforms like WhatsApp.
Built with the MERN stack for educational purposes.
