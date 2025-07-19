# 🗳️ Voting Application

A secure and minimal RESTful voting system built using **Node.js**, **Express**, **MongoDB**, and **JWT**. This application allows users to register with a unique government ID (Aadhar), view candidates, vote, and check live voting results. Admins can manage the list of candidates.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up / Login via Aadhar)
- 📋 View candidate list
- ✅ Vote for a candidate (only once)
- 📊 Live vote counts (sorted)
- 🔑 Change user password
- 👨‍💼 Admin-only candidate management
- 🔒 JWT-protected routes

---

## 📁 Project Structure


.


├── db.js                 # MongoDB connection setup


├── jwt.js                # JWT generation and middleware


├── server.js             # Express app entry point


├── routes/               # All route handlers (user, vote, candidate)


├── .env                  # Environment variables (ignored by Git)


├── .gitignore


├── package.json


└── planning.txt          # Project plan and API spec


---

## 🔧 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcrypt
- **Environment Configuration:** dotenv
- **Others:** passport, passport-local

---

## 📦 Installation

# Navigate into the project directory
cd voting-application

# Install dependencies
npm install

# Create a .env file in root with the following
PORT=3000


MONGODB_URL_LOCAL=mongodb://127.0.0.1:27017/voting


JWT_SECRET=your_secret_key

# Start the development server
npm start


📌 API Endpoints


👥 User Authentication


Route	Method	Description


/user/signup	POST	Register a new user


/user/login	POST	Login with Aadhar & Password




🗳️ Voting


Route	Method	Description


/vote/candidates	GET	Get list of all candidates


/vote/:candidateId	POST	Vote for a candidate




📈 Vote Count


Route	Method	Description


/vote/counts	GET	List candidates sorted by vote count




🔐 User Profile


Route	Method	Description


/user/profile	GET	Get logged-in user data


/user/profile/password	PUT	Change password




🧑‍💼 Admin Candidate Management


Route	Method	Description


/candidate	POST	Add new candidate


/candidate/:candidateId	PUT	Update candidate info


/candidate/:candidateId	DELETE	Remove a candidate



⚠️ Admins can manage candidates but are not allowed to vote.

📄 License
This project is licensed under the MIT License.

🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or improve.

🧠 Author
Created by Dhruv Dhemare

---

Let me know if you want this tailored to include your GitHub username, add screenshots, or deploy instructions (e.g., for Render, Railway, or Heroku).
