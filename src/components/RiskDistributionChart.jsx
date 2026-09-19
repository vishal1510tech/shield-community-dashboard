import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_BREAKDOWN } from '../data/mockThreats';

export default function RiskDistributionChart() {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 space-y-4">
      
      <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-sans">
            Vector Classification
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Threat distribution across active vectors.</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-dark text-cyan-400 border border-cyber-border font-bold">
          4 Categories
        </span>
      </div>

      {/* Donut Chart Display */}
      <div className="h-48 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CATEGORY_BREAKDOWN}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {CATEGORY_BREAKDOWN.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0d1322" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0d1322',
                borderRadius: '8px',
                borderColor: '#1a263d',
                color: '#f8fafc',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none font-mono">
          <span className="text-xl font-extrabold text-slate-100">1,482</span>
          <span className="text-[10px] uppercase text-slate-400 font-semibold">Total Threat Log</span>
        </div>
      </div>

      {/* Category Legends */}
      <div className="space-y-2 pt-1 font-mono text-xs">
        {CATEGORY_BREAKDOWN.map((item) => (
          <div key={item.name} className="flex justify-between items-center p-2 rounded-lg bg-cyber-dark/60 border border-cyber-border/60">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-300 font-sans truncate text-xs font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 text-[11px] font-semibold">{item.count}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-100 bg-cyber-card border border-cyber-border">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
