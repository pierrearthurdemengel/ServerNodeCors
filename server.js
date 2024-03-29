const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/breachedaccount/:email', (req, res) => {
  const email = req.params.email;
  const API_KEY = process.env.API_KEY;

  fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
    headers: { 'hibp-api-key': API_KEY }
  })
  .then(apiRes => apiRes.json())
  .then(data => res.json(data))
  .catch(error => {
    res.status(500).json({ error: error.toString() });
  });
});

app.get('/api/breach/:breachName', (req, res) => {
  const breachName = req.params.breachName;
  const API_KEY = process.env.API_KEY;

  fetch(`https://haveibeenpwned.com/api/v3/breach/${breachName}`, {
    headers: { 'hibp-api-key': API_KEY }
  })
  .then(apiRes => {
    if (!apiRes.ok) throw new Error('Échec de la récupération des détails de la fuite.');
    return apiRes.json();
  })
  .then(data => res.json(data))
  .catch(error => {
    res.status(500).json({ error: error.toString() });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
