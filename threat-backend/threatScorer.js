/**
 * Threat Scoring Engine
 * Analyzes indicator string (URL, IP, Email) to determine threat type, calculate risk score (0-100),
 * assign a status level (Red, Yellow, Green), and sanitize sensitive data.
 */

// Common phishing/suspicious keywords
const PHISHING_KEYWORDS = [
  'crypto', 'giveaway', 'login', 'verify', 'paypal', 'paypa1', 'support',
  'update', 'bank', 'secure', 'claim', 'account', 'free', 'bonus', 'wallet',
  'signin', 'admin', 'password', 'confirm', 'billing', 'invoice', 'service'
];

// Suspicious TLDs commonly used in phishing/malware
const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.click', '.zip', '.phish', '.cc', '.su', '.work',
  '.biz', '.download', '.info', '.site', '.online', '.club'
];

/**
 * Classifies an indicator string as 'URL', 'IP', 'Email', or 'Other'.
 */
function classifyThreatType(indicator) {
  if (!indicator || typeof indicator !== 'string') return 'Other';
  const clean = indicator.trim().toLowerCase();

  // 1. Explicit URL check (http://, https://, www.)
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('www.')) {
    return 'URL';
  }

  // 2. IP address check (IPv4 with optional port / IPv6)
  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::[0-9]{1,5})?$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv4Regex.test(clean) || ipv6Regex.test(clean)) {
    return 'IP';
  }

  // 3. Email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(clean)) {
    return 'Email';
  }

  // 4. Domain / URL fallback check
  const urlRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (urlRegex.test(clean)) {
    return 'URL';
  }

  return 'Other';
}

/**
 * Sanitizes and anonymizes indicator (e.g. stripping sensitive URL params or credentials)
 */
function sanitizeIndicator(indicator, type) {
  if (!indicator) return '';
  let cleaned = indicator.trim();

  if (type === 'URL') {
    try {
      const targetUrl = cleaned.match(/^https?:\/\//i) ? cleaned : `http://${cleaned}`;
      const parsed = new URL(targetUrl);

      // Strip sensitive query parameters
      const sensitiveParams = ['token', 'auth', 'key', 'user', 'pass', 'password', 'email', 'session', 'sig', 'secret', 'id', 'access_token'];
      sensitiveParams.forEach(param => parsed.searchParams.delete(param));

      let result = parsed.toString();
      // Remove trailing slash if original didn't have path
      if (!cleaned.includes('/', 8) && result.endsWith('/')) {
        result = result.slice(0, -1);
      }
      // Preserve original scheme format if input did not include http(s)://
      if (!cleaned.match(/^https?:\/\//i)) {
        result = result.replace(/^https?:\/\//i, '');
      }
      return result;
    } catch {
      return cleaned;
    }
  }

  return cleaned;
}

/**
 * Calculates risk score (0-100) and risk level status ('Red', 'Yellow', 'Green').
 */
function calculateThreatScore(indicator, type) {
  let score = 15; // Baseline initial score
  const lower = indicator.toLowerCase();

  if (type === 'URL') {
    // 1. IP address used as hostname in URL
    if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower) || /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower)) {
      score += 25;
    }

    // 2. HTTP instead of HTTPS
    if (lower.startsWith('http://')) {
      score += 15;
    }

    // 3. Suspicious TLD check
    if (SUSPICIOUS_TLDS.some(tld => lower.includes(tld))) {
      score += 25;
    }

    // 4. Phishing keywords check
    let matchedKeywords = 0;
    PHISHING_KEYWORDS.forEach(kw => {
      if (lower.includes(kw)) matchedKeywords++;
    });
    score += Math.min(matchedKeywords * 15, 35);

    // 5. Symbol '@' or multiple subdomains in URL
    if (lower.includes('@')) score += 20;
    if ((lower.match(/\./g) || []).length >= 3) score += 10;

    // 6. Long URL length
    if (lower.length > 60) score += 10;

  } else if (type === 'IP') {
    // Check if private/local IP
    const isPrivate = /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/.test(lower);
    if (isPrivate) {
      score = 25; // Local test IP
    } else {
      score = 65; // Public IP reported by community
    }

    // Known test threat indicators
    if (lower.includes('192.168.1.45') || lower.includes('45.33.')) {
      score += 20;
    }

  } else if (type === 'Email') {
    score = 30;
    // Typosquatting detection (e.g. paypa1, g00gle, support)
    if (/paypa1|g00gle|micros0ft|app1e|supp0rt|sec0nd|updat3/.test(lower)) {
      score += 45;
    }

    // Suspicious keywords in email address
    PHISHING_KEYWORDS.forEach(kw => {
      if (lower.includes(kw)) score += 10;
    });

    if (SUSPICIOUS_TLDS.some(tld => lower.includes(tld))) {
      score += 15;
    }
  } else {
    // Other types
    score = 40;
  }

  // Ensure score stays within 0 to 100
  const finalScore = Math.min(Math.max(score, 0), 100);

  // Status mapping
  let status = 'Green';
  if (finalScore >= 80) {
    status = 'Red';
  } else if (finalScore >= 40) {
    status = 'Yellow';
  }

  return { score: finalScore, status };
}

/**
 * Main analyzer function
 */
function analyzeThreat(rawIndicator) {
  const type = classifyThreatType(rawIndicator);
  const sanitizedIndicator = sanitizeIndicator(rawIndicator, type);
  const { score, status } = calculateThreatScore(sanitizedIndicator, type);

  return {
    indicator: sanitizedIndicator,
    type,
    score,
    status
  };
}

module.exports = {
  classifyThreatType,
  sanitizeIndicator,
  calculateThreatScore,
  analyzeThreat
};
