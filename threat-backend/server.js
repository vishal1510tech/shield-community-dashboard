/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const { analyzeThreat } = require('./threatScorer');
const { getAllThreats, insertThreat, getAnalyticsData } = require('./database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows your React app to send requests here
app.use(express.json()); // Allows the server to read JSON data

/**
 * Format timestamp into human-readable relative time string
 */
function getRelativeTimeString(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
}

// 1. Submit Threat Endpoint
app.post('/api/report', async (req, res) => {
  try {
    const { threatData, description } = req.body;

    if (!threatData || !threatData.trim()) {
      return res.status(400).json({ error: 'Threat indicator data is required.' });
    }

    console.log("🚨 NEW THREAT RECEIVED 🚨");
    console.log("Data:", threatData);
    console.log("Description:", description);

    // 2. Process threat through threat scoring logic
    const analyzed = analyzeThreat(threatData);

    // 3. Save processed threat to database
    const savedThreat = await insertThreat({
      indicator: analyzed.indicator,
      type: analyzed.type,
      score: analyzed.score,
      status: analyzed.status,
      description: description || ''
    });

    console.log("✅ Threat scored & saved to DB:", savedThreat);

    // Send back response with analysis details
    res.status(200).json({ 
      message: `Threat submitted successfully! Analyzed as ${analyzed.type} with Risk Score ${analyzed.score}/100 (${analyzed.status}).`,
      threat: {
        ...savedThreat,
        timestamp: getRelativeTimeString(savedThreat.created_at)
      }
    });
  } catch (err) {
    console.error('Error processing threat report:', err);
    res.status(500).json({ error: 'Failed to process and store threat report.' });
  }
});

// 2. Fetch Live Threat Feed Endpoint
app.get('/api/threats', async (req, res) => {
  try {
    const threats = await getAllThreats();
    
    // Format timestamp for frontend display
    const formatted = threats.map(item => ({
      id: item.id,
      indicator: item.indicator,
      type: item.type,
      score: item.score,
      status: item.status,
      description: item.description,
      timestamp: getRelativeTimeString(item.created_at)
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Error fetching threats:', err);
    res.status(500).json({ error: 'Failed to retrieve threat feed.' });
  }
});

// 3. Analytics Endpoint
app.get('/api/analytics', async (req, res) => {
  try {
    const rawCategoryCounts = await getAnalyticsData();
    
    // Convert DB query results to standard categories mapping
    const categoryMap = {
      'URL': 'Phishing URLs',
      'IP': 'Malicious IPs',
      'Email': 'Spam Emails',
      'Other': 'Malware Links'
    };

    const counts = {
      'Phishing URLs': 0,
      'Malicious IPs': 0,
      'Spam Emails': 0,
      'Malware Links': 0
    };

    rawCategoryCounts.forEach(row => {
      const label = categoryMap[row.type] || 'Malware Links';
      counts[label] = (counts[label] || 0) + row.count;
    });

    const chartData = [
      { name: 'Phishing URLs', count: counts['Phishing URLs'] },
      { name: 'Malicious IPs', count: counts['Malicious IPs'] },
      { name: 'Spam Emails', count: counts['Spam Emails'] },
      { name: 'Malware Links', count: counts['Malware Links'] }
    ];

    res.status(200).json(chartData);
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to retrieve threat analytics.' });
  }
});

// Start the engine
app.listen(PORT, () => {
  console.log(`Backend server is running live on http://localhost:${PORT}`);
});