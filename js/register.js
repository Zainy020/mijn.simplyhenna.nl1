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

    const voornaam = document.getElementById("voornaam").value;
    const achternaam = document.getElementById("achternaam").value;
    const email = document.getElementById("email").value;
    const telefoon = document.getElementById("telefoon").value;
    const geboortedatum = document.getElementById("geboortedatum").value;
    const geslacht = document.getElementById("geslacht").value;

    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    const nieuwsbrief = document.getElementById("nieuwsbrief").checked;

    if(password !== password2){

        alert("Wachtwoorden komen niet overeen.");
        return;

    }

    try{

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await setDoc(doc(db,"klanten",user.uid),{

            voornaam: voornaam,
            achternaam: achternaam,
            email: email,
            telefoon: telefoon,
            geboortedatum: geboortedatum,
            geslacht: geslacht,

            punten: nieuwsbrief ? 20 : 0,

            nieuwsbrief: nieuwsbrief,

            lidmaatschap: false,

            rol: "klant",

            aangemaaktOp: serverTimestamp()

        });

        alert("🎉 Welkom bij MIJNsimplyhenna!");

        window.location.href="dashboard.html";

    }

    catch(error){

        alert(error.message);

    }

});
