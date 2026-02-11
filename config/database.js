const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('nexus.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to create tables if they don't exist
const createTables = () => {
    // Create table for wallet data
    db.run(`CREATE TABLE IF NOT EXISTS wallets (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT NOT NULL UNIQUE, balance REAL NOT NULL)`);

    // Create table for token metadata
    db.run(`CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, symbol TEXT NOT NULL UNIQUE, metadata TEXT)`);

    // Create table for API keys
    db.run(`CREATE TABLE IF NOT EXISTS api_keys (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL UNIQUE)`);

    console.log('Tables created or already exist.');
};

// Initialize database
createTables();

// Export the database connection
module.exports = db;