import { auth, db } from "../js/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("profileForm");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    const docRef = doc(db, "klanten", user.uid);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
        alert("Profiel niet gevonden.");
        return;
    }

    const data = snap.data();

    document.getElementById("voornaam").value = data.voornaam || "";
    document.getElementById("achternaam").value = data.achternaam || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("telefoon").value = data.telefoon || "";
    document.getElementById("geboortedatum").value = data.geboortedatum || "";
    document.getElementById("geslacht").value = data.geslacht || "";
    document.getElementById("nieuwsbrief").checked = data.nieuwsbrief || false;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        await updateDoc(docRef, {
            voornaam: document.getElementById("voornaam").value,
            achternaam: document.getElementById("achternaam").value,
            telefoon: document.getElementById("telefoon").value,
            geboortedatum: document.getElementById("geboortedatum").value,
            geslacht: document.getElementById("geslacht").value,
            nieuwsbrief: document.getElementById("nieuwsbrief").checked
        });

        alert("✅ Je profiel is opgeslagen!");

    });

});
