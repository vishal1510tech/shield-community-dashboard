import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { THREAT_TIMELINE_DATA } from '../data/mockThreats';

export default function ThreatTimelineChart() {
  const [timeframe, setTimeframe] = useState('24h');

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 space-y-4">
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cyber-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              24-Hour Threat Ingestion & Anomaly Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time threat detection volume telemetry over 24-hour cycle.</p>
        </div>

        {/* Legend & Filter pills */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500"></span>
              Anomalies
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
              Blocked
            </span>
          </div>

          <div className="flex bg-cyber-dark p-0.5 border border-cyber-border rounded-lg text-xs font-mono">
            {['24h', '7d', '30d'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-1 rounded-md transition ${
                  timeframe === t 
                    ? 'bg-cyan-500 text-cyber-dark font-extrabold shadow-xs shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Responsive Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={THREAT_TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a263d" />
            
            <XAxis 
              dataKey="time" 
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
              contentStyle={{ 
                backgroundColor: '#0d1322', 
                borderRadius: '8px', 
                borderColor: '#1a263d', 
                color: '#f8fafc', 
                fontSize: '12px', 
                fontFamily: 'monospace',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
            />

            <Area 
              type="monotone" 
              dataKey="anomaly" 
              name="Anomalous Traffic" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#cyanGradient)" 
            />

            <Area 
              type="monotone" 
              dataKey="blocked" 
              name="Blocked Attacks" 
              stroke="#f43f5e" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#roseGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
