const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional, but good for local dev)
// app.use(express.static('client'));
app.get('/', (req, res) => {
  res.send("Server is working");
});
// API Routes
app.use('/api/contact', contactRoutes);

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
