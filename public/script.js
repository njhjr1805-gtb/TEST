document.getElementById("paragraphe").textContent =
    "Début";

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        document.getElementById("paragraphe").textContent =
            xhr.responseText;
    }
};

xhr.open("GET", "/load", true);
xhr.send();