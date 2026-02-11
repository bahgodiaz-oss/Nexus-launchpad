const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

// Endpoint to store Pinata credentials securely
router.post('/credentials', (req, res) => {
    const { pinataApiKey, pinataSecretApiKey } = req.body;

    if (!pinataApiKey || !pinataSecretApiKey) {
        return res.status(400).json({ message: 'API keys are required.' });
    }

    // Save credentials in a secure manner (e.g., encrypted or to a secure vault)
    // Here, we'll demonstrate a simple file writing (not secure in practice)
    const credentials = { pinataApiKey, pinataSecretApiKey };

    fs.writeFile('credentials.json', JSON.stringify(credentials), (err) => {
        if (err) return res.status(500).json({ message: 'Error saving credentials.' });
        res.status(200).json({ message: 'Credentials stored successfully.' });
    });
});

// Endpoint to retrieve Pinata credentials securely
router.get('/credentials', (req, res) => {
    fs.readFile('credentials.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error retrieving credentials.' });
        res.status(200).json(JSON.parse(data));
    });
});

module.exports = router;