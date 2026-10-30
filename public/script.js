document.getElementById("paragraphe").textContent =
    "Le JavaScript fonctionne !";


async function change_txt() {
    const texte = document.getElementById("texte").value;
    document.getElementById("paragraphe").textContent =
        texte;
    
    await fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ texte })
    });
}

const bouton = document.getElementById("btn_valider");

bouton.addEventListener("click", change_txt);

async function charger() {
    const reponse = await fetch("/load");
    const texte = await reponse.text();

    document.getElementById("paragraphe").textContent =
        texte;
}

charger();