const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const EXTERNAL_DIR = path.join(__dirname, 'external', 'templates');
if (!fs.existsSync(EXTERNAL_DIR)) {
  fs.mkdirSync(EXTERNAL_DIR, { recursive: true });
}

// Static serve so the client can fetch external templates
app.use('/external/templates', express.static(EXTERNAL_DIR));

// Allowed filenames to prevent arbitrary file writes
const ALLOWED_FILES = new Set([
  'anamnez_templates.json',
  'test_templates.json',
  'diagnosis_templates.json',
  'scoring_systems.json'
]);

app.get('/api/templates/list', (req, res) => {
  fs.readdir(EXTERNAL_DIR, (err, files) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true, files });
  });
});

app.post('/api/templates/save/:name', (req, res) => {
  const name = req.params.name;
  if (!ALLOWED_FILES.has(name)) return res.status(400).json({ ok: false, error: 'Filename not allowed' });
  const filePath = path.join(EXTERNAL_DIR, name);
  const data = req.body;
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`External template server running at http://localhost:${PORT}`));
