const express = require('express');
const path = require('path');
const athletes = require('./Data.js');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

//READ ALL
app.get('/athletes', (req, res) => {
  res.json(athletes);
});

//READ SELECTED ID
app.get('/athletes/:id', (req, res) => {
  const athlete = athletes.find(a => a.id === parseInt(req.params.id));
  if (!athlete) {
    return res.status(404).send({ message: 'Athlete not found' });
  }
  res.json(athlete);
});

//POST REQ
app.post('/athletes', (req, res) => {
  const { name, image, sport, country, birthDate, isActive, titles, achievements } = req.body;
  const newId = athletes.length ? Math.max(...athletes.map(a => a.id)) + 1 : 1;
  const newAthlete = { id: newId, name, image, sport, country, birthDate, isActive, titles, achievements };
  athletes.push(newAthlete);
  res.status(201).json(newAthlete);
});

//UPDATE REQ
app.put('/athletes/:id', (req, res) => {
  const athleteId = parseInt(req.params.id);
  const athlete = athletes.find(a => a.id === athleteId);
  if (!athlete) {
    return res.status(404).send({ message: 'Athlete not found' });
  }
  const { name, image, sport, country, birthDate, isActive, titles, achievements } = req.body;
  Object.assign(athlete, { name, image, sport, country, birthDate, isActive, titles, achievements });
  res.json(athlete);
});

//DELETE REQ
app.delete('/athletes/:id', (req, res) => {
  const athleteId = parseInt(req.params.id);
  const index = athletes.findIndex(a => a.id === athleteId);
  if (index === -1) {
    return res.status(404).send({ message: 'Athlete not found' });
  }
  const deleted = athletes.splice(index, 1);
  res.json({ message: 'Athlete deleted', athlete: deleted[0] });
});
app.all('/{*splat}', (req, res) => {
  res.status(404).send({ message: '404 not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});