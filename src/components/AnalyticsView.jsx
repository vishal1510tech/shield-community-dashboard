import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsView({ threats = [], loading, error, onRefresh }) {
  // Aggregate category counts from threats list
  const chartData = useMemo(() => {
    const categoryCounts = {};
    threats.forEach((threat) => {
      const type = threat.type || 'Unclassified';
      categoryCounts[type] = (categoryCounts[type] || 0) + 1;
    });

    return Object.keys(categoryCounts).map((cat) => ({
      name: cat,
      count: categoryCounts[cat]
    }));
  }, [threats]);

  const totalCount = threats.length;
  const highRiskCount = threats.filter(t => t.score >= 80).length;
  const medRiskCount = threats.filter(t => t.score >= 40 && t.score < 80).length;

  return (
    <div className="bg-obsidian-900 border border-obsidian-800 rounded-sm p-5 space-y-5 font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-obsidian-800 pb-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-sans">
            Threat Intelligence Metrics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Aggregated metrics and indicator distribution from SQLite database.</p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-2.5 py-1 bg-obsidian-950 hover:bg-obsidian-850 border border-obsidian-700 text-slate-200 text-xs rounded-sm transition disabled:opacity-50 shrink-0"
        >
          {loading ? 'Updating...' : 'Refresh Metrics'}
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-obsidian-950 p-3.5 rounded-sm border border-obsidian-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Logged Indicators</span>
          <span className="text-2xl font-bold text-signal-500">{totalCount}</span>
        </div>

        <div className="bg-obsidian-950 p-3.5 rounded-sm border border-obsidian-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">High Risk (≥ 80)</span>
          <span className="text-2xl font-bold text-rose-400">{highRiskCount}</span>
        </div>

        <div className="bg-obsidian-950 p-3.5 rounded-sm border border-obsidian-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Medium Risk (40 - 79)</span>
          <span className="text-2xl font-bold text-amber-400">{medRiskCount}</span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-obsidian-950 p-4 rounded-sm border border-obsidian-800 space-y-3">
        <div className="flex justify-between items-center border-b border-obsidian-800 pb-2">
          <span className="font-bold text-slate-200 uppercase text-[11px]">
            Indicator Density by Category
          </span>
          <span className="text-[10px] text-slate-500">Bar Scale: Integer Count</span>
        </div>

        {loading ? (
          <div className="h-64 w-full flex items-center justify-center text-slate-500">
            Calculating telemetry distribution...
          </div>
        ) : error ? (
          <div className="h-64 w-full flex flex-col items-center justify-center text-rose-400 space-y-2">
            <p>{error}</p>
            <button onClick={onRefresh} className="px-3 py-1 bg-rose-900 text-white rounded-sm text-xs">
              Retry
            </button>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-64 w-full flex items-center justify-center text-slate-500">
            No dataset available to graph.
          </div>
        ) : (
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1c283e" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
                  dy={8} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  allowDecimals={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#141d30' }}
                  contentStyle={{ 
                    backgroundColor: '#080c14', 
                    borderRadius: '2px', 
                    borderColor: '#1c283e', 
                    color: '#f8fafc', 
                    fontSize: '12px', 
                    fontFamily: 'monospace' 
                  }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  );
}
