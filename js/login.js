import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Vul je e-mailadres en wachtwoord in.");
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("🎉 Succesvol ingelogd!");

    window.location.href = "dashboard.html";

  } catch (error) {

    switch (error.code) {

      case "auth/invalid-credential":
        alert("❌ Onjuist e-mailadres of wachtwoord.");
        break;

      case "auth/invalid-email":
        alert("❌ Ongeldig e-mailadres.");
        break;

      case "auth/too-many-requests":
        alert("⏳ Te veel mislukte pogingen. Probeer het later opnieuw.");
        break;

      default:
        alert("⚠️ " + error.message);

    }

  }

});
