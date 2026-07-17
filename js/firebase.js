import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiPnAGBAmBiNolsZD44jPx0-Q-6bu8wIU",
  authDomain: "simplyhenna-dff3e.firebaseapp.com",
  projectId: "simplyhenna-dff3e",
  storageBucket: "simplyhenna-dff3e.firebasestorage.app",
  messagingSenderId: "148761928976",
  appId: "1:148761928976:web:e6f3e2ceeaa18401aaf195",
  measurementId: "G-G0C4FKLZBR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
