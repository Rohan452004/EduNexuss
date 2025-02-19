# EduNexus Ed-Tech Platform (MERN App)

EduNexus is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

- Designed and implemented a RESTful API with JWT authentication, OTP verification, and role-based access control, ensuring a secure and scalable backend.
- Integrated Razorpay for payment processing and Cloudinary for cloud-based media management, enhancing platform functionality and scalability.
- Deployed the platform using Vercel (frontend), Render (backend), and MongoDB Atlas (database), ensuring high availability and performance.

<img width="1385" alt="Screenshot 2025-02-20 at 2 31 37 AM" src="https://github.com/user-attachments/assets/edc1caec-fba8-447a-bf61-2c80a5a6c8ba" />

---

## Project Description

- EduNexus is an easy-to-use online learning platform that connects students with instructors. It offers a seamless learning experience with interactive courses and progress tracking for students, while giving instructors the tools to create, manage, and sell courses.

- The platform is built with a strong technical foundation, covering front-end, back-end, APIs, deployment, and testing to ensure smooth performance. Future updates will enhance features and improve user experience.
  
---

## 🏗️ System Architecture

### 1️⃣ Front-end

- Built using **React.js** for a dynamic and responsive user experience.
- Communicates with the back-end via **RESTful API calls**.
- Ensures a seamless and engaging learning experience for students and instructors.

### 2️⃣ Back-end

- Developed using **Node.js** and **Express.js** for scalability and performance.
- Implements **JWT-based authentication** for secure user access.
- Provides a set of **RESTful APIs** for functionalities like user authentication, course management, and data retrieval.
- Handles **media processing, course content management**, and **user roles efficiently**.

### 3️⃣ Database

- Uses **MongoDB**, a NoSQL database, ensuring flexible and scalable data storage.

## 🔍 Architecture Diagram

![273155075-e1579537-8c22-4d1d-8b17-c5f037570bb2](https://github.com/user-attachments/assets/9d352315-cfa0-458b-9387-8d3745b5fb37)

---

![image](https://github.com/user-attachments/assets/93625c73-3f4f-45f6-980a-d9af259b2188)

---

## Installation

1. Clone the repository: `git clone https://github.com/username/repo.git`
2. Navigate to the project directory: `cd EduNexuss`
3. Install dependencies: `npm install`
4. Go to `cd server`
5. Install dependencies `npm install`

---

## Configuration

1. Set up a MongoDB database and obtain the connection URL.
2. Set up a Cloudinary,Razorpay,node-mailer and obtain the connection URL.
3. Add all those in server config (.env)
4. Create a `.env` file in the root directory with the following environment variables:
   ```
   REACT_APP_BASE_URL = <Backend_url> eg. http://localhost:4000/api/v1
   REACT_APP_RAZORPAY_KEY_ID = <Razorpay_Key>
   ```

---

## Usage

1. Start the client: `npm start`
2. Open a new terminal and navigate to the `server` directory: `cd server`
3. Start the server: `npm start`

Access the application in your browser at `http://localhost:3000`.







