import { useState, useMemo } from 'react';
import { RECENT_INCIDENTS } from '../data/mockThreats';

export default function IncidentStreamTable({ extraThreats = [] }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Combine default incident dataset with any newly added user threats
  const allIncidents = useMemo(() => {
    const customFormatted = extraThreats.map(t => ({
      id: t.id || `INC-${Math.floor(Math.random()*9000)+1000}`,
      severity: t.score >= 80 ? 'Critical' : t.score >= 40 ? 'High' : 'Low',
      score: t.score || 75,
      aiConfidence: '97.2%',
      indicator: t.rawInput || t.indicator,
      cleanIndicator: t.indicator,
      type: t.type || 'Submitted Threat',
      target: 'Target Service',
      location: 'Ingested Endpoint',
      status: 'Auto-Blocked',
      timestamp: t.timestamp || 'Just now',
      sanitized: t.sanitizedParameters || []
    }));
    return [...customFormatted, ...RECENT_INCIDENTS];
  }, [extraThreats]);

  const filteredIncidents = useMemo(() => {
    return allIncidents.filter((item) => {
      const matchesSeverity = filterSeverity === 'ALL' || item.severity === filterSeverity;
      const matchesSearch = 
        item.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
    });
  }, [allIncidents, filterSeverity, searchQuery]);

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 space-y-4">
      
      {/* Table Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-cyber-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Live AI Threat Stream & Incident Log
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20">
              {filteredIncidents.length} Active Logged
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time crowdsourced telemetry scored by neural analysis model.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indicator, location, type..."
            className="px-3 py-1 bg-cyber-dark border border-cyber-border rounded-lg text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 font-mono w-full md:w-48"
          />

          <div className="flex bg-cyber-dark p-0.5 border border-cyber-border rounded-lg text-xs font-mono">
            {['ALL', 'Critical', 'High', 'Low'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterSeverity === sev 
                    ? 'bg-cyan-500 text-cyber-dark font-extrabold shadow-xs shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto border border-cyber-border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cyber-dark/80 text-slate-400 text-[10px] font-mono uppercase tracking-wider border-b border-cyber-border">
              <th className="p-3">Severity</th>
              <th className="p-3">Incident ID</th>
              <th className="p-3">Indicator String</th>
              <th className="p-3">Vector Type</th>
              <th className="p-3">Target Node</th>
              <th className="p-3">Origin / Geo</th>
              <th className="p-3">AI Confidence</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border text-xs font-sans">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-slate-500 font-mono">
                  No threat incidents match the selected search criteria.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className="hover:bg-cyber-card-hover cursor-pointer transition group"
                >
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getSeverityBadgeClass(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400 font-semibold whitespace-nowrap">
                    {incident.id}
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-100 max-w-xs truncate group-hover:text-cyan-400 transition">
                    {incident.indicator}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-cyan-400 font-mono font-bold text-[11px]">
                      {incident.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 whitespace-nowrap font-mono text-[11px]">
                    {incident.target}
                  </td>
                  <td className="p-3 text-slate-400 whitespace-nowrap text-[11px]">
                    {incident.location}
                  </td>
                  <td className="p-3 whitespace-nowrap font-mono">
                    <span className="text-emerald-400 font-bold">{incident.aiConfidence}</span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncident(incident);
                      }}
                      className="px-2.5 py-1 bg-cyber-dark hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 border border-cyber-border rounded text-[11px] font-mono transition"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Forensic Inspection Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 max-w-lg w-full space-y-4 font-sans text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getSeverityBadgeClass(selectedIncident.severity)}`}>
                  {selectedIncident.severity}
                </span>
                <span className="font-mono font-bold text-slate-100 text-sm">
                  {selectedIncident.id} Forensic Telemetry
                </span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-cyber-dark text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Target Indicator String</span>
                <p className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg text-cyan-300 break-all font-bold">
                  {selectedIncident.indicator}
                </p>
              </div>

              {selectedIncident.cleanIndicator && selectedIncident.cleanIndicator !== selectedIncident.indicator && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Sanitized Output String</span>
                  <p className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg text-emerald-300 break-all">
                    {selectedIncident.cleanIndicator}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase block">Risk Rating</span>
                  <span className="text-lg font-bold text-slate-100">{selectedIncident.score}/100</span>
                </div>
                <div className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase block">AI Model Confidence</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedIncident.aiConfidence}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase block">Vector Category</span>
                  <span className="text-xs font-bold text-cyan-400">{selectedIncident.type}</span>
                </div>
                <div className="p-2.5 bg-cyber-dark border border-cyber-border rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase block">Action Taken</span>
                  <span className="text-xs font-bold text-rose-400">{selectedIncident.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 bg-cyber-dark hover:bg-cyber-card-hover border border-cyber-border text-slate-300 rounded-lg font-mono text-xs transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
