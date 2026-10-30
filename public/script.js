function charger() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("paragraphe").textContent =
                xhr.responseText;
        }
    };

    xhr.open("GET", "/load", true);
    xhr.send();
}

function change_txt() {
    var texte = document.getElementById("texte").value;

    document.getElementById("paragraphe").textContent =
        texte;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/save", true);
    xhr.setRequestHeader(
        "Content-Type",
        "application/json"
    );

    xhr.send(
        JSON.stringify({
            texte: texte
        })
    );
}

var bouton =
    document.getElementById("btn_valider");

bouton.addEventListener(
    "click",
    change_txt
);

charger();