import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/save", (req, res) => {
    fs.writeFileSync(
        "texte.txt",
        req.body.texte,
        "utf8"
    );

    res.send("OK");
});

app.get("/load", (req, res) => {
    if (!fs.existsSync("texte.txt")) {
        res.send("");
        return;
    }

    const texte = fs.readFileSync(
        "texte.txt",
        "utf8"
    );

    res.send(texte);
});

app.listen(3000, () => {
    console.log("Serveur lancé");
});

//const texte = fs.readFileSync("texte.txt", "utf8");