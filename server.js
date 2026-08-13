const express = require("express");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, "data.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initial = {
      services: [
        { id: nanoid(8), nom: "Consultation initiale", duree: 45, description: "Premier rendez-vous de découverte." },
        { id: nanoid(8), nom: "Séance de suivi", duree: 30, description: "Rendez-vous de suivi habituel." }
      ],
      reservations: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// --- Prestations ---

app.get("/api/services", (req, res) => {
  res.json(readData().services);
});

app.post("/api/services", (req, res) => {
  const data = readData();
  const service = { id: nanoid(8), ...req.body };
  data.services.push(service);
  writeData(data);
  res.json(service);
});

app.put("/api/services/:id", (req, res) => {
  const data = readData();
  data.services = data.services.map((s) => (s.id === req.params.id ? { ...s, ...req.body, id: s.id } : s));
  writeData(data);
  res.json({ ok: true });
});

app.delete("/api/services/:id", (req, res) => {
  const data = readData();
  data.services = data.services.filter((s) => s.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

// --- Rendez-vous ---

app.get("/api/reservations", (req, res) => {
  res.json(readData().reservations);
});

app.post("/api/reservations", (req, res) => {
  const data = readData();
  const { serviceId, date, heure, nom, email, telephone } = req.body;

  if (!serviceId || !date || !heure || !nom || !email) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  const dejaPris = data.reservations.some((r) => r.date === date && r.heure === heure);
  if (dejaPris) {
    return res.status(409).json({ error: "Ce créneau vient d'être réservé, merci d'en choisir un autre." });
  }

  const service = data.services.find((s) => s.id === serviceId);
  const reservation = {
    id: nanoid(10),
    serviceId,
    serviceNom: service ? service.nom : "Prestation",
    date, heure, nom, email, telephone: telephone || "",
    statut: "confirme",
    creeLe: new Date().toISOString()
  };
  data.reservations.push(reservation);
  writeData(data);
  res.json(reservation);
});

app.delete("/api/reservations/:id", (req, res) => {
  const data = readData();
  data.reservations = data.reservations.filter((r) => r.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
