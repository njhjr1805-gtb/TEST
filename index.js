import express from "express";
import xml2js from "xml2js";

const app = express();
const parser = new xml2js.Parser();

async function getRadioInfo() {
    console.log("RC searching...");
    const url = "https://data.radioclassique.fr/XML_Metadata/direct_2.xml";

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/xml,text/xml"
        }
    });

    const xml = await response.text();
    console.log(xml);

    const data = await parser.parseStringPromise(xml);
    console.log(data);

    // NOUVELLE STRUCTURE
    const playlist = data.xml?.playlist?.[0];
    if (!playlist || !playlist.song) {
        console.log("❌PB de balise");
        return null;
    }

    for (const song of playlist.song) {
        if (song.Status?.[0] === "En ce moment") {
            console.log("✅ Chanson trouvée !!!");
            return {
                name: song.name?.[0],
                title: song.title?.[0],
                interpretes: song.Interpretes?.[0]
            };
        }
    }

    console.log("❌ Aucune chanson 'En ce moment'");
    return null;
}

app.get("/", async (req, res) => {
    const info = await getRadioInfo();

    if (!info) {
        res.send("<html><body>Aucune info</body></html>");
        return;
    }

    res.send(`
        <html><body>
        <p>${info.name}</p>
        <p>${info.title}</p>
        <p>${info.interpretes}</p>
        </body></html>
    `);
});

app.listen(3000, () => console.log("Serveur lancé"));
