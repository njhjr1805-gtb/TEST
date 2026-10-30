document.getElementById("paragraphe").textContent =
    "Étape 1";

fetch("/load")
    .then(response => {
        document.getElementById("paragraphe").textContent =
            "Étape 2";
        return response.text();
    })
    .then(texte => {
        document.getElementById("paragraphe").textContent =
            "Étape 3 : " + texte;
    })
    .catch(err => {
        document.getElementById("paragraphe").textContent =
            "Erreur";
    });