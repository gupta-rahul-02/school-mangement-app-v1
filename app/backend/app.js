const express = require("express");
// const firebase = require('./utils/firebaseConfig')
const connectionWiithDb = require("./config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const admin = require("firebase-admin");

const serviceAccount = require("./school-management-app-6a2cd-firebase-adminsdk-zyboy-078eccfa59.json");

const firebaseConfig = {
  apiKey: "AIzaSyAsbf6rGG4hnDxaAk3ZKIa6R47qJq2hR8I",
  authDomain: "school-management-app-6a2cd.firebaseapp.com",
  projectId: "school-management-app-6a2cd",
  storageBucket: "school-management-app-6a2cd.appspot.com",
  messagingSenderId: "458636167790",
  appId: "1:458636167790:web:c0b3fe04c745083ccfb47f",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});

var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

//testing route
app.get("/test", (req, res) => {
  console.log("tested");
});

const user = require("./routes/user.routes");
const attendance = require("./routes/attendance.routes");

app.use("/api/v1/user", user);
app.use("/api/v1/attendance", attendance);

app.listen(3000, () => {
  connectionWiithDb();
  console.log("port running at 3000");
});
module.exports = app;
