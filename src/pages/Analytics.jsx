import ThreatTimelineChart from '../components/ThreatTimelineChart';
import RiskDistributionChart from '../components/RiskDistributionChart';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="border-b border-cyber-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
            ANALYTICS & METRICS
          </span>
          <span>•</span>
          <span>threats.shieldcommunity.io</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans mt-1">
          Threat Analytics & Vector Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Historical timeline trends and vector classification breakdown from SQLite core.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <ThreatTimelineChart />
        </div>
        <div className="lg:col-span-4">
          <RiskDistributionChart />
        </div>
      </div>
    </div>
  );
}
