const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'threats.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize table and seed initial data if empty
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS threats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      indicator TEXT NOT NULL,
      type TEXT NOT NULL,
      score INTEGER NOT NULL,
      status TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if initial seed is needed
  db.get("SELECT COUNT(*) AS count FROM threats", (err, row) => {
    if (err) {
      console.error('Error checking threat count:', err);
      return;
    }

    if (row && row.count === 0) {
      console.log('Seeding initial threat database records...');
      const seedData = [
        { indicator: 'http://free-crypto-giveaway.com', type: 'URL', score: 95, status: 'Red', description: 'Fake crypto giveaway landing page', created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
        { indicator: '192.168.1.45', type: 'IP', score: 65, status: 'Yellow', description: 'Suspicious IP address associated with scanning', created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
        { indicator: 'invoice-update@paypa1-support.com', type: 'Email', score: 88, status: 'Red', description: 'Phishing email attempting credential theft', created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
        { indicator: 'https://local-library.org', type: 'URL', score: 12, status: 'Green', description: 'Safe community portal', created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() }
      ];

      const stmt = db.prepare(`
        INSERT INTO threats (indicator, type, score, status, description, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      seedData.forEach(item => {
        stmt.run(item.indicator, item.type, item.score, item.status, item.description, item.created_at);
      });
      stmt.finalize();
    }
  });
});

/**
 * Returns all threats ordered by newest first
 */
function getAllThreats() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM threats ORDER BY created_at DESC", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Inserts a new threat record into the database
 */
function insertThreat({ indicator, type, score, status, description }) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO threats (indicator, type, score, status, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const createdAt = new Date().toISOString();
    stmt.run([indicator, type, score, status, description || '', createdAt], function (err) {
      if (err) return reject(err);
      resolve({
        id: this.lastID,
        indicator,
        type,
        score,
        status,
        description,
        created_at: createdAt
      });
    });
    stmt.finalize();
  });
}

/**
 * Returns aggregated analytics data
 */
function getAnalyticsData() {
  return new Promise((resolve, reject) => {
    db.all("SELECT type, COUNT(*) as count FROM threats GROUP BY type", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  db,
  getAllThreats,
  insertThreat,
  getAnalyticsData
};
