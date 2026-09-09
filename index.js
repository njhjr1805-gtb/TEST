import express from "express";
import xml2js from "xml2js";

const app = express();
const parser = new xml2js.Parser();

async function getRadioInfo() {
    const url = "https://data.radioclassique.fr/XML_Metadata/direct_2.xml";

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/xml,text/xml"
        }
    });

    const xml = await response.text();
    const data = await parser.parseStringPromise(xml);

    if (!data.RadioClassique || !data.RadioClassique.song) {
        return null;
    }

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

app.listen(3000, () => console.log("Serveur lancé"));
