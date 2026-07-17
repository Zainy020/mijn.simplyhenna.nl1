import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const voornaam = document.getElementById("voornaam").value.trim();
    const achternaam = document.getElementById("achternaam").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefoon = document.getElementById("telefoon").value.trim();
    const geboortedatum = document.getElementById("geboortedatum").value;
    const geslacht = document.getElementById("geslacht").value;

    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    const nieuwsbrief = document.getElementById("nieuwsbrief").checked;

    if (password !== password2) {
        alert("❌ Wachtwoorden komen niet overeen.");
        return;
    }

    try {

        // Account aanmaken
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        console.log("✅ Account aangemaakt:", user.uid);

        // Gegevens opslaan in Firestore
        await setDoc(doc(db, "klanten", user.uid), {

            voornaam,
            achternaam,
            email,
            telefoon,
            geboortedatum,
            geslacht,

            punten: nieuwsbrief ? 20 : 0,

            nieuwsbrief,

            lidmaatschap: false,

            rol: "klant",

            aangemaaktOp: serverTimestamp()

        });

        console.log("✅ Firestore-document opgeslagen.");

        alert("🎉 Welkom bij MIJNsimplyhenna!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert(
            "Er ging iets mis.\n\n" +
            error.code + "\n\n" +
            error.message
        );

    }

});
