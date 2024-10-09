import express from 'express';
import { spacePledge } from '@autonomys/auto-consensus';
import { activate } from '@autonomys/auto-utils';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

let api;

// Activate the API on server start
(async () => {
  api = await activate();
})();

// Handle __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get spacePledged data
app.get('/api/space-pledge', async (req, res) => {
  try {
    const spacePledged = await spacePledge(api);
    res.json({ spacePledged: spacePledged.toString() }); // Send as string to handle BigInt
  } catch (error) {
    console.error('Error fetching space pledged:', error);
    res.status(500).json({ error: 'Failed to fetch space pledge' });
  }
});

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
