import { useState, useMemo } from 'react';

export default function TelemetryLog({ threats = [], onRefresh, loading, error }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [density, setDensity] = useState('detailed'); // 'compact' | 'detailed'
  const [selectedThreat, setSelectedThreat] = useState(null);

  // Filtered threats based on query & category
  const filteredThreats = useMemo(() => {
    return threats.filter((threat) => {
      const matchesSearch = 
        threat.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (threat.description && threat.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        threat.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'ALL' || threat.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [threats, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set(threats.map(t => t.type));
    return ['ALL', ...Array.from(set)];
  }, [threats]);

  const getRiskBadgeStyle = (score) => {
    if (score >= 80) {
      return {
        badge: 'bg-rose-950/60 text-rose-400 border-rose-800',
        scoreText: 'text-rose-400'
      };
    }
    if (score >= 40) {
      return {
        badge: 'bg-amber-950/60 text-amber-400 border-amber-800',
        scoreText: 'text-amber-400'
      };
    }
    return {
      badge: 'bg-emerald-950/60 text-emerald-400 border-emerald-800',
      scoreText: 'text-emerald-400'
    };
  };

  return (
    <div className="bg-obsidian-900 border border-obsidian-800 rounded-sm p-5 space-y-4 font-mono text-xs">
      
      {/* Telemetry Log Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-obsidian-800 pb-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-sans">
            Telemetry Stream & Indicator Log
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time log of anonymized threat indicators stored in SQLite database.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Data Density Toggle */}
          <div className="flex bg-obsidian-950 p-0.5 border border-obsidian-800 rounded-sm">
            <button
              onClick={() => setDensity('detailed')}
              className={`px-2 py-0.5 text-[11px] rounded-sm transition ${
                density === 'detailed' ? 'bg-obsidian-800 text-slate-100 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Detailed
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`px-2 py-0.5 text-[11px] rounded-sm transition ${
                density === 'compact' ? 'bg-obsidian-800 text-slate-100 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Compact
            </button>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-obsidian-950 hover:bg-obsidian-850 border border-obsidian-700 text-slate-200 text-xs rounded-sm transition disabled:opacity-50 shrink-0"
          >
            {loading ? 'Refreshing...' : 'Refresh Log'}
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="sm:col-span-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indicator string, domain, or notes..."
            className="w-full px-3 py-1.5 bg-obsidian-950 border border-obsidian-800 rounded-sm text-slate-200 placeholder-slate-600 outline-none focus:border-signal-500 text-xs font-mono"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-obsidian-800 rounded-sm text-slate-300 outline-none focus:border-signal-500 text-xs font-mono"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Data Display */}
      {loading ? (
        <div className="p-10 text-center bg-obsidian-950 rounded-sm border border-obsidian-800 text-slate-400">
          Fetching telemetry records...
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-950/40 border border-rose-800 text-rose-300 rounded-sm space-y-2">
          <p className="font-bold">Database Error: {error}</p>
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-rose-900 text-white rounded-sm text-xs font-mono"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredThreats.length === 0 ? (
        <div className="p-10 text-center bg-obsidian-950 rounded-sm border border-obsidian-800 text-slate-500">
          No threat indicators match the specified query filters.
        </div>
      ) : density === 'compact' ? (
        /* Compact Table Layout */
        <div className="overflow-x-auto border border-obsidian-800 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-obsidian-950 text-slate-400 text-[10px] uppercase border-b border-obsidian-800">
                <th className="p-2">ID</th>
                <th className="p-2">Category</th>
                <th className="p-2">Indicator String</th>
                <th className="p-2">Timestamp</th>
                <th className="p-2 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-800 text-xs">
              {filteredThreats.map((threat) => {
                const style = getRiskBadgeStyle(threat.score);
                return (
                  <tr 
                    key={threat.id}
                    onClick={() => setSelectedThreat(threat)}
                    className="hover:bg-obsidian-850 cursor-pointer transition"
                  >
                    <td className="p-2 text-slate-500">{threat.id}</td>
                    <td className="p-2 text-signal-500 font-bold">{threat.type}</td>
                    <td className="p-2 text-slate-100 font-mono font-semibold max-w-xs truncate">
                      {threat.indicator}
                    </td>
                    <td className="p-2 text-slate-400 text-[11px]">{threat.timestamp}</td>
                    <td className={`p-2 text-right font-bold ${style.scoreText}`}>
                      {threat.score}/100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Detailed List Card View */
        <div className="space-y-2.5">
          {filteredThreats.map((threat) => {
            const style = getRiskBadgeStyle(threat.score);
            return (
              <div
                key={threat.id}
                onClick={() => setSelectedThreat(threat)}
                className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-sm hover:border-obsidian-700 transition cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-1.5 py-0.5 rounded-sm bg-obsidian-900 border border-obsidian-800 text-signal-500 font-bold uppercase">
                      {threat.type}
                    </span>
                    <span className="text-slate-500">{threat.timestamp}</span>
                    <span className={`px-1.5 py-0.5 rounded-sm font-bold uppercase border ${style.badge}`}>
                      {threat.status || (threat.score >= 80 ? 'RED' : threat.score >= 40 ? 'YELLOW' : 'GREEN')}
                    </span>
                  </div>

                  <p className="text-sm font-mono font-bold text-slate-100 break-all">
                    {threat.indicator}
                  </p>

                  {threat.description && (
                    <p className="text-xs text-slate-400 font-sans italic">
                      "{threat.description}"
                    </p>
                  )}
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className={`text-xl font-bold ${style.scoreText}`}>
                    {threat.score}<span className="text-xs font-normal text-slate-500">/100</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Heuristic Rating</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Indicator Inspection Drawer */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-obsidian-900 border border-obsidian-700 rounded-sm p-5 max-w-lg w-full space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-obsidian-800 pb-3">
              <span className="font-bold text-slate-100 uppercase">
                [INSPECTOR] Indicator Breakdown #{selectedThreat.id}
              </span>
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-slate-400 hover:text-white px-2 py-0.5 bg-obsidian-950 border border-obsidian-800 rounded-sm text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Indicator String</span>
                <p className="p-2 bg-obsidian-950 border border-obsidian-800 rounded-sm text-slate-200 break-all font-mono font-bold">
                  {selectedThreat.indicator}
                </p>
              </div>

              {selectedThreat.rawInput && selectedThreat.rawInput !== selectedThreat.indicator && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Raw Input (Pre-Sanitization)</span>
                  <p className="p-2 bg-obsidian-950 border border-obsidian-800 rounded-sm text-rose-300 break-all font-mono">
                    {selectedThreat.rawInput}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-obsidian-950 border border-obsidian-800 rounded-sm">
                  <span className="text-[10px] text-slate-500 uppercase block">Risk Score</span>
                  <span className="text-lg font-bold text-slate-100">{selectedThreat.score}/100</span>
                </div>
                <div className="p-2 bg-obsidian-950 border border-obsidian-800 rounded-sm">
                  <span className="text-[10px] text-slate-500 uppercase block">Threat Category</span>
                  <span className="text-sm font-bold text-signal-500">{selectedThreat.type}</span>
                </div>
              </div>

              {selectedThreat.description && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Context Note</span>
                  <p className="p-2 bg-obsidian-950 border border-obsidian-800 rounded-sm text-slate-300 font-sans">
                    {selectedThreat.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedThreat(null)}
                className="px-3 py-1.5 bg-signal-500 hover:bg-signal-600 text-white rounded-sm text-xs font-mono font-bold"
              >
                Dismiss Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
