// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
const admin = require("firebase-admin")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const serviceAccount = require("../school-management-app-6a2cd-firebase-adminsdk-zyboy-078eccfa59.json")
// Your web app's Firebase configuration

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "school-management-app-6a2cd.appspot.com",
})
const firebaseConfig = {
  apiKey: "AIzaSyAsbf6rGG4hnDxaAk3ZKIa6R47qJq2hR8I",
  authDomain: "school-management-app-6a2cd.firebaseapp.com",
  projectId: "school-management-app-6a2cd",
 
  messagingSenderId: "458636167790",
  appId: "1:458636167790:web:c0b3fe04c745083ccfb47f"
};

// Initialize Firebase

    const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


module.exports = {app, storage}