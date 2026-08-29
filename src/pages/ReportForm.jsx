import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReportForm() {
  const [threatData, setThreatData] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: 'success' | 'error', message: string, threat?: object }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!threatData.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threatData, description }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult({
        type: 'success',
        message: data.message || 'Threat analyzed & stored successfully!',
        threat: data.threat
      });
      setThreatData('');
      setDescription('');
    } catch (err) {
      console.error('Submission error:', err);
      setResult({
        type: 'error',
        message: err.message || 'Failed to connect to threat engine backend server.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Quick fill sample data helper
  const handleQuickFill = (sample) => {
    setThreatData(sample.indicator);
    setDescription(sample.desc);
  };

  const getRiskBadgeColor = (status, score) => {
    if (status === 'Red' || score >= 80) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    if (status === 'Yellow' || score >= 40) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  };

  return (
    <div className="space-y-12 py-4">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Community Defense Network
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Report & Neutralize <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Cyber Threats</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Submit suspicious links, IP addresses, or email headers. Our backend strips sensitive parameters, evaluates threat risk scores in real-time, and logs data into our database.
        </p>

        {/* Feature Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Automatic PII Anonymization
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Risk Engine (0-100)
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
            </svg>
            Persistent SQLite DB
          </div>
        </div>
      </div>

      {/* Main Submission Form Card */}
      <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Threat Submission Form
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Input suspicious indicators for instant heuristic risk scoring.</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-mono text-slate-400 border border-slate-700">
              Auto-Classification
            </span>
          </div>

          {/* Quick-fill samples */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Try a Quick Preset Sample:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill({
                  indicator: 'http://free-crypto-giveaway.xyz/login?token=secret123',
                  desc: 'Suspicious crypto giveaway link received via Telegram'
                })}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                Phishing URL
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill({
                  indicator: '45.33.32.156',
                  desc: 'Port scanner probing web server'
                })}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Malicious IP
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill({
                  indicator: 'billing-update@paypa1-support.com',
                  desc: 'Fake invoice notice requesting password reset'
                })}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Typosquat Email
              </button>
            </div>
          </div>

          {/* Error / Feedback Message */}
          {result && result.type === 'error' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-rose-200">Submission Error</p>
                <p className="text-xs text-rose-300/90 mt-0.5">{result.message}</p>
              </div>
            </div>
          )}

          {/* Submission Success Report Card */}
          {result && result.type === 'success' && result.threat && (
            <div className="p-5 rounded-xl bg-slate-950 border border-blue-500/30 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Threat Analyzed & Saved
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${getRiskBadgeColor(result.threat.status, result.threat.score)}`}>
                  {result.threat.status || 'Scored'} Risk
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Risk Score</span>
                  <span className="text-2xl font-black text-white">{result.threat.score}/100</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Category</span>
                  <span className="text-lg font-bold text-blue-400 uppercase">{result.threat.type}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Database Status</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Persisted in SQLite
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Anonymized Output Indicator</span>
                <p className="font-mono text-xs text-blue-300 break-all bg-slate-950 p-2 rounded border border-slate-800">
                  {result.threat.indicator}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  to="/feed"
                  className="flex-1 text-center py-2 px-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold rounded-lg transition"
                >
                  View in Live Feed →
                </Link>
                <Link
                  to="/analytics"
                  className="flex-1 text-center py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                >
                  View Analytics →
                </Link>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Suspicious URL, IP, or Email Header <span className="text-blue-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={threatData}
                  onChange={(e) => setThreatData(e.target.value)}
                  placeholder="e.g., http://free-crypto-giveaway.xyz or 192.168.1.45"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 text-sm font-mono"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Additional Context / Finding Source <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Where did you encounter this? (e.g. Received phishing SMS, Discord DM, server access log)"
                className="w-full p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 text-sm"
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading || !threatData.trim()}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm tracking-wide"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing & Anonymizing Threat...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Anonymize & Score Threat
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* Feature Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
        
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">1. Parameter Sanitization</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our engine automatically strips sensitive query parameters (auth tokens, personal emails, keys) from URL strings before storing them in the community feed.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">2. Heuristic Risk Scoring</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Calculates 0-100 risk values based on suspicious TLD detection (`.xyz`, `.phish`), typosquatting domain analysis, IP ranges, and phishing keywords.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">3. Persistent Database</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All scored threat records are stored in a persistent SQLite database, empowering community members with live feed streams and analytical insights.
          </p>
        </div>

      </div>

    </div>
  );
}
