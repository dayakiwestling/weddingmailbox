import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB08yvS2x5d3VpP9zKmAWSGKyo4B_DOiF8",
  authDomain: "weddingmailboxd.firebaseapp.com",
  databaseURL: "https://weddinboxd-default-rtdb.firebaseio.com",
  projectId: "weddingmailboxd",
  storageBucket: "weddingmailboxd.firebasestorage.app",
  messagingSenderId: "279392529988",
  appId: "1:279392529988:web:cdd051f408d4cfb2411611",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
