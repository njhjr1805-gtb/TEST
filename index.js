import express from "express";
import fs from "fs";

fs.writeFileSync("texte.txt", "Bonjour");

const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Serveur lancé");
});