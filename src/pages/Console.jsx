import MetricCards from '../components/MetricCards';
import ThreatTimelineChart from '../components/ThreatTimelineChart';
import RiskDistributionChart from '../components/RiskDistributionChart';
import IncidentStreamTable from '../components/IncidentStreamTable';

export default function Console({ threats }) {
  return (
    <div className="space-y-6">
      
      {/* Overview Section Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cyber-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              AI TELEMETRY SOC CONSOLE
            </span>
            <span>•</span>
            <span>threats.shieldcommunity.io</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans mt-1">
            Threat Detection Overview
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Shield AI Engine Connected
          </span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <MetricCards />

      {/* Middle Grid Row: 24-Hour Area Chart (8 Cols) + Vector Donut Chart (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <ThreatTimelineChart />
        </div>
        <div className="lg:col-span-4">
          <RiskDistributionChart />
        </div>
      </div>

      {/* Bottom Full-Width Live Incident Stream Table */}
      <IncidentStreamTable extraThreats={threats} />

    </div>
  );
}
