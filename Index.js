const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {
  try {
    // Preuzimanje IP adrese korisnika
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Poziv ka ip-api servisu
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;

    if (data.status === "success") {
      res.send(`
        <h1>IP Analiza</h1>
        <p><b>Zemlja:</b> ${data.country}</p>
        <p><b>Region:</b> ${data.regionName}</p>
        <p><b>Grad:</b> ${data.city}</p>
        <p><b>ISP:</b> ${data.isp}</p>
        <p><b>Vremenska zona:</b> ${data.timezone}</p>
        <p><b>Širina i dužina:</b> ${data.lat}, ${data.lon}</p>
      `);
    } else {
      res.send("Nije moguće odrediti lokaciju.");
    }
  } catch (error) {
    res.status(500).send("Greška prilikom analize IP adrese.");
  }
});

app.listen(3000, () => {
  console.log("Server radi na portu 3000");
});
