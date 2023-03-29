require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const JWTSECRET = process.env.JWTSECRET || "myjwtsecret12355";
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

const FIREBASE_CONFIG = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const SERVER = {
  port: PORT,
  secret: JWTSECRET,
  baseURL: BASE_URL,
  db: DB_HOST,
  firebaseConfig: FIREBASE_CONFIG,
};

module.exports = SERVER;
