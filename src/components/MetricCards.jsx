import { DASHBOARD_METRICS } from '../data/mockThreats';

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Active Threats */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-cyber-border-light transition">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Active Threats
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1 block">
              {DASHBOARD_METRICS.activeThreats.value}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-cyber-border/60">
          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono font-bold text-[11px] border border-rose-500/20">
            {DASHBOARD_METRICS.activeThreats.change}
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {DASHBOARD_METRICS.activeThreats.subtext}
          </span>
        </div>
      </div>

      {/* 2. AI Detection Accuracy */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-cyber-border-light transition">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              AI Confidence Score
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1 block">
              {DASHBOARD_METRICS.aiAccuracy.value}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-cyber-border/60">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[11px] border border-cyan-500/20">
            {DASHBOARD_METRICS.aiAccuracy.change}
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {DASHBOARD_METRICS.aiAccuracy.subtext}
          </span>
        </div>
      </div>

      {/* 3. Mean Time to Detect (MTTD) */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-cyber-border-light transition">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Mean Time to Detect
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1 block">
              {DASHBOARD_METRICS.mttd.value}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-cyber-border/60">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[11px] border border-emerald-500/20">
            {DASHBOARD_METRICS.mttd.change}
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {DASHBOARD_METRICS.mttd.subtext}
          </span>
        </div>
      </div>

      {/* 4. Monitored Endpoints */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-cyber-border-light transition">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Monitored Endpoints
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono mt-1 block">
              {DASHBOARD_METRICS.monitoredNodes.value}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-cyber-border/60">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-bold text-[11px] border border-blue-500/20">
            {DASHBOARD_METRICS.monitoredNodes.change}
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {DASHBOARD_METRICS.monitoredNodes.subtext}
          </span>
        </div>
      </div>

    </div>
  );
}
