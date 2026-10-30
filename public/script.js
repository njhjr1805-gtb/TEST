fetch("/load")
    .then(response => response.text())
    .then(texte => {
        document.getElementById("paragraphe").textContent =
            texte;
    })
    .catch(err => {
        document.getElementById("paragraphe").textContent =
            "Erreur fetch";
    });