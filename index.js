import express from "express";
import fetch from "node-fetch";
import xml2js from "xml2js";

const app = express();
const parser = new xml2js.Parser();

async function getRadioInfo() {
    const url = "https://data.radioclassique.fr/XML_Metadata/direct_2.xml";
    const response = await fetch(url);
    const xml = await response.text();
    const data = await parser.parseStringPromise(xml);

    for (const song of data.RadioClassique.song) {
        if (song.Status?.[0] === "En ce moment") {
            return {
                name: song.name?.[0],
                title: song.title?.[0],
                interpretes: song.Interpretes?.[0]
            };
        }
    }
    return null;
}

app.get("/", async (req, res) => {
    const info = await getRadioInfo();
    res.send(info ? info : "Aucune info");
});

const PORT = process.env.PORT;   // Render impose ce port
app.listen(PORT, () => console.log(`Serveur lancé sur ${PORT}`));
