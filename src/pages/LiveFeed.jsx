import { useState, useEffect } from 'react';

export default function LiveFeed() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/threats');
      if (!response.ok) {
        throw new Error(`Failed to fetch threats (${response.status})`);
      }
      const data = await response.json();
      setThreats(data);
    } catch (err) {
      console.error('Error fetching live threats:', err);
      setError(err.message || 'Unable to connect to threat database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const getRiskStyle = (score) => {
    if (score >= 80) {
      return {
        card: 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500/50',
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        borderLeft: 'border-l-rose-500',
        scoreText: 'text-rose-400'
      };
    }
    if (score >= 40) {
      return {
        card: 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        borderLeft: 'border-l-amber-500',
        scoreText: 'text-amber-400'
      };
    }
    return {
      card: 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      borderLeft: 'border-l-emerald-500',
      scoreText: 'text-emerald-400'
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Threat Stream
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Real-time crowdsourced threat feed scored by our heuristic backend engine.</p>
        </div>

        <button
          onClick={fetchThreats}
          disabled={loading}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-semibold rounded-xl transition disabled:opacity-50 flex items-center gap-2 shadow-sm shrink-0"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Live Feed
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl">
          <svg className="animate-spin h-8 w-8 text-blue-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-400 text-sm font-medium">Fetching threat records from SQLite database...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl flex flex-col items-center text-center">
          <p className="font-bold text-lg mb-1">Database Connection Error</p>
          <p className="text-xs text-rose-300/80 mb-4">{error}</p>
          <button
            onClick={fetchThreats}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition"
          >
            Retry Connection
          </button>
        </div>
      ) : threats.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No community threats reported yet.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {threats.map((threat) => {
            const style = getRiskStyle(threat.score);
            return (
              <div 
                key={threat.id} 
                className={`p-5 rounded-xl border border-slate-800 border-l-4 shadow-lg transition duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${style.card} ${style.borderLeft}`}
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-mono text-[11px] font-bold border border-slate-700 uppercase">
                      [{threat.type}]
                    </span>
                    <span className="text-xs text-slate-400">{threat.timestamp}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${style.badge}`}>
                      {threat.status || (threat.score >= 80 ? 'Red' : threat.score >= 40 ? 'Yellow' : 'Green')}
                    </span>
                  </div>

                  <p className="font-mono text-base sm:text-lg font-semibold text-slate-100 break-all">
                    {threat.indicator}
                  </p>

                  {threat.description && (
                    <p className="text-xs text-slate-400 italic">"{threat.description}"</p>
                  )}
                </div>
                
                <div className="text-left sm:text-right shrink-0">
                  <div className={`text-3xl font-black ${style.scoreText}`}>
                    {threat.score}<span className="text-sm font-normal text-slate-500">/100</span>
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Risk Score</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
