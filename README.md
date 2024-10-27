# Art Sleuth

A web application for users to explore artworks from free museum APIs and create virtual exhibitions.

Visit app hosted on netlify:  
https://artsleuth.netlify.app/

### Testing the App
A whitelisted user account is set up to explore full app functionality:

- **Email**: `test-user@example.com`
- **Password**: `testPassword123!`


## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Browse or search artworks from free art museum APIs
- Create exhibitions and add artworks
- Sign up to save personalised exhibitions
- View and edit individual exhibitions
- Access detailed information about each artwork

## Requirements

### **Frontend:**
- **Technologies**: React, Typescript, ApolloClient, styled-components, Cypress
- **Description**: A responsive React app using TypeScript and Apollo Client for API interactions, optimized for future PWA support.

### **Public APIs**:
- [Art Institute of Chicago](https://api.artic.edu/docs/)
- [V&A](https://developers.vam.ac.uk/guide/v2/welcome.html) 

### **API Service:**

- **Technologies**: GraphQL, ApolloServer, Node.js, Express, Jest*
- **Description**: Aggregates data from various REST APIs with custom GraphQL resolvers tailored for frontend needs.

### **Auth/Database**: Firebase/Firestore
- **Technologies**: Firebase, Firestore
- **Description**: Utilizes Firebase for authentication and Firestore for scalable NoSQL database management.

## Installation

Follow these instructions to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

### Installation

1.  **Clone the repository**:
    
    ```bash
    git clone https://github.com/s-m0907/ec-app.git
    cd ec-app
    ```
    
2.  **Install the backend dependencies**:  
    Navigate to the backend directory:
    
    ```bash
    cd backend
    npm install
    ```
    
3.  **Install the frontend dependencies**:  
    Navigate to the frontend directory:
    
    ```bash
    cd frontend/app
    npm install
    ```

### Configuration

To run the frontend locally, set up your Firebase project::

### Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click on **Add project**.

### Step 2: Obtain Firebase Configuration

1.  Go to **Project settings** and register the app.
2.  Copy the Firebase configuration snippet.

### Step 3: Create the `.env` File

1.  Create a `.env` file in the frontend/app directory.
    
2.  Add your Firebase configuration:
    
    ```env
    FIREBASE_API_KEY=your_api_key_here
    FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    FIREBASE_APP_ID=your_app_id
    
    ```
    
## Usage

1.  **Start the backend server**:
    
    ```bash
    npm start
    ```
    
    - Apollo server runs at http://localhost:4000.

2.  **Start the frontend application**:
    
    ```bash
    npm start
    ```
    
    - React app runs at http://localhost:3000.
3.  **Access the application**:
    
    - Navigate to http://localhost:3000 to view the app in development mode.

## Future Enhancements
 - PWA Support: Add installation, offline capabilities and improved caching.
- Enhanced Search: Implement comprehensive sort and filter feature for artworks.
- Shareable links: Enable users to share created exhibitions via social media.