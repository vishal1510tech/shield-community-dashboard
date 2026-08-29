import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/analytics');
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics (${response.status})`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'Unable to connect to threat analytics service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalThreats = data.reduce((acc, curr) => acc + (curr.count || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Threat Analytics & Intelligence
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Overview of malicious activity categorized and stored in community database.</p>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-semibold rounded-xl transition disabled:opacity-50 flex items-center gap-2 shadow-sm shrink-0"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Saved Threats</span>
          <p className="text-3xl font-black text-blue-400">{loading ? '...' : totalThreats}</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Categories</span>
          <p className="text-3xl font-black text-indigo-400">
            {loading ? '...' : data.filter(d => d.count > 0).length}
          </p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Database Link</span>
          <p className="text-sm font-bold text-emerald-400 flex items-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SQLite Live Connected
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Threat Breakdown by Category
          </h3>
          <span className="text-xs text-slate-500 font-mono">Live SQLite Sync</span>
        </div>
        
        {loading ? (
          <div className="h-80 w-full flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="h-80 w-full flex flex-col items-center justify-center text-rose-400">
            <p className="font-semibold text-sm mb-2">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition"
            >
              Retry
            </button>
          </div>
        ) : (
          /* Chart Container */
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#1E293B' }}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', borderColor: '#334155', color: '#F8FAFC', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
