<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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
