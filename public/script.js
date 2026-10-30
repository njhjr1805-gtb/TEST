document.getElementById("paragraphe").textContent =
    "Le JavaScript fonctionne !";


function change_txt() {
    const texte = document.getElementById("texte").value;
    document.getElementById("paragraphe").textContent =
        texte;
    console.log("Clic !")
}

const bouton = document.getElementById("btn_valider");

bouton.addEventListener("click", change_txt);