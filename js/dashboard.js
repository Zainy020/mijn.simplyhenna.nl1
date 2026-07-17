import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const welcome = document.getElementById("welcome");
const punten = document.getElementById("punten");
const membership = document.getElementById("membership");
const logoutButton = document.getElementById("logoutButton");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    const klantRef = doc(db, "klanten", user.uid);
    const klantSnap = await getDoc(klantRef);

    if (!klantSnap.exists()) {
      welcome.textContent = "🤎 Hallo!";
      punten.textContent = "0 punten";
      membership.textContent = "💎 Geen Simply Henna+";
      return;
    }

    const data = klantSnap.data();

    welcome.textContent = `🤎 Hallo, ${data.voornaam}!`;
    punten.textContent = `${data.punten} punten`;

    membership.textContent = data.lidmaatschap
      ? "💎 Simply Henna+ actief"
      : "💎 Geen Simply Henna+";

  } catch (error) {

    console.error(error);

    alert(error.code + "\n\n" + error.message);

  }

});

logoutButton.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "login.html";

});
