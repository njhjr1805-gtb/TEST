document.getElementById("paragraphe").textContent =
    "Étape 1";

fetch("/load")
    .then(function(response) {
        document.getElementById("paragraphe").textContent =
            "Étape 2";
        return response.text();
    })
    .then(function(texte) {
        document.getElementById("paragraphe").textContent =
            "Étape 3 : " + texte;
    })
    .catch(function(err) {
        document.getElementById("paragraphe").textContent =
            "Erreur";
    });