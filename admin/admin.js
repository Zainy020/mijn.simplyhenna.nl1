import { auth, db } from "../js/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    // Niet ingelogd
    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    // Gebruiker ophalen
    const snap = await getDoc(doc(db, "klanten", user.uid));

    if (!snap.exists()) {
        alert("Gebruiker niet gevonden.");
        window.location.href = "../login.html";
        return;
    }

    const data = snap.data();

    // Geen admin
    if (data.rol !== "admin") {
        alert("Geen toegang.");
        window.location.href = "../dashboard.html";
        return;
    }

    console.log("✅ Admin ingelogd:", data.voornaam);

});
