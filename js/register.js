import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp,
    runTransaction
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
// Klantnummer genereren
const klantnummer = await runTransaction(db, async (transaction) => {

    const counterRef = doc(db, "config", "counters");
    const counterSnap = await transaction.get(counterRef);

    if (!counterSnap.exists()) {
        throw new Error("Counter bestaat niet.");
    }

    const nextNumber = counterSnap.data().nextCustomerNumber;

    transaction.update(counterRef, {
        nextCustomerNumber: nextNumber + 1
    });

    return "SH-" + String(nextNumber).padStart(6, "0");

});

// Gegevens opslaan
await setDoc(doc(db, "klanten", user.uid), {

klantnummer,

voornaam,
achternaam,
email,
telefoon,
geboortedatum,
geslacht,

punten: 0,

nieuwsbrief,
eersteKorting: nieuwsbrief,

lidmaatschap: false,

rol: "klant",

aangemaaktOp: serverTimestamp()

});
        console.log("✅ Firestore-document opgeslagen.");

        alert("🎉 Welkom bij MIJNsimplyhenna!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

       console.error("VOLLEDIGE FOUT:", error);
console.error("CODE:", error.code);
console.error("MESSAGE:", error.message);
console.error("STACK:", error.stack);

alert(error.code + "\n\n" + error.message);

    }

});
